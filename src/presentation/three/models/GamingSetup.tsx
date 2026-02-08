import { useRef } from 'react'
import { useGLTF, Center, Bounds, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { t } from '@/core/constants/translations'

useGLTF.preload('/models/gaming-setup.glb')

interface GamingSetupProps {
  onClick?: () => void
}

export function GamingSetup({ onClick }: GamingSetupProps) {
  const groupRef = useRef<THREE.Group>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const { scene } = useGLTF('/models/gaming-setup.glb')

  useFrame((state) => {
    const rotation = 0.5 + Math.sin(state.clock.elapsedTime * 0.3) * 0.08
    if (groupRef.current) {
      groupRef.current.rotation.y = rotation
    }
    if (buttonRef.current) {
      const degrees = (rotation - 0.5) * (180 / Math.PI) * 3
      buttonRef.current.style.transform = `perspective(500px) rotateY(${degrees}deg)`
    }
  })

  return (
    <>
      <group
        ref={groupRef}
        onClick={onClick}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      >
        <Bounds fit clip observe margin={0.8}>
          <Center>
            <primitive object={scene} />
          </Center>
        </Bounds>
      </group>

      <Html
        position={[-100, 60, 2.5]}
        center
        style={{
          pointerEvents: 'auto',
        }}
      >
        <div ref={buttonRef} style={{ transformStyle: 'preserve-3d' }}>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClick?.()
            }}
            className="group flex items-center bg-primary-600 hover:bg-primary-500 rounded-full transition-colors duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/50 border border-primary-400/30 whitespace-nowrap"
            style={{
              padding: '6px 14px',
              gap: '6px',
              fontSize: '12px',
            }}
          >
            <span className="text-white font-semibold">{t.hero.cta}</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white transition-transform duration-300 group-hover:translate-x-1"
              style={{ width: '12px', height: '12px' }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </Html>
    </>
  )
}

export default GamingSetup
