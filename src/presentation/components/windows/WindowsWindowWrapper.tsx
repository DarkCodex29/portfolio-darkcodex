import { useRef, useEffect, useLayoutEffect } from 'react'
import gsap from 'gsap'
// @ts-ignore - GSAP types casing issue on macOS
import { Draggable } from 'gsap/all'
import { useWindowStore } from '@/application/store/useWindowStore'

gsap.registerPlugin(Draggable)

interface WindowsWindowWrapperProps {
  windowKey: string
  title: string
  children: React.ReactNode
  className?: string
  icon?: string
}

export const WindowsWindowWrapper = ({
  windowKey,
  title,
  children,
  className = '',
  icon,
}: WindowsWindowWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { windows, focusWindow, closeWindow, toggleMaximizeWindow, minimizeWindow } = useWindowStore()
  const windowState = windows[windowKey]

  if (!windowState) return null

  const { isOpen, isMinimized, isMaximized, zIndex } = windowState

  useEffect(() => {
    const el = ref.current
    if (!el || !isOpen) return

    el.style.display = 'flex'
    el.style.position = 'absolute'
    el.style.top = '50%'
    el.style.left = '50%'
    el.style.transform = 'translate(-50%, -50%)'

    gsap.fromTo(
      el,
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }
    )
  }, [isOpen])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (!isOpen || isMaximized) {
      Draggable.get(el)?.kill()
      return
    }

    const [instance] = Draggable.create(el, {
      onPress: () => focusWindow(windowKey),
      trigger: el.querySelector('.window-drag-handle'),
      bounds: 'body',
      cursor: 'default',
    })

    return () => {
      instance.kill()
    }
  }, [isOpen, isMaximized, focusWindow, windowKey])

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    el.style.display = isOpen ? 'flex' : 'none'

    if (isMaximized) {
      el.style.position = 'fixed'
      el.style.top = '0'
      el.style.left = '0'
      el.style.right = '0'
      el.style.bottom = '48px'
      el.style.width = '100vw'
      el.style.height = 'calc(100vh - 48px)'
      el.style.transform = 'none'
      el.style.borderRadius = '0'
    } else {
      el.style.position = 'absolute'
      el.style.top = '50%'
      el.style.left = '50%'
      el.style.right = ''
      el.style.bottom = ''
      el.style.transform = 'translate(-50%, -50%)'
      el.style.borderRadius = '8px'
    }
  }, [isOpen, isMaximized])

  if (!isOpen || isMinimized) return null

  return (
    <div
      ref={ref}
      style={{ zIndex, borderRadius: isMaximized ? '0' : '8px' }}
      className={`bg-black/80 backdrop-blur-2xl border border-white/10 shadow-2xl min-w-[400px] flex flex-col overflow-hidden ${className}`}
      onClick={() => focusWindow(windowKey)}
    >
      <div
        className="window-drag-handle flex items-center justify-between bg-black/40 backdrop-blur-sm border-b border-white/10 shrink-0"
        style={{ height: '40px', padding: '0 16px' }}
      >
        <div className="flex items-center gap-3">
          {icon && (
            <img src={icon} alt={title} className="w-4 h-4 object-contain" />
          )}
          <h2 className="font-normal text-white text-xs">{title}</h2>
        </div>

        <div className="flex items-center">
          <button
            onClick={(e) => {
              e.stopPropagation()
              minimizeWindow(windowKey)
            }}
            className="w-11 h-10 flex items-center justify-center hover:bg-white/10 transition-colors"
            aria-label="Minimize"
          >
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 12 12">
              <rect x="0" y="5" width="10" height="1" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleMaximizeWindow(windowKey)
            }}
            className="w-11 h-10 flex items-center justify-center hover:bg-white/10 transition-colors"
            aria-label="Maximize"
          >
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 10 10">
              <rect x="0.5" y="0.5" width="9" height="9" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              closeWindow(windowKey)
            }}
            className="w-11 h-10 flex items-center justify-center hover:bg-red-600 transition-colors"
            aria-label="Close"
          >
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 12 12">
              <path d="M6.8 6l3.6-3.6c.2-.2.2-.5 0-.7-.2-.2-.5-.2-.7 0L6 5.3 2.4 1.7c-.2-.2-.5-.2-.7 0-.2.2-.2.5 0 .7L5.3 6l-3.6 3.6c-.2.2-.2.5 0 .7.1.1.2.1.4.1s.3 0 .4-.1L6 6.8l3.6 3.6c.1.1.2.1.4.1s.3 0 .4-.1c.2-.2.2-.5 0-.7L6.8 6z"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 overflow-auto" style={{ padding: 'var(--window-padding)' }}>
        {children}
      </div>
    </div>
  )
}

export default WindowsWindowWrapper
