import { useState, memo, useCallback } from 'react'
import { Dock } from '@/presentation/features/settings/components/Dock'
import { TerminalWindow } from '@/presentation/features/skills/components/TerminalWindow'
import { AboutWindow } from '@/presentation/features/about/components/AboutWindow'
import { ProjectsWindow } from '@/presentation/features/projects/components/ProjectsWindow'
import { ContactWindow } from '@/presentation/features/contact/components/ContactWindow'
import { useWindowStore } from '@/application/store/useWindowStore'
import { DESKTOP_ICONS, SIDEBAR_ICONS, MENU_ITEMS, type DesktopIcon } from '@/core/constants/desktop'
import { PROFILE } from '@/core/constants/profile'
import { t } from '@/core/constants/translations'
import { useSceneStore } from '@/application/store/useSceneStore'

const MACOS_WALLPAPER = 'https://raw.githubusercontent.com/aboredvaro/codepen_resources/main/macOS/img/bg/abstract/macOS-Big-Sur-Vector-Wave-Wallpaper.jpg'

interface DesktopViewProps {
  onBack?: () => void
}

const TopBar = memo(() => {
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
    <header className="absolute top-0 left-0 right-0 h-[26px] bg-black/25 backdrop-blur-2xl backdrop-saturate-[1.8] flex items-center justify-between px-4 z-50">
      <div className="flex items-center gap-5">
        <button className="text-white/90 font-medium text-[13px] hover:bg-white/10 px-2 py-0.5 rounded transition-colors">

        </button>
        <span className="text-white/90 text-[13px] font-semibold">{PROFILE.name.first}</span>
        <nav className="flex items-center gap-4 text-white/80 text-[13px]">
          {MENU_ITEMS.map((item) => (
            <button key={item} className="hover:bg-white/10 px-1.5 py-0.5 rounded transition-colors">
              {item}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2 text-white/80 text-[13px]">
        <button className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-white/10 transition-colors">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4zM13 18h-2v-2h2v2zm0-4h-2V9h2v5z"/>
          </svg>
          <span>100%</span>
        </button>
        <button className="p-1 rounded hover:bg-white/10 transition-colors">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
          </svg>
        </button>
        <button className="p-1 rounded hover:bg-white/10 transition-colors">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </button>
        <button className="p-1 rounded hover:bg-white/10 transition-colors">
          <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/>
          </svg>
        </button>
        <div className="flex items-center gap-4 px-2 py-0.5 rounded hover:bg-white/10 cursor-pointer transition-colors">
          <span>{formatDate(currentTime)}</span>
          <span>{formatTime(currentTime)}</span>
        </div>
      </div>
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
    style={{ backgroundImage: `url(${MACOS_WALLPAPER})` }}
  />
))
DesktopBackground.displayName = 'DesktopBackground'

export const DesktopView = memo(({ onBack }: DesktopViewProps) => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const { openWindow } = useWindowStore()
  const { goToHome } = useSceneStore()

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
      <TopBar />

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

      <Dock />

      <div
        className="absolute inset-0 z-0"
        onClick={handleDesktopClick}
        role="presentation"
      />
    </div>
  )
})
DesktopView.displayName = 'DesktopView'

export default DesktopView
