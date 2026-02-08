import { useRef, useEffect, useLayoutEffect } from 'react'
import type { ComponentType } from 'react'
import gsap from 'gsap'
// @ts-ignore - GSAP types casing issue on macOS
import { Draggable } from 'gsap/all'
import { useWindowStore } from '@/application/store/useWindowStore'

gsap.registerPlugin(Draggable)

interface WindowWrapperProps {
  windowKey: string
  title: string
  children: React.ReactNode
  className?: string
}

export const WindowWrapper = ({
  windowKey,
  title,
  children,
  className = '',
}: WindowWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { windows, focusWindow, closeWindow, toggleMaximizeWindow } = useWindowStore()
  const windowState = windows[windowKey]

  if (!windowState) return null

  const { isOpen, isMaximized, zIndex } = windowState

  // Open animation
  useEffect(() => {
    const el = ref.current
    if (!el || !isOpen) return

    el.style.display = 'block'

    gsap.fromTo(
      el,
      { scale: 0.8, opacity: 0, y: 40 },
      { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
    )
  }, [isOpen])

  // Draggable handling
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
      cursor: 'grab',
      activeCursor: 'grabbing',
    })

    return () => {
      instance.kill()
    }
  }, [isOpen, isMaximized, focusWindow, windowKey])

  // Visibility and maximize handling
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    el.style.display = isOpen ? 'block' : 'none'

    if (isMaximized) {
      el.style.position = 'fixed'
      el.style.top = '0'
      el.style.left = '0'
      el.style.right = '0'
      el.style.bottom = '0'
      el.style.width = '100vw'
      el.style.height = '100vh'
      el.style.transform = 'none'
      el.style.borderRadius = '0'
    } else {
      el.style.position = 'absolute'
      el.style.width = ''
      el.style.height = ''
      el.style.borderRadius = ''
    }
  }, [isOpen, isMaximized])

  if (!isOpen) return null

  return (
    <div
      ref={ref}
      style={{ zIndex }}
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        bg-gray-900/95 backdrop-blur-xl rounded-xl border border-white/10
        shadow-2xl overflow-hidden min-w-[400px] min-h-[300px] ${className}`}
      onClick={() => focusWindow(windowKey)}
    >
      {/* Window Header */}
      <div className="window-drag-handle flex items-center justify-between px-4 py-3 bg-gray-800/50 border-b border-white/10">
        {/* Traffic lights */}
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              closeWindow(windowKey)
            }}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
          />
          <button
            onClick={(e) => e.stopPropagation()}
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
          />
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleMaximizeWindow(windowKey)
            }}
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
          />
        </div>

        {/* Title */}
        <h2 className="text-sm font-medium text-white/80">{title}</h2>

        {/* Spacer */}
        <div className="w-14" />
      </div>

      {/* Window Content */}
      <div className="p-4 overflow-auto max-h-[70vh]">{children}</div>
    </div>
  )
}

// HOC version for easier usage
export const withWindow = <P extends object>(
  Component: ComponentType<P>,
  windowKey: string,
  title: string
) => {
  const WrappedComponent = (props: P) => (
    <WindowWrapper windowKey={windowKey} title={title}>
      <Component {...props} />
    </WindowWrapper>
  )

  WrappedComponent.displayName = `withWindow(${Component.displayName || Component.name || 'Component'})`

  return WrappedComponent
}

export default WindowWrapper
