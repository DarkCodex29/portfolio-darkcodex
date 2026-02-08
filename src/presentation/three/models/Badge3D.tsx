import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { extend, useThree, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from '@react-three/rapier'
import type { RapierRigidBody, RigidBodyProps } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'

extend({ MeshLineGeometry, MeshLineMaterial })

declare module '@react-three/fiber' {
  interface ThreeElements {
    meshLineGeometry: any
    meshLineMaterial: any
  }
}

// Preload textures
useTexture.preload('/models/band.png')
useTexture.preload('/models/card.png')

interface BandProps {
  maxSpeed?: number
  minSpeed?: number
}

export function Band({ maxSpeed = 50, minSpeed = 10 }: BandProps) {
  const band = useRef<THREE.Mesh>(null)
  const fixed = useRef<RapierRigidBody>(null)
  const j1 = useRef<RapierRigidBody>(null)
  const j2 = useRef<RapierRigidBody>(null)
  const j3 = useRef<RapierRigidBody>(null)
  const card = useRef<RapierRigidBody>(null)

  const vec = new THREE.Vector3()
  const ang = new THREE.Vector3()
  const rot = new THREE.Vector3()
  const dir = new THREE.Vector3()

  const segmentProps: RigidBodyProps = {
    type: 'dynamic',
    canSleep: true,
    colliders: false,
    angularDamping: 2,
    linearDamping: 2,
  }

  const bandTexture = useTexture('/models/band.png')
  const cardTexture = useTexture('/models/card.png')
  const { width, height } = useThree((state) => state.size)
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  )
  const [dragged, drag] = useState<THREE.Vector3 | false>(false)
  const [hovered, hover] = useState(false)

  useRopeJoint(fixed as any, j1 as any, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j1 as any, j2 as any, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j2 as any, j3 as any, [[0, 0, 0], [0, 0, 0], 1])
  useSphericalJoint(j3 as any, card as any, [[0, 0, 0], [0, 1.1, 0]])

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab'
      return () => {
        document.body.style.cursor = 'auto'
      }
    }
  }, [hovered, dragged])

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
      ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
      card.current?.setNextKinematicTranslation({
        x: vec.x - (dragged as THREE.Vector3).x,
        y: vec.y - (dragged as THREE.Vector3).y,
        z: vec.z - (dragged as THREE.Vector3).z,
      })
    }
    if (fixed.current) {
      ;[j1, j2].forEach((ref: any) => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
        )
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        )
      })
      curve.points[0].copy(j3.current!.translation() as any)
      curve.points[1].copy((j2.current as any).lerped)
      curve.points[2].copy((j1.current as any).lerped)
      curve.points[3].copy(fixed.current.translation() as any)
      ;(band.current!.geometry as any).setPoints(curve.getPoints(32))
      ang.copy(card.current!.angvel() as any)
      rot.copy(card.current!.rotation() as any)
      card.current!.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true)
    }
  })

  curve.curveType = 'chordal'
  bandTexture.wrapS = bandTexture.wrapT = THREE.RepeatWrapping

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.82, 1.1, 0.01]} />
          <group
            scale={2.25}
            position={[0, -0.9, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => (
              e.target.releasePointerCapture(e.pointerId), drag(false)
            )}
            onPointerDown={(e: any) => (
              e.target.setPointerCapture(e.pointerId),
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current!.translation() as any))
              )
            )}
          >
            {/* Card with texture - ratio 864:1184 = 0.73 */}
            <mesh>
              <planeGeometry args={[0.73, 1]} />
              <meshBasicMaterial
                map={cardTexture}
                side={THREE.DoubleSide}
                toneMapped={false}
              />
            </mesh>

            {/* Metal clip at top of card */}
            <group position={[0, 0.52, 0]}>
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.022, 0.022, 0.035, 16]} />
                <meshStandardMaterial
                  color="#3a3a4a"
                  metalness={0.95}
                  roughness={0.05}
                />
              </mesh>
              <mesh position={[0, 0.025, 0]}>
                <torusGeometry args={[0.016, 0.005, 8, 24]} />
                <meshStandardMaterial
                  color="#4a4a5a"
                  metalness={0.95}
                  roughness={0.05}
                />
              </mesh>
            </group>
          </group>
        </RigidBody>
      </group>

      {/* Band/Lanyard - exact Vercel settings */}
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[width, height]}
          useMap
          map={bandTexture}
          repeat={[-3, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  )
}

export function Badge3D() {
  return (
    <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
      <Band />
    </Physics>
  )
}

export default Badge3D
