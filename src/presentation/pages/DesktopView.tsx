import { useState, memo, useCallback, useEffect } from 'react'
import { Dock } from '@/presentation/features/settings/components/Dock'
import { TerminalWindow } from '@/presentation/features/skills/components/TerminalWindow'
import { AboutWindow } from '@/presentation/features/about/components/AboutWindow'
import { ProjectsWindow } from '@/presentation/features/projects/components/ProjectsWindow'
import { ContactWindow } from '@/presentation/features/contact/components/ContactWindow'
import { ExperienceWindow } from '@/presentation/features/experience/components/ExperienceWindow'
import { GalleryWindow } from '@/presentation/features/gallery/components/GalleryWindow'
import { ControlCenter } from '@/presentation/components/desktop/ControlCenter'
import { CalendarDropdown } from '@/presentation/components/desktop/CalendarDropdown'
import { SpotlightSearch } from '@/presentation/components/desktop/SpotlightSearch'
import { ContextMenu } from '@/presentation/components/desktop/ContextMenu'
import { useWindowStore } from '@/application/store/useWindowStore'
import { DESKTOP_ICONS, SIDEBAR_ICONS, MENU_ITEMS, DESKTOP_CONFIG, type DesktopIcon } from '@/core/constants/desktop'
import { PROFILE } from '@/core/constants/profile'
import { t } from '@/core/constants/translations'
import { useSceneStore } from '@/application/store/useSceneStore'

interface DesktopViewProps {
  onBack?: () => void
}

interface TopBarProps {
  isControlCenterOpen: boolean
  onToggleControlCenter: () => void
  isCalendarOpen: boolean
  onToggleCalendar: () => void
  isSpotlightOpen: boolean
  onToggleSpotlight: () => void
}

const TopBar = memo(({ isControlCenterOpen, onToggleControlCenter, isCalendarOpen, onToggleCalendar, isSpotlightOpen, onToggleSpotlight }: TopBarProps) => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useState(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(interval)
  })

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', hour12: true })

  const formatDate = (date: Date) =>
    date.toLocaleDateString('es-PE', { weekday: 'short', month: 'short', day: 'numeric' })

  return (
    <header
      className="absolute top-0 left-0 right-0 bg-black/25 backdrop-blur-2xl backdrop-saturate-[1.8] flex items-center justify-between z-50"
      style={{ height: 'var(--macos-topbar-height)', padding: '0 var(--space-4)', fontSize: 'var(--macos-topbar-text)' }}
    >
      <div className="flex items-center" style={{ gap: 'var(--space-5)' }}>
        <button
          className="text-white/90 font-medium hover:bg-white/10 rounded transition-colors"
          style={{ padding: 'var(--space-1) var(--space-2)' }}
        >
          <svg style={{ width: '14px', height: '14px' }} fill="currentColor" viewBox="0 0 384 512">
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
          </svg>
        </button>
        <span className="text-white/90 font-semibold">{PROFILE.name.first}</span>
        <nav className="flex items-center text-white/80" style={{ gap: 'var(--space-4)' }}>
          {MENU_ITEMS.map((item) => (
            <button
              key={item}
              className="hover:bg-white/10 rounded transition-colors"
              style={{ padding: 'var(--space-1) var(--space-2)' }}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center text-white/80" style={{ gap: 'var(--space-2)' }}>
        <button
          className="flex items-center rounded hover:bg-white/10 transition-colors"
          style={{ gap: 'var(--space-1)', padding: 'var(--space-1) var(--space-2)' }}
        >
          <svg style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4zM13 18h-2v-2h2v2zm0-4h-2V9h2v5z"/>
          </svg>
          <span>100%</span>
        </button>
        <button className="rounded hover:bg-white/10 transition-colors" style={{ padding: 'var(--space-1)' }}>
          <svg style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
          </svg>
        </button>
        <button
          onClick={onToggleSpotlight}
          className={`rounded transition-colors ${isSpotlightOpen ? 'bg-white/20' : 'hover:bg-white/10'}`}
          style={{ padding: 'var(--space-1)' }}
        >
          <svg style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </button>
        <button
          onClick={onToggleControlCenter}
          className={`rounded transition-colors ${isControlCenterOpen ? 'bg-white/20' : 'hover:bg-white/10'}`}
          style={{ padding: 'var(--space-1)' }}
        >
          <svg style={{ width: 'var(--icon-md)', height: 'var(--icon-md)' }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.5 6C7.5 7.38 6.38 8.5 5 8.5S2.5 7.38 2.5 6 3.62 3.5 5 3.5 7.5 4.62 7.5 6zm0 6c0 1.38-1.12 2.5-2.5 2.5S2.5 13.38 2.5 12s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5zm0 6c0 1.38-1.12 2.5-2.5 2.5S2.5 19.38 2.5 18s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5zM14.5 6c0 1.38-1.12 2.5-2.5 2.5S9.5 7.38 9.5 6s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5zm0 6c0 1.38-1.12 2.5-2.5 2.5s-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5zm0 6c0 1.38-1.12 2.5-2.5 2.5s-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5zM21.5 6c0 1.38-1.12 2.5-2.5 2.5S16.5 7.38 16.5 6s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5zm0 6c0 1.38-1.12 2.5-2.5 2.5s-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5zm0 6c0 1.38-1.12 2.5-2.5 2.5s-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5z"/>
          </svg>
        </button>
        <button
          onClick={onToggleCalendar}
          className={`flex items-center rounded transition-colors ${isCalendarOpen ? 'bg-white/20' : 'hover:bg-white/10'}`}
          style={{ gap: 'var(--space-4)', padding: 'var(--space-1) var(--space-2)' }}
        >
          <span>{formatDate(currentTime)}</span>
          <span>{formatTime(currentTime)}</span>
        </button>
      </div>

      <ControlCenter
        isOpen={isControlCenterOpen}
        onClose={onToggleControlCenter}
      />
      <CalendarDropdown
        isOpen={isCalendarOpen}
        onClose={onToggleCalendar}
      />
    </header>
  )
})
TopBar.displayName = 'TopBar'

interface DesktopIconComponentProps {
  icon: DesktopIcon
  isSelected: boolean
  onClick: () => void
  onDoubleClick: () => void
}

const DesktopIconComponent = memo(({ icon, isSelected, onClick, onDoubleClick }: DesktopIconComponentProps) => (
  <button
    className={`flex flex-col items-center gap-1 p-2 rounded-md transition-all cursor-default select-none ${
      isSelected ? 'bg-white/25' : 'hover:bg-white/10'
    }`}
    onClick={onClick}
    onDoubleClick={onDoubleClick}
  >
    <div className="w-16 h-16 flex items-center justify-center">
      {icon.icon === 'hdd' ? (
        <div className="w-14 h-14 rounded-lg bg-gradient-to-b from-gray-200 to-gray-400 flex items-center justify-center shadow-lg">
          <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 4h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v10h16V6H4zm4 14h8v2H8v-2z"/>
          </svg>
        </div>
      ) : (
        <img
          src={icon.icon}
          alt={icon.name}
          className="w-14 h-14 object-contain drop-shadow-lg"
          draggable={false}
        />
      )}
    </div>
    <span className="text-[11px] text-white font-medium text-center max-w-[75px] leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
      {icon.name}
    </span>
  </button>
))
DesktopIconComponent.displayName = 'DesktopIconComponent'

interface BackButtonProps {
  isSelected: boolean
  onClick: () => void
  onDoubleClick: () => void
}

const BackButton = memo(({ isSelected, onClick, onDoubleClick }: BackButtonProps) => (
  <button
    className={`flex flex-col items-center gap-1 p-2 rounded-md transition-all cursor-default select-none ${
      isSelected ? 'bg-white/25' : 'hover:bg-white/10'
    }`}
    onClick={onClick}
    onDoubleClick={onDoubleClick}
  >
    <div className="w-16 h-16 flex items-center justify-center">
      <div className="w-14 h-14 rounded-xl bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </div>
    </div>
    <span className="text-[11px] text-white font-medium text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
      {t.desktop.back}
    </span>
  </button>
))
BackButton.displayName = 'BackButton'

const DesktopBackground = memo(() => (
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${DESKTOP_CONFIG.wallpaper})` }}
  />
))
DesktopBackground.displayName = 'DesktopBackground'

export const DesktopView = memo(({ onBack }: DesktopViewProps) => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false)
  const [contextMenu, setContextMenu] = useState<{ isOpen: boolean; x: number; y: number }>({
    isOpen: false,
    x: 0,
    y: 0
  })
  const { openWindow } = useWindowStore()
  const { goToHome } = useSceneStore()

  const handleToggleControlCenter = useCallback(() => {
    setIsControlCenterOpen(prev => !prev)
    setIsCalendarOpen(false)
    setIsSpotlightOpen(false)
  }, [])

  const handleToggleCalendar = useCallback(() => {
    setIsCalendarOpen(prev => !prev)
    setIsControlCenterOpen(false)
    setIsSpotlightOpen(false)
  }, [])

  const handleToggleSpotlight = useCallback(() => {
    setIsSpotlightOpen(prev => !prev)
    setIsControlCenterOpen(false)
    setIsCalendarOpen(false)
  }, [])

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setContextMenu({ isOpen: true, x: e.clientX, y: e.clientY })
    setIsControlCenterOpen(false)
    setIsCalendarOpen(false)
    setIsSpotlightOpen(false)
  }, [])

  const handleCloseContextMenu = useCallback(() => {
    setContextMenu(prev => ({ ...prev, isOpen: false }))
  }, [])

  const handleContextMenuAction = useCallback((action: string) => {
    console.log('Context menu action:', action)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.code === 'Space') {
        e.preventDefault()
        handleToggleSpotlight()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleToggleSpotlight])

  const handleDownload = useCallback((url: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = url.split('/').pop() || 'download'
    link.click()
  }, [])

  const handleIconAction = useCallback((icon: DesktopIcon) => {
    if (icon.action === 'window' && icon.windowId) {
      openWindow(icon.windowId)
    } else if (icon.action === 'link' && icon.url) {
      window.open(icon.url, '_blank', 'noopener,noreferrer')
    } else if (icon.action === 'download' && icon.downloadUrl) {
      handleDownload(icon.downloadUrl)
    }
  }, [openWindow, handleDownload])

  const handleBack = useCallback(() => {
    goToHome()
    if (onBack) onBack()
  }, [goToHome, onBack])

  const handleDesktopClick = useCallback(() => {
    setSelectedIcon(null)
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <DesktopBackground />
      <TopBar
        isControlCenterOpen={isControlCenterOpen}
        onToggleControlCenter={handleToggleControlCenter}
        isCalendarOpen={isCalendarOpen}
        onToggleCalendar={handleToggleCalendar}
        isSpotlightOpen={isSpotlightOpen}
        onToggleSpotlight={handleToggleSpotlight}
      />
      <SpotlightSearch
        isOpen={isSpotlightOpen}
        onClose={handleToggleSpotlight}
      />

      <div className="absolute top-10 right-4 flex flex-col gap-0.5 z-10">
        {onBack && (
          <BackButton
            isSelected={selectedIcon === 'back'}
            onClick={() => setSelectedIcon('back')}
            onDoubleClick={handleBack}
          />
        )}
        {DESKTOP_ICONS.map((icon) => (
          <DesktopIconComponent
            key={icon.id}
            icon={icon}
            isSelected={selectedIcon === icon.id}
            onClick={() => setSelectedIcon(icon.id)}
            onDoubleClick={() => handleIconAction(icon)}
          />
        ))}
      </div>

      <div className="absolute top-10 left-4 flex flex-col gap-0.5 z-10">
        {SIDEBAR_ICONS.map((icon) => (
          <DesktopIconComponent
            key={icon.id}
            icon={icon}
            isSelected={selectedIcon === icon.id}
            onClick={() => setSelectedIcon(icon.id)}
            onDoubleClick={() => handleIconAction(icon)}
          />
        ))}
      </div>

      <TerminalWindow />
      <AboutWindow />
      <ProjectsWindow />
      <ContactWindow />
      <ExperienceWindow />
      <GalleryWindow />

      <Dock />

      <div
        className="absolute inset-0 z-0"
        onClick={handleDesktopClick}
        onContextMenu={handleContextMenu}
        role="presentation"
      />

      <ContextMenu
        isOpen={contextMenu.isOpen}
        position={{ x: contextMenu.x, y: contextMenu.y }}
        onClose={handleCloseContextMenu}
        onAction={handleContextMenuAction}
      />
    </div>
  )
})
DesktopView.displayName = 'DesktopView'

export default DesktopView
