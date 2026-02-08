import { Suspense, useRef, useState, memo } from 'react'
import { Canvas } from '@react-three/fiber'
import { useProgress, Html, Environment, Lightformer } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import gsap from 'gsap'

import { Band } from '@/presentation/three/models/Badge3D'
import { GamingSetup } from '@/presentation/three/models/GamingSetup'
import { DesktopView } from '@/presentation/pages/DesktopView'
import { HeroSection } from '@/presentation/components/sections/HeroSection'
import { useSceneStore } from '@/application/store/useSceneStore'
import { CAMERA, PHYSICS, LIGHTS, GL_CONFIG, TRANSITION } from '@/core/constants/scene'
import { UI_TEXT } from '@/core/constants/ui'

const Loader = memo(() => {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-text-secondary text-sm font-medium">{progress.toFixed(0)}%</p>
      </div>
    </Html>
  )
})
Loader.displayName = 'Loader'

const StarField = memo(() => (
  <div
    className="absolute inset-0 opacity-60"
    style={{
      backgroundImage: `radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.3), transparent),
                       radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.2), transparent),
                       radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.4), transparent),
                       radial-gradient(2px 2px at 130px 80px, rgba(255,255,255,0.2), transparent),
                       radial-gradient(1px 1px at 160px 120px, rgba(255,255,255,0.3), transparent)`,
      backgroundSize: '200px 200px',
    }}
    aria-hidden="true"
  />
))
StarField.displayName = 'StarField'

const GlowEffects = memo(() => (
  <>
    <div className="absolute bottom-0 left-0 right-0 h-[80%] bg-gradient-to-t from-primary-900/40 via-primary-800/20 to-transparent" />
    <div className="absolute bottom-0 left-[15%] w-[600px] h-[400px] bg-primary-600/25 rounded-full blur-[120px]" />
    <div className="absolute bottom-[5%] right-[20%] w-[500px] h-[300px] bg-primary-500/20 rounded-full blur-[100px]" />
    <div className="absolute top-[20%] left-[30%] w-[300px] h-[200px] bg-primary-400/10 rounded-full blur-[80px]" />
  </>
))
GlowEffects.displayName = 'GlowEffects'

const ScrollIndicator = memo(() => (
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
    <div className="w-6 h-10 border-2 border-text-muted rounded-full flex justify-center p-1">
      <div className="w-1.5 h-2.5 bg-text-muted rounded-full animate-bounce" />
    </div>
    <p className="text-text-muted text-xs tracking-wider uppercase">{UI_TEXT.hero.scrollHint}</p>
  </div>
))
ScrollIndicator.displayName = 'ScrollIndicator'

const BadgeCanvas = memo(() => (
  <Canvas
    camera={{ position: CAMERA.badge.position, fov: CAMERA.badge.fov }}
    gl={GL_CONFIG}
    style={{ background: 'transparent' }}
  >
    <Suspense fallback={<Loader />}>
      <ambientLight intensity={LIGHTS.ambient.intensity} />
      <Physics interpolate gravity={PHYSICS.gravity} timeStep={PHYSICS.timeStep}>
        <Band />
      </Physics>
      <Environment blur={0.75}>
        {LIGHTS.formers.map((former, index) => (
          <Lightformer
            key={index}
            intensity={former.intensity}
            color={former.color}
            position={former.position}
            rotation={former.rotation}
            scale={former.scale}
          />
        ))}
      </Environment>
    </Suspense>
  </Canvas>
))
BadgeCanvas.displayName = 'BadgeCanvas'

interface SetupCanvasProps {
  onClick: () => void
}

const SetupCanvas = memo(({ onClick }: SetupCanvasProps) => (
  <Canvas
    camera={{ position: CAMERA.setup.position, fov: CAMERA.setup.fov }}
    gl={GL_CONFIG}
    style={{ background: 'transparent' }}
  >
    <Suspense fallback={<Loader />}>
      <ambientLight intensity={2} />
      <directionalLight position={LIGHTS.directional.main.position} intensity={LIGHTS.directional.main.intensity} />
      <directionalLight position={LIGHTS.directional.fill.position} intensity={LIGHTS.directional.fill.intensity} />
      <pointLight position={LIGHTS.point.primary.position} intensity={LIGHTS.point.primary.intensity} color={LIGHTS.point.primary.color} />
      <pointLight position={LIGHTS.point.accent.position} intensity={LIGHTS.point.accent.intensity} color={LIGHTS.point.accent.color} />
      <GamingSetup onClick={onClick} />
    </Suspense>
  </Canvas>
))
SetupCanvas.displayName = 'SetupCanvas'

function App() {
  const { currentView, goToDesktop, setTransitioning } = useSceneStore()
  const transitionRef = useRef<HTMLDivElement>(null)
  const [showDesktop, setShowDesktop] = useState(false)

  const handleWorkspaceClick = () => {
    if (!transitionRef.current) return
    setTransitioning(true)

    gsap.to(transitionRef.current, {
      scale: TRANSITION.scale,
      opacity: TRANSITION.opacity,
      duration: TRANSITION.duration,
      ease: TRANSITION.ease,
      onComplete: () => {
        setShowDesktop(true)
        goToDesktop()
        setTimeout(() => setTransitioning(false), 100)
      },
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
    <main className="w-full h-screen bg-surface-base relative overflow-visible">
      <StarField />
      <GlowEffects />

      <section className="absolute left-0 top-0 w-[50%] h-full z-10 pointer-events-auto">
        <SetupCanvas onClick={handleWorkspaceClick} />
        <ScrollIndicator />
      </section>

      <section className="absolute left-[58%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
        <HeroSection onExplore={handleWorkspaceClick} />
      </section>

      <section className="absolute -right-[15%] top-0 w-[50%] h-full z-30 pointer-events-auto">
        <Suspense fallback={null}>
          <BadgeCanvas />
        </Suspense>
      </section>

      <div
        ref={transitionRef}
        className="absolute top-1/2 left-1/2 w-4 h-4 bg-surface-base rounded-full opacity-0 pointer-events-none z-50"
        style={{ transform: 'translate(-50%, -50%) scale(0)' }}
        aria-hidden="true"
      />
    </main>
  )
}

export default App
