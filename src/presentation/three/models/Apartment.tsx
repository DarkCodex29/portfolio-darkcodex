import { useRef, useEffect, useMemo } from 'react'
import { useGLTF, Center } from '@react-three/drei'
import type { Group } from 'three'
import * as THREE from 'three'

interface ApartmentProps {
  scale?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
  onWorkspaceClick?: () => void
}

export const Apartment = ({
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onWorkspaceClick
}: ApartmentProps) => {
  const groupRef = useRef<Group>(null)
  const { scene } = useGLTF('/models/gaming-setup.glb')

  const clonedScene = useMemo(() => scene.clone(), [scene])

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
        child.receiveShadow = true

        if (child.material) {
          const materials = Array.isArray(child.material) ? child.material : [child.material]
          materials.forEach((mat) => {
            mat.envMapIntensity = 1.5
            mat.needsUpdate = true
          })
        }
      }
    })
  }, [clonedScene])

  return (
    <Center>
      <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
        <primitive object={clonedScene} onClick={onWorkspaceClick} />
      </group>
    </Center>
  )
}

useGLTF.preload('/models/gaming-setup.glb')

export default Apartment
