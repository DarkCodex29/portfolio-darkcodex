import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useWindowStore } from '@/application/store/useWindowStore'

interface DockApp {
  id: string
  name: string
  icon: string
  canOpen: boolean
}

const dockApps: DockApp[] = [
  { id: 'finder', name: 'Projects', icon: '📁', canOpen: true },
  { id: 'terminal', name: 'Skills', icon: '💻', canOpen: true },
  { id: 'about', name: 'About Me', icon: '👤', canOpen: true },
  { id: 'safari', name: 'Experience', icon: '🌐', canOpen: true },
  { id: 'contact', name: 'Contact', icon: '✉️', canOpen: true },
  { id: 'resume', name: 'Resume', icon: '📄', canOpen: true },
  { id: 'vscode', name: 'GitHub', icon: '🔗', canOpen: true },
  { id: 'photos', name: 'Gallery', icon: '🖼️', canOpen: true },
]

export const Dock = () => {
  const dockRef = useRef<HTMLDivElement>(null)
  const { openWindow, closeWindow, windows } = useWindowStore()

  useEffect(() => {
    const dock = dockRef.current
    if (!dock) return

    const icons = dock.querySelectorAll('.dock-icon')

    const animateIcons = (mouseX: number) => {
      const { left } = dock.getBoundingClientRect()

      icons.forEach((icon) => {
        const { left: iconLeft, width } = icon.getBoundingClientRect()
        const center = iconLeft - left + width / 2
        const distance = Math.abs(mouseX - center)
        const intensity = Math.exp(-(distance ** 2.5) / 30000)

        gsap.to(icon, {
          scale: 1 + 0.4 * intensity,
          y: -20 * intensity,
          duration: 0.2,
          ease: 'power1.out',
        })
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { left } = dock.getBoundingClientRect()
      animateIcons(e.clientX - left)
    }

    const resetIcons = () => {
      icons.forEach((icon) => {
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: 'power1.out',
        })
      })
    }

    dock.addEventListener('mousemove', handleMouseMove)
    dock.addEventListener('mouseleave', resetIcons)

    return () => {
      dock.removeEventListener('mousemove', handleMouseMove)
      dock.removeEventListener('mouseleave', resetIcons)
    }
  }, [])

  const toggleApp = (app: DockApp) => {
    if (!app.canOpen) return

    const win = windows[app.id]
    if (!win) return

    if (win.isOpen) {
      closeWindow(app.id)
    } else {
      openWindow(app.id)
    }
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div
        ref={dockRef}
        className="flex items-end gap-1 px-3 py-2 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20"
      >
        {dockApps.map((app) => (
          <button
            key={app.id}
            type="button"
            className="dock-icon flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-colors hover:bg-white/10 cursor-pointer"
            onClick={() => toggleApp(app)}
            title={app.name}
          >
            <span className="text-2xl">{app.icon}</span>
            {windows[app.id]?.isOpen && (
              <div className="w-1 h-1 bg-white rounded-full mt-1" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Dock
