import { useRef } from 'react'
import { useGLTF, Center, Bounds } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

useGLTF.preload('/models/gaming-setup.glb')

interface GamingSetupProps {
  onClick?: () => void
}

export function GamingSetup({ onClick }: GamingSetupProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/models/gaming-setup.glb')

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = 0.5 + Math.sin(state.clock.elapsedTime * 0.3) * 0.08
    }
  })

  return (
    <Bounds fit clip observe margin={0.8}>
      <group
        ref={groupRef}
        onClick={onClick}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      >
        <Center>
          <primitive object={scene} />
        </Center>
      </group>
    </Bounds>
  )
}

export default GamingSetup
