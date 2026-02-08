import { useRef, useEffect, memo, useCallback } from 'react'
import gsap from 'gsap'
import { useWindowStore } from '@/application/store/useWindowStore'
import { DOCK_APPS, type DockApp } from '@/core/constants/desktop'

const DOCK_ANIMATION = {
  maxScale: 1.4,
  maxY: -20,
  duration: 0.2,
  resetDuration: 0.3,
  intensity: 30000,
} as const

interface DockItemProps {
  app: DockApp
  isOpen: boolean
  onToggle: () => void
}

const DockItem = memo(({ app, isOpen, onToggle }: DockItemProps) => (
  <button
    type="button"
    className="dock-icon flex flex-col items-center justify-center cursor-pointer relative group"
    onClick={onToggle}
    aria-label={`Open ${app.name}`}
  >
    <img
      src={app.icon}
      alt={app.name}
      className="w-12 h-12 object-contain drop-shadow-lg"
      draggable={false}
    />
    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900/95 backdrop-blur-sm rounded-lg text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-xl">
      {app.name}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900/95 rotate-45 border-r border-b border-white/10" />
    </div>
    {isOpen && (
      <div className="absolute -bottom-1.5 w-1 h-1 bg-white/80 rounded-full" />
    )}
  </button>
))
DockItem.displayName = 'DockItem'

const DockDivider = memo(() => (
  <div className="w-px h-10 bg-white/20 mx-1.5" />
))
DockDivider.displayName = 'DockDivider'

export const Dock = memo(() => {
  const dockRef = useRef<HTMLDivElement>(null)
  const { toggleWindow, windows } = useWindowStore()

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
        const intensity = Math.exp(-(distance ** 2.5) / DOCK_ANIMATION.intensity)

        gsap.to(icon, {
          scale: 1 + (DOCK_ANIMATION.maxScale - 1) * intensity,
          y: DOCK_ANIMATION.maxY * intensity,
          duration: DOCK_ANIMATION.duration,
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
          duration: DOCK_ANIMATION.resetDuration,
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

  const toggleApp = useCallback((app: DockApp) => {
    if (!app.windowId) return
    toggleWindow(app.windowId)
  }, [toggleWindow])

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50">
      <div
        ref={dockRef}
        className="flex items-end gap-1 px-3 py-2 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl"
      >
        {DOCK_APPS.map((app, index) => (
          <div key={app.id} className="flex items-end">
            <DockItem
              app={app}
              isOpen={app.windowId ? (windows[app.windowId]?.isOpen && !windows[app.windowId]?.isMinimized) ?? false : false}
              onToggle={() => toggleApp(app)}
            />
            {index === DOCK_APPS.length - 2 && <DockDivider />}
          </div>
        ))}
      </div>
    </div>
  )
})
Dock.displayName = 'Dock'

export default Dock
