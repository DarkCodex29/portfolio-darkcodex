import { Suspense, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useProgress, Html } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import gsap from 'gsap'

import { Apartment } from '@/presentation/three/models/Apartment'
import { Band } from '@/presentation/three/models/Badge3D'
import { DesktopView } from '@/presentation/pages/DesktopView'
import { HeroSection } from '@/presentation/components/sections/HeroSection'
import { useSceneStore } from '@/application/store/useSceneStore'

const Loader = () => {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-2 border-[#8b5cf6] border-t-transparent rounded-full animate-spin" />
        <p className="text-white/70 text-sm font-medium">{progress.toFixed(0)}%</p>
      </div>
    </Html>
  )
}

const FullScreenLoader = () => (
  <div className="fixed inset-0 bg-[#0a0a0f] flex items-center justify-center z-50">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-2 border-[#8b5cf6] border-t-transparent rounded-full animate-spin" />
      <p className="text-white/50 text-sm">Cargando experiencia...</p>
    </div>
  </div>
)

// Gaming Setup Canvas - Left side
const GamingSetupCanvas = ({ onWorkspaceClick }: { onWorkspaceClick: () => void }) => {
  return (
    <Canvas
      shadows
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
        outputColorSpace: THREE.SRGBColorSpace,
        alpha: true,
        powerPreference: 'high-performance'
      }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={<Loader />}>
        <PerspectiveCamera
          makeDefault
          position={[0, 1, 12]}
          fov={40}
        />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
          target={[0, 0, 0]}
        />

        <Apartment
          scale={0.0025}
          position={[0, -1.5, 0]}
          rotation={[0, 0.3, 0]}
          onWorkspaceClick={onWorkspaceClick}
        />

        <ambientLight intensity={2} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-5, 3, 3]} intensity={1} color="#8b5cf6" />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
        <spotLight position={[0, 10, 0]} intensity={0.5} color="#8b5cf6" angle={0.5} />
      </Suspense>
    </Canvas>
  )
}

// Badge Canvas - Right side, hanging from top (exact Vercel settings)
const BadgeCanvas = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 13], fov: 25 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={Math.PI} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-5, 5, 5]} intensity={0.8} color="#8b5cf6" />

        <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
          <Band />
        </Physics>
      </Suspense>
    </Canvas>
  )
}

function App() {
  const { currentView, goToDesktop, setTransitioning } = useSceneStore()
  const transitionRef = useRef<HTMLDivElement>(null)
  const [showDesktop, setShowDesktop] = useState(false)

  const handleWorkspaceClick = () => {
    if (!transitionRef.current) return
    setTransitioning(true)

    gsap.to(transitionRef.current, {
      scale: 100,
      opacity: 1,
      duration: 1.2,
      ease: 'power2.inOut',
      onComplete: () => {
        setShowDesktop(true)
        goToDesktop()
        setTimeout(() => setTransitioning(false), 100)
      }
    })
  }

  const handleBackFromDesktop = () => {
    setShowDesktop(false)
    setTransitioning(false)
    if (transitionRef.current) {
      gsap.set(transitionRef.current, { scale: 0, opacity: 0 })
    }
  }

  if (showDesktop || currentView === 'desktop') {
    return <DesktopView onBack={handleBackFromDesktop} />
  }

  return (
    <div className="w-full h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Stars background */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.3), transparent),
                           radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.2), transparent),
                           radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.4), transparent),
                           radial-gradient(2px 2px at 130px 80px, rgba(255,255,255,0.2), transparent),
                           radial-gradient(1px 1px at 160px 120px, rgba(255,255,255,0.3), transparent)`,
          backgroundSize: '200px 200px'
        }}
      />

      {/* Purple nebula glow at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[70%] bg-gradient-to-t from-purple-900/50 via-purple-800/30 to-transparent" />
      <div className="absolute bottom-0 left-[20%] w-[800px] h-[500px] bg-purple-600/30 rounded-full blur-[150px]" />
      <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[200px] bg-purple-500/40 rounded-full blur-[80px]" />

      <Suspense fallback={<FullScreenLoader />}>
        {/* Main layout - 3 columns */}
        <div className="relative h-full w-full flex">

          {/* LEFT: Gaming Setup 3D - 38% */}
          <div className="w-[38%] h-full relative">
            <div className="absolute inset-0 z-10">
              <GamingSetupCanvas onWorkspaceClick={handleWorkspaceClick} />
            </div>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs z-20">
              Clic para entrar
            </p>
          </div>

          {/* CENTER: Text Content - 32% */}
          <div className="w-[32%] h-full flex items-center justify-start z-20">
            <HeroSection onExplore={handleWorkspaceClick} />
          </div>

          {/* RIGHT: Badge 3D - 30% - hanging from top */}
          <div className="w-[30%] h-full relative overflow-visible">
            <div className="absolute -top-[60px] right-[30px] w-[380px] h-[750px] z-30">
              <BadgeCanvas />
            </div>
          </div>
        </div>

        {/* Transition overlay */}
        <div
          ref={transitionRef}
          className="absolute top-1/2 left-1/2 w-4 h-4 bg-[#0a0a0f] rounded-full opacity-0 pointer-events-none z-50"
          style={{ transform: 'translate(-50%, -50%) scale(0)' }}
        />
      </Suspense>
    </div>
  )
}

export default App
