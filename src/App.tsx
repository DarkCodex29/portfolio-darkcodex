import { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Environment, Lightformer, PerspectiveCamera } from '@react-three/drei'
import { useMediaQuery } from 'react-responsive'

import { useSceneStore } from '@/application/store/useSceneStore'
import { Badge3D } from '@/presentation/three/models/Badge3D'
import { HackerRoom } from '@/presentation/three/models/HackerRoom'
import { HeroCamera } from '@/presentation/three/controls/HeroCamera'
import { DesktopView } from '@/presentation/pages/DesktopView'

// Loading component
const Loader = () => (
  <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-white/80">Loading DarkCodex...</p>
    </div>
  </div>
)

// Badge Scene
const BadgeScene = () => {
  const { goToRoom } = useSceneStore()

  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 25 }}>
      <ambientLight intensity={Math.PI} />

      <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
        <Badge3D onCardClick={goToRoom} />
      </Physics>

      <Environment background blur={0.75}>
        <color attach="background" args={['#0a0a0f']} />
        <Lightformer
          intensity={2}
          color="white"
          position={[0, -1, 5]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />
        <Lightformer
          intensity={3}
          color="white"
          position={[-1, -1, 1]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />
        <Lightformer
          intensity={3}
          color="white"
          position={[1, 1, 1]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />
        <Lightformer
          intensity={10}
          color="white"
          position={[-10, 0, 14]}
          rotation={[0, Math.PI / 2, Math.PI / 3]}
          scale={[100, 10, 1]}
        />
      </Environment>
    </Canvas>
  )
}

// Room Scene
const RoomScene = () => {
  const { goToDesktop, goToBadge } = useSceneStore()
  const isMobile = useMediaQuery({ maxWidth: 768 })

  const deskScale = isMobile ? 0.05 : 0.07
  const deskPosition: [number, number, number] = isMobile ? [0, -4, 0] : [0, -5, 0]

  return (
    <>
      <Canvas className="w-full h-full">
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 30]} />

          <HeroCamera isMobile={isMobile}>
            <HackerRoom
              scale={deskScale}
              position={deskPosition}
              rotation={[0.1, -Math.PI, 0]}
              onMonitorClick={goToDesktop}
            />
          </HeroCamera>

          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 10]} intensity={0.5} />
        </Suspense>
      </Canvas>

      {/* Back button */}
      <button
        onClick={goToBadge}
        className="fixed top-8 left-8 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm transition-colors z-10"
      >
        ← Back to Badge
      </button>

      {/* Instruction */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm z-10">
        Click on the monitor to enter
      </div>
    </>
  )
}

// Main App
function App() {
  const { currentView, setIsMobile } = useSceneStore()
  const isMobile = useMediaQuery({ maxWidth: 768 })

  useEffect(() => {
    setIsMobile(isMobile)
  }, [isMobile, setIsMobile])

  return (
    <div className="w-full h-screen bg-gray-900 overflow-hidden">
      <Suspense fallback={<Loader />}>
        {currentView === 'badge' && (
          <div className="w-full h-full">
            <BadgeScene />
            {/* Click instruction */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              Drag the badge or click to continue
            </div>
          </div>
        )}

        {currentView === 'room' && (
          <div className="w-full h-full relative">
            <RoomScene />
          </div>
        )}

        {currentView === 'desktop' && <DesktopView />}
      </Suspense>
    </div>
  )
}

export default App
