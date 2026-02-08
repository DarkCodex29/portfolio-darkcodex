import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { useThree, useFrame, extend } from '@react-three/fiber'
import {
  BallCollider,
  CuboidCollider,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  RapierRigidBody,
  RigidBodyProps,
} from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import {
  useGLTF,
  useTexture,
  Text,
  Image,
} from '@react-three/drei'

extend({ MeshLineGeometry, MeshLineMaterial })

declare module '@react-three/fiber' {
  interface ThreeElements {
    meshLineGeometry: any
    meshLineMaterial: any
  }
}

interface Badge3DProps {
  maxSpeed?: number
  minSpeed?: number
  onCardClick?: () => void
}

const BadgeContent = () => {
  return (
    <group>
      {/* Background */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[1.5, 2]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>

      {/* Profile Image Placeholder */}
      <mesh position={[0, 0.4, 0.02]}>
        <circleGeometry args={[0.35, 32]} />
        <meshStandardMaterial color="#16213e" />
      </mesh>

      {/* Name */}
      <Text
        position={[0, -0.15, 0.02]}
        fontSize={0.12}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
      >
        GIANPIERRE
      </Text>

      <Text
        position={[0, -0.3, 0.02]}
        fontSize={0.1}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
      >
        COLLAZOS MIO
      </Text>

      {/* Title */}
      <Text
        position={[0, -0.5, 0.02]}
        fontSize={0.06}
        color="#4fd1c5"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.3}
        textAlign="center"
      >
        Senior Mobile Engineer
      </Text>

      <Text
        position={[0, -0.62, 0.02]}
        fontSize={0.05}
        color="#a0aec0"
        anchorX="center"
        anchorY="middle"
      >
        Full Stack Developer
      </Text>

      {/* DarkCodex branding */}
      <Text
        position={[0, -0.85, 0.02]}
        fontSize={0.07}
        color="#805ad5"
        anchorX="center"
        anchorY="middle"
      >
        DARKCODEX
      </Text>
    </group>
  )
}

export const Badge3D = ({ maxSpeed = 50, minSpeed = 10, onCardClick }: Badge3DProps) => {
  const band = useRef<THREE.Mesh>(null)
  const fixed = useRef<RapierRigidBody>(null)
  const j1 = useRef<RapierRigidBody>(null)
  const j2 = useRef<RapierRigidBody>(null)
  const j3 = useRef<RapierRigidBody>(null)
  const card = useRef<RapierRigidBody>(null)

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

  const vec = new THREE.Vector3()
  const ang = new THREE.Vector3()
  const rot = new THREE.Vector3()
  const dir = new THREE.Vector3()
  const [dragged, drag] = useState<THREE.Vector3 | false>(false)
  const [hovered, hover] = useState(false)

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab'
      return () => {
        document.body.style.cursor = 'auto'
      }
    }
  }, [hovered, dragged])

  const segmentProps: RigidBodyProps = {
    type: 'dynamic',
    canSleep: true,
    colliders: false,
    angularDamping: 2,
    linearDamping: 2,
  }

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0],
  ])

  useFrame((state) => {
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

    if (fixed.current && j1.current && j2.current && j3.current && card.current) {
      curve.points[0].copy(j3.current.translation() as THREE.Vector3)
      curve.points[1].copy(j2.current.translation() as THREE.Vector3)
      curve.points[2].copy(j1.current.translation() as THREE.Vector3)
      curve.points[3].copy(fixed.current.translation() as THREE.Vector3)

      if (band.current) {
        (band.current.geometry as any).setPoints(curve.getPoints(32))
      }

      // Tilt the card back towards the screen
      ang.copy(card.current.angvel() as THREE.Vector3)
      rot.copy(card.current.rotation() as THREE.Vector3)
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, false)
    }
  })

  curve.curveType = 'chordal'

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} type="fixed" />
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
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => {
              e.target.releasePointerCapture(e.pointerId)
              drag(false)
            }}
            onPointerDown={(e: any) => {
              e.target.setPointerCapture(e.pointerId)
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current!.translation() as THREE.Vector3))
              )
            }}
            onClick={onCardClick}
          >
            {/* Card mesh */}
            <mesh>
              <boxGeometry args={[1.6, 2.25, 0.05]} />
              <meshPhysicalMaterial
                color="#0f0f23"
                clearcoat={1}
                clearcoatRoughness={0.15}
                iridescence={1}
                iridescenceIOR={1}
                iridescenceThicknessRange={[0, 2400]}
                metalness={0.5}
                roughness={0.3}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Badge content */}
            <BadgeContent />
          </group>
        </RigidBody>
      </group>

      {/* Lanyard */}
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="#805ad5"
          resolution={[width, height]}
          lineWidth={1}
        />
      </mesh>
    </>
  )
}

export default Badge3D
