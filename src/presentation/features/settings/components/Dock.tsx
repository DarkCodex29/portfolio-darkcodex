import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useWindowStore } from '@/application/store/useWindowStore'

interface DockApp {
  id: string
  name: string
  icon: string
}

const dockApps: DockApp[] = [
  { id: 'finder', name: 'Projects', icon: '/images/finder.png' },
  { id: 'terminal', name: 'Skills', icon: '/images/terminal.png' },
  { id: 'about', name: 'About Me', icon: '/images/contact.png' },
  { id: 'safari', name: 'Experience', icon: '/images/safari.png' },
  { id: 'contact', name: 'Contact', icon: '/images/contact.png' },
  { id: 'vscode', name: 'VS Code', icon: '/images/code2.png' },
  { id: 'photos', name: 'Gallery', icon: '/images/photos.png' },
  { id: 'music', name: 'Music', icon: '/images/music.png' },
  { id: 'trash', name: 'Trash', icon: '/images/trash.png' },
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
        gsap.to(icon, { scale: 1, y: 0, duration: 0.3, ease: 'power1.out' })
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
    const win = windows[app.id]
    if (!win) return
    win.isOpen ? closeWindow(app.id) : openWindow(app.id)
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div
        ref={dockRef}
        className="flex items-end gap-1 px-3 py-2 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20"
      >
        {dockApps.map((app, index) => (
          <div key={app.id} className="flex items-end">
            <button
              type="button"
              className="dock-icon flex flex-col items-center justify-center cursor-pointer relative group"
              onClick={() => toggleApp(app)}
            >
              <img
                src={app.icon}
                alt={app.name}
                className="w-12 h-12 object-contain drop-shadow-lg"
                draggable={false}
              />
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-800/90 backdrop-blur-sm rounded-md text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
                {app.name}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800/90 rotate-45 border-r border-b border-white/10" />
              </div>
              {windows[app.id]?.isOpen && (
                <div className="absolute -bottom-1 w-1 h-1 bg-white/80 rounded-full" />
              )}
            </button>
            {index === dockApps.length - 2 && (
              <div className="w-px h-12 bg-white/20 mx-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dock
