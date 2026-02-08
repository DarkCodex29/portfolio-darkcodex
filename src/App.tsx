import { Suspense, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { useProgress, Html, Environment, Lightformer } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import gsap from 'gsap'

import { Band } from '@/presentation/three/models/Badge3D'
import { GamingSetup } from '@/presentation/three/models/GamingSetup'
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

const BadgeCanvas = () => (
  <Canvas
    camera={{ position: [0, 0, 13], fov: 25 }}
    gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
    style={{ background: 'transparent' }}
  >
    <Suspense fallback={<Loader />}>
      <ambientLight intensity={Math.PI} />
      <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
        <Band />
      </Physics>
      <Environment blur={0.75}>
        <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
      </Environment>
    </Suspense>
  </Canvas>
)

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
    <div className="w-full h-screen bg-[#0a0a0f] relative overflow-visible">
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

      <div className="absolute bottom-0 left-0 right-0 h-[70%] bg-gradient-to-t from-purple-900/50 via-purple-800/30 to-transparent" />
      <div className="absolute bottom-0 left-[20%] w-[800px] h-[500px] bg-purple-600/30 rounded-full blur-[150px]" />
      <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[200px] bg-purple-500/40 rounded-full blur-[80px]" />

      <div className="absolute left-0 top-0 w-[50%] h-full z-10 pointer-events-auto">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 35 }}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={<Loader />}>
            <ambientLight intensity={2} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <directionalLight position={[-5, 3, -5]} intensity={0.5} />
            <pointLight position={[-2, 2, 3]} intensity={1} color="#8b5cf6" />
            <pointLight position={[2, 0, 2]} intensity={0.5} color="#06b6d4" />
            <GamingSetup onClick={handleWorkspaceClick} />
          </Suspense>
        </Canvas>
        <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs">
          Clic para entrar
        </p>
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
        <HeroSection onExplore={handleWorkspaceClick} />
      </div>

      <div className="absolute -right-[15%] top-0 w-[50%] h-full z-30 pointer-events-auto">
        <Suspense fallback={<Loader />}>
          <BadgeCanvas />
        </Suspense>
      </div>

      <div
        ref={transitionRef}
        className="absolute top-1/2 left-1/2 w-4 h-4 bg-[#0a0a0f] rounded-full opacity-0 pointer-events-none z-50"
        style={{ transform: 'translate(-50%, -50%) scale(0)' }}
      />
    </div>
  )
}

export default App
