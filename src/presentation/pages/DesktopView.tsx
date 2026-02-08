import { Dock } from '@/presentation/features/settings/components/Dock'
import { TerminalWindow } from '@/presentation/features/skills/components/TerminalWindow'
import { AboutWindow } from '@/presentation/features/about/components/AboutWindow'
import { ProjectsWindow } from '@/presentation/features/projects/components/ProjectsWindow'
import { ContactWindow } from '@/presentation/features/contact/components/ContactWindow'
import { useSceneStore } from '@/application/store/useSceneStore'

export const DesktopView = () => {
  const { goToRoom } = useSceneStore()

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 overflow-hidden">
      {/* Wallpaper */}
      <div className="absolute inset-0 bg-[url('/textures/desk/screen.png')] bg-cover bg-center opacity-30" />

      {/* Desktop Icons */}
      <div className="absolute top-8 right-8 flex flex-col gap-4">
        <button
          onClick={goToRoom}
          className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-colors"
        >
          <span className="text-4xl">🔙</span>
          <span className="text-xs text-white/80">Back to Room</span>
        </button>
      </div>

      {/* Menu Bar */}
      <div className="absolute top-0 left-0 right-0 h-7 bg-black/50 backdrop-blur-xl flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-4">
          <span className="text-white font-bold"></span>
          <span className="text-white/80 text-sm">DarkCodex</span>
        </div>
        <div className="text-white/80 text-sm">
          {new Date().toLocaleTimeString('es-PE', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>

      {/* Windows */}
      <TerminalWindow />
      <AboutWindow />
      <ProjectsWindow />
      <ContactWindow />

      {/* Dock */}
      <Dock />
    </div>
  )
}

export default DesktopView
