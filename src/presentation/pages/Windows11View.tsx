import { useState, memo, useCallback, useEffect } from 'react'
import { useWindowStore } from '@/application/store/useWindowStore'
import { useSceneStore } from '@/application/store/useSceneStore'
import { useOSStore } from '@/application/store/useOSStore'
import { ActionCenter } from '@/presentation/components/windows/ActionCenter'
import { NotificationCenter } from '@/presentation/components/windows/NotificationCenter'
import { WindowsSearch } from '@/presentation/components/windows/WindowsSearch'
import { WindowsContextMenu } from '@/presentation/components/windows/WindowsContextMenu'
import { PROFILE } from '@/core/constants/profile'

interface Windows11ViewProps {
  onBack?: () => void
}

const WIN11_WALLPAPER = 'https://4kwallpapers.com/images/wallpapers/windows-11-stock-dark-mode-blue-stock-3840x2160-5630.jpg'

interface TaskbarProps {
  onStartClick: () => void
  isStartOpen: boolean
  onSearchClick: () => void
  onActionCenterClick: () => void
  onNotificationClick: () => void
  onOSToggle: () => void
}

const Taskbar = memo(({ onStartClick, isStartOpen, onSearchClick, onActionCenterClick, onNotificationClick, onOSToggle }: TaskbarProps) => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', hour12: false })

  const formatDate = (date: Date) =>
    date.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' })

  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/40 backdrop-blur-2xl border-t border-white/10 flex items-center justify-center z-50">
      <div className="flex items-center gap-1">
        <button
          onClick={onStartClick}
          className={`w-10 h-10 rounded flex items-center justify-center transition-all ${
            isStartOpen ? 'bg-white/20' : 'hover:bg-white/10'
          }`}
        >
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M0 0h11v11H0zM13 0h11v11H13zM0 13h11v11H0zM13 13h11v11H13z"/>
          </svg>
        </button>

        <button onClick={onSearchClick} className="w-10 h-10 rounded flex items-center justify-center hover:bg-white/10 transition-all">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        <div className="h-8 w-px bg-white/10 mx-1" />

        <button
          onClick={onOSToggle}
          className="w-10 h-10 rounded flex items-center justify-center hover:bg-white/10 transition-all"
          title="Cambiar a macOS"
        >
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 384 512">
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
          </svg>
        </button>
      </div>

      <div className="absolute right-2 flex items-center gap-2">
        <button onClick={onActionCenterClick} className="px-2 h-10 rounded flex items-center gap-2 hover:bg-white/10 transition-all">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
          </svg>
        </button>

        <button onClick={onActionCenterClick} className="px-2 h-10 rounded flex items-center gap-2 hover:bg-white/10 transition-all">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
          </svg>
        </button>

        <button onClick={onActionCenterClick} className="px-2 h-10 rounded flex items-center gap-2 hover:bg-white/10 transition-all">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4zM13 18h-2v-2h2v2zm0-4h-2V9h2v5z"/>
          </svg>
        </button>

        <button onClick={onNotificationClick} className="px-3 h-10 rounded hover:bg-white/10 transition-all">
          <div className="text-right">
            <p className="text-white text-xs leading-tight">{formatTime(currentTime)}</p>
            <p className="text-white/60 text-[10px] leading-tight">{formatDate(currentTime)}</p>
          </div>
        </button>
      </div>
    </div>
  )
})
Taskbar.displayName = 'Taskbar'

const StartMenu = memo(({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null

  const apps = [
    { id: 'edge', name: 'Edge', icon: '🌐', color: 'from-blue-400 to-blue-600' },
    { id: 'explorer', name: 'Explorador', icon: '📁', color: 'from-yellow-400 to-yellow-600' },
    { id: 'settings', name: 'Configuración', icon: '⚙️', color: 'from-gray-400 to-gray-600' },
    { id: 'store', name: 'Tienda', icon: '🛍️', color: 'from-blue-400 to-blue-500' },
    { id: 'terminal', name: 'Terminal', icon: '💻', color: 'from-gray-700 to-gray-900' },
    { id: 'photos', name: 'Fotos', icon: '📷', color: 'from-pink-400 to-pink-600' },
    { id: 'mail', name: 'Correo', icon: '✉️', color: 'from-blue-400 to-blue-600' },
    { id: 'calendar', name: 'Calendario', icon: '📅', color: 'from-red-400 to-red-600' },
    { id: 'music', name: 'Música', icon: '🎵', color: 'from-purple-400 to-purple-600' },
    { id: 'vscode', name: 'VS Code', icon: '💙', color: 'from-blue-500 to-blue-700' },
    { id: 'chrome', name: 'Chrome', icon: '🌈', color: 'from-red-400 to-yellow-400' },
    { id: 'spotify', name: 'Spotify', icon: '🎧', color: 'from-green-400 to-green-600' },
  ]

  return (
    <>
      <div className="fixed inset-0 z-[80]" onClick={onClose} />
      <div className="fixed bottom-14 left-1/2 -translate-x-1/2 w-[600px] bg-black/60 backdrop-blur-3xl rounded-xl border border-white/10 shadow-2xl z-[90] animate-fade-in overflow-hidden">
        <div style={{ padding: 'var(--space-4)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold text-sm">Ancladas</h3>
            <button className="text-white/60 hover:text-white text-xs px-3 py-1 rounded hover:bg-white/10 transition-colors">
              Todas las aplicaciones →
            </button>
          </div>

          <div className="grid grid-cols-6 gap-2 mb-6">
            {apps.map((app) => (
              <button
                key={app.id}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-all group"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${app.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                  {app.icon}
                </div>
                <span className="text-white text-[10px] text-center leading-tight">{app.name}</span>
              </button>
            ))}
          </div>

          <div className="border-t border-white/10 pt-4">
            <h3 className="text-white font-semibold text-sm mb-3">Recomendadas</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors">
                <div className="w-8 h-8 rounded bg-primary-500/30 flex items-center justify-center">
                  <span className="text-white text-lg">📄</span>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-white text-xs">CV_Gianpierre.pdf</p>
                  <p className="text-white/50 text-[10px]">Hace 2 horas</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors">
                <div className="w-8 h-8 rounded bg-blue-500/30 flex items-center justify-center">
                  <span className="text-white text-lg">🗂️</span>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-white text-xs">Proyectos</p>
                  <p className="text-white/50 text-[10px]">Hace 1 día</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border-t border-white/10 flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">{PROFILE.name.first[0]}</span>
            </div>
            <span className="text-white text-sm">{PROFILE.name.first}</span>
          </div>
          <button className="w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center transition-colors">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
})
StartMenu.displayName = 'StartMenu'

const DesktopBackground = memo(() => (
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${WIN11_WALLPAPER})` }}
  />
))
DesktopBackground.displayName = 'DesktopBackground'

export const Windows11View = memo(({ onBack }: Windows11ViewProps) => {
  const [isStartOpen, setIsStartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isActionCenterOpen, setIsActionCenterOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null)
  const { goToHome } = useSceneStore()
  const { toggleOS } = useOSStore()

  const handleStartClick = useCallback(() => {
    setIsStartOpen(prev => !prev)
    setIsSearchOpen(false)
    setIsActionCenterOpen(false)
    setIsNotificationOpen(false)
  }, [])

  const handleCloseStart = useCallback(() => {
    setIsStartOpen(false)
  }, [])

  const handleSearchClick = useCallback(() => {
    setIsSearchOpen(prev => !prev)
    setIsStartOpen(false)
    setIsActionCenterOpen(false)
    setIsNotificationOpen(false)
  }, [])

  const handleCloseSearch = useCallback(() => {
    setIsSearchOpen(false)
  }, [])

  const handleActionCenterClick = useCallback(() => {
    setIsActionCenterOpen(prev => !prev)
    setIsStartOpen(false)
    setIsSearchOpen(false)
    setIsNotificationOpen(false)
  }, [])

  const handleCloseActionCenter = useCallback(() => {
    setIsActionCenterOpen(false)
  }, [])

  const handleNotificationClick = useCallback(() => {
    setIsNotificationOpen(prev => !prev)
    setIsStartOpen(false)
    setIsSearchOpen(false)
    setIsActionCenterOpen(false)
  }, [])

  const handleCloseNotification = useCallback(() => {
    setIsNotificationOpen(false)
  }, [])

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setContextMenu({ x: e.clientX, y: e.clientY })
    setIsStartOpen(false)
    setIsSearchOpen(false)
    setIsActionCenterOpen(false)
    setIsNotificationOpen(false)
  }, [])

  const handleCloseContextMenu = useCallback(() => {
    setContextMenu(null)
  }, [])

  const handleBack = useCallback(() => {
    goToHome()
    if (onBack) onBack()
  }, [goToHome, onBack])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.code === 'Space') {
        e.preventDefault()
        handleSearchClick()
      } else if (e.key === 'Escape') {
        setIsStartOpen(false)
        setIsSearchOpen(false)
        setIsActionCenterOpen(false)
        setIsNotificationOpen(false)
        setContextMenu(null)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleSearchClick])

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-[#0078d4]"
      onContextMenu={handleContextMenu}
    >
      <DesktopBackground />

      {onBack && (
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-xl rounded-lg border border-white/10 text-white hover:bg-black/60 transition-all z-10"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-sm font-medium">Volver</span>
        </button>
      )}

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-2xl">
            <span className="text-white text-6xl font-bold">{PROFILE.name.first[0]}</span>
          </div>
          <h1 className="text-white text-4xl font-light mb-2">{PROFILE.name.first} {PROFILE.name.last}</h1>
          <p className="text-white/80 text-lg">{PROFILE.title.primary}</p>
        </div>
      </div>

      <Taskbar
        onStartClick={handleStartClick}
        isStartOpen={isStartOpen}
        onSearchClick={handleSearchClick}
        onActionCenterClick={handleActionCenterClick}
        onNotificationClick={handleNotificationClick}
        onOSToggle={toggleOS}
      />
      <StartMenu isOpen={isStartOpen} onClose={handleCloseStart} />
      <WindowsSearch isOpen={isSearchOpen} onClose={handleCloseSearch} />
      <ActionCenter isOpen={isActionCenterOpen} onClose={handleCloseActionCenter} />
      <NotificationCenter isOpen={isNotificationOpen} onClose={handleCloseNotification} />
      <WindowsContextMenu
        isOpen={!!contextMenu}
        position={contextMenu || { x: 0, y: 0 }}
        onClose={handleCloseContextMenu}
      />
    </div>
  )
})
Windows11View.displayName = 'Windows11View'

export default Windows11View
