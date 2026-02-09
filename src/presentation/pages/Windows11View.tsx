import { useState, memo, useCallback, useEffect } from 'react'
import { useWindowStore } from '@/application/store/useWindowStore'
import { useSceneStore } from '@/application/store/useSceneStore'
import { useOSStore } from '@/application/store/useOSStore'
import { ActionCenter } from '@/presentation/components/windows/ActionCenter'
import { NotificationCenter } from '@/presentation/components/windows/NotificationCenter'
import { WindowsSearch } from '@/presentation/components/windows/WindowsSearch'
import { WindowsContextMenu } from '@/presentation/components/windows/WindowsContextMenu'
import { DesktopIcon, BackButton } from '@/presentation/components/windows/DesktopIcon'
import { WindowsWindowWrapper } from '@/presentation/components/windows/WindowsWindowWrapper'
import { GlobalControls } from '@/presentation/components/shared/GlobalControls'
import { Mail, Github, Linkedin, MapPin, FileText, User, Check } from 'lucide-react'
import { PROFILE, SECTORS, CV_PATH, CV_FILENAME, PROJECTS, EXPERIENCE, type Project, type Experience } from '@/core/constants/profile'
import { useLanguageStore } from '@/application/store/useLanguageStore'
import { DESKTOP_ICONS_WIN11, SIDEBAR_ICONS_WIN11, type DesktopIcon as DesktopIconType } from '@/core/constants/desktop'

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

interface StartMenuProps {
  isOpen: boolean
  onClose: () => void
  onAppClick: (windowId: string) => void
}

const StartMenu = memo(({ isOpen, onClose, onAppClick }: StartMenuProps) => {
  if (!isOpen) return null

  const apps = [
    { id: 'chrome', name: 'Experiencia', icon: '/icons/win11/chrome.png', windowId: 'safari' },
    { id: 'finder', name: 'Proyectos', icon: '/icons/win11/projects.png', windowId: 'finder' },
    { id: 'about', name: 'Sobre Mí', icon: '/icons/win11/file.png', windowId: 'about' },
    { id: 'contact', name: 'Contacto', icon: '/icons/win11/user-folder.png', windowId: 'contact' },
    { id: 'terminal', name: 'Skills', icon: '/icons/win11/notepad.png', windowId: 'terminal' },
    { id: 'photos', name: 'Galería', icon: '/icons/win11/folder-pictures.png', windowId: 'photos' },
    { id: 'explorer', name: 'Explorador', icon: '/icons/win11/explorer.png' },
    { id: 'settings', name: 'Configuración', icon: '/icons/win11/settings.png' },
    { id: 'edge', name: 'Edge', icon: '/icons/win11/chrome.png' },
    { id: 'vscode', name: 'VS Code', icon: '/icons/win11/vscode.png' },
    { id: 'network', name: 'Red', icon: '/icons/win11/network.png' },
    { id: 'calculator', name: 'Calculadora', icon: '/icons/win11/calculator.png' },
  ]

  const handleAppClick = (app: typeof apps[0]) => {
    if (app.windowId) {
      onAppClick(app.windowId)
      onClose()
    }
  }

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
                onClick={() => handleAppClick(app)}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <img
                    src={app.icon}
                    alt={app.name}
                    className="w-full h-full object-contain"
                    draggable={false}
                  />
                </div>
                <span className="text-white text-[10px] text-center leading-tight">{app.name}</span>
              </button>
            ))}
          </div>

          <div className="border-t border-white/10 pt-4">
            <h3 className="text-white font-semibold text-sm mb-3">Recomendadas</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors">
                <div className="w-8 h-8 rounded flex items-center justify-center">
                  <img src="/images/pdf.png" alt="PDF" className="w-7 h-7 object-contain" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-white text-xs">CV_Gianpierre.pdf</p>
                  <p className="text-white/50 text-[10px]">Hace 2 horas</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors">
                <div className="w-8 h-8 rounded flex items-center justify-center">
                  <img src="/icons/win11/folder.png" alt="Folder" className="w-7 h-7 object-contain" />
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
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const { goToHome } = useSceneStore()
  const { toggleOS } = useOSStore()
  const { openWindow } = useWindowStore()
  const { translations } = useLanguageStore()

  const stats = [
    { id: 'years', value: '6+', label: translations.stats.years },
    { id: 'apps', value: '10+', label: translations.stats.apps },
    { id: 'users', value: '10K+', label: translations.stats.users },
  ]

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

  const handleDesktopClick = useCallback(() => {
    setSelectedIcon(null)
  }, [])

  const handleDownload = useCallback((url: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = url.split('/').pop() || 'download'
    link.click()
  }, [])

  const handleIconAction = useCallback((icon: DesktopIconType) => {
    if (icon.action === 'window' && icon.windowId) {
      openWindow(icon.windowId)
    } else if (icon.action === 'link' && icon.url) {
      window.open(icon.url, '_blank', 'noopener,noreferrer')
    } else if (icon.action === 'download' && icon.downloadUrl) {
      handleDownload(icon.downloadUrl)
    }
  }, [openWindow, handleDownload])

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
        setSelectedIcon(null)
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

      <div className="absolute top-4 left-4 flex flex-col gap-0.5 z-10 pointer-events-auto">
        {onBack && (
          <BackButton
            isSelected={selectedIcon === 'back'}
            onClick={() => setSelectedIcon('back')}
            onDoubleClick={handleBack}
          />
        )}
        {DESKTOP_ICONS_WIN11.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon}
            isSelected={selectedIcon === icon.id}
            onClick={() => setSelectedIcon(icon.id)}
            onDoubleClick={() => handleIconAction(icon)}
          />
        ))}
        {SIDEBAR_ICONS_WIN11.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon}
            isSelected={selectedIcon === icon.id}
            onClick={() => setSelectedIcon(icon.id)}
            onDoubleClick={() => handleIconAction(icon)}
          />
        ))}
      </div>

      <div
        className="absolute inset-0 pointer-events-auto"
        onClick={handleDesktopClick}
      />

      <Taskbar
        onStartClick={handleStartClick}
        isStartOpen={isStartOpen}
        onSearchClick={handleSearchClick}
        onActionCenterClick={handleActionCenterClick}
        onNotificationClick={handleNotificationClick}
        onOSToggle={toggleOS}
      />
      <StartMenu isOpen={isStartOpen} onClose={handleCloseStart} onAppClick={openWindow} />
      <WindowsSearch isOpen={isSearchOpen} onClose={handleCloseSearch} />
      <ActionCenter isOpen={isActionCenterOpen} onClose={handleCloseActionCenter} />
      <NotificationCenter isOpen={isNotificationOpen} onClose={handleCloseNotification} />
      <WindowsContextMenu
        isOpen={!!contextMenu}
        position={contextMenu || { x: 0, y: 0 }}
        onClose={handleCloseContextMenu}
      />

      {/* Terminal Window - Skills */}
      <WindowsWindowWrapper windowKey="terminal" title="Skills - Terminal" icon="/icons/win11/notepad.png" className="w-[600px]">
        <div className="font-mono" style={{ fontSize: 'var(--text-sm)' }}>
          <div className="text-green-400" style={{ marginBottom: 'var(--space-4)' }}>
            <span className="text-primary-400">gian@darkcodex</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-white">$ </span>
            <span className="text-gray-300">{translations.windows.terminal.command}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {[
              { category: 'Mobile', items: ['Flutter (6y)', 'Kotlin (7y)', 'Swift (5y)', 'React Native (3y)'] },
              { category: 'Frontend', items: ['React (4y)', 'Angular (4y)', 'Next.js (2y)', 'TypeScript (6y)'] },
              { category: 'Backend', items: ['NestJS (3y)', '.NET/C# (4y)', 'Node.js (5y)', 'Java/Spring (6y)'] },
              { category: 'Database', items: ['PostgreSQL (5y)', 'Firebase (6y)', 'Redis (3y)', 'SQL Server (4y)'] },
              { category: 'DevOps', items: ['Docker (4y)', 'AWS (3y)', 'CI/CD (5y)', 'GitHub Actions'] },
              { category: 'AI & Tools', items: ['Claude AI', 'OpenAI SDK', 'Prisma ORM', 'Clean Architecture'] },
            ].map(({ category, items }) => (
              <div key={category} className="flex items-start" style={{ gap: 'var(--space-3)' }}>
                <Check style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} className="text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-yellow-400 font-semibold">{category}:</span>
                  <span className="text-gray-300" style={{ marginLeft: 'var(--space-2)' }}>{items.join(' | ')}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10" style={{ marginTop: 'var(--window-gap)', paddingTop: 'var(--space-4)' }}>
            <div className="text-green-400 flex items-center" style={{ gap: 'var(--space-2)' }}>
              <Check style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />
              <span>6 {translations.windows.terminal.categoriesLoaded}</span>
            </div>
            <div className="text-gray-500" style={{ fontSize: 'var(--text-xs)', marginTop: 'var(--space-1)' }}>
              {translations.windows.terminal.renderTime}
            </div>
          </div>

          <div className="text-green-400" style={{ marginTop: 'var(--space-4)' }}>
            <span className="text-primary-400">gian@darkcodex</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-white">$ </span>
            <span className="animate-pulse">▊</span>
          </div>
        </div>
      </WindowsWindowWrapper>

      {/* About Window */}
      <WindowsWindowWrapper windowKey="about" title={translations.windows.about.title} icon="/icons/win11/file.png" className="w-[580px]">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--window-gap)' }}>
          <div className="flex items-start" style={{ gap: 'var(--space-4)' }}>
            <div
              className="rounded-full bg-gradient-to-br from-primary-500 to-accent-sky flex items-center justify-center"
              style={{ width: 'var(--icon-3xl)', height: 'var(--icon-3xl)' }}
            >
              <User style={{ width: 'var(--icon-xl)', height: 'var(--icon-xl)' }} className="text-white" />
            </div>
            <div>
              <h2 className="font-bold text-white" style={{ fontSize: 'var(--text-xl)' }}>{PROFILE.name.full}</h2>
              <p className="text-primary-400 font-medium" style={{ fontSize: 'var(--text-base)' }}>{translations.windows.about.role}</p>
              <p className="text-gray-400 flex items-center" style={{ fontSize: 'var(--text-sm)', marginTop: 'var(--space-1)', gap: 'var(--space-1)' }}>
                <MapPin style={{ width: 'var(--icon-xs)', height: 'var(--icon-xs)' }} />
                {translations.windows.about.location}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3" style={{ gap: 'var(--space-3)' }}>
            {stats.map(({ id, label, value }) => (
              <div key={id} className="bg-white/5 text-center" style={{ padding: 'var(--card-padding)', borderRadius: 'var(--card-radius)' }}>
                <div className="font-bold text-white" style={{ fontSize: 'var(--text-2xl)' }}>{value}</div>
                <div className="text-gray-400" style={{ fontSize: 'var(--text-xs)' }}>{label}</div>
              </div>
            ))}
          </div>

          <div className="text-gray-300 leading-relaxed" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', fontSize: 'var(--text-sm)' }}>
            <p>
              {translations.windows.about.bioP1.split('Flutter')[0]}
              <span className="text-primary-400">Flutter</span>
              {translations.windows.about.bioP1.split('Flutter')[1].split('Kotlin')[0]}
              <span className="text-primary-400">Kotlin</span>
              {translations.windows.about.bioP1.split('Kotlin')[1]}
            </p>
            <p>
              {translations.windows.about.bioP2.split('.NET')[0]}
              <span className="text-blue-400">.NET, NestJS, Angular, React, Laravel</span>.
            </p>
            <p>
              {translations.windows.about.bioP3.split('Keola Networks')[0]}
              <span className="text-green-400">Keola Networks (fintech)</span>,{' '}
              <span className="text-green-400">Software Engineering LATAM</span>,{' '}
              <span className="text-green-400">Grupo EBIM</span>
              {translations.windows.about.bioP3.split('Grupo EBIM')[1]}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white" style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)' }}>
              {translations.windows.about.sectorsTitle}
            </h3>
            <div className="flex flex-wrap" style={{ gap: 'var(--space-2)' }}>
              {SECTORS.map((sector) => (
                <span
                  key={sector}
                  className="bg-primary-500/20 text-primary-300 font-medium"
                  style={{
                    fontSize: 'var(--text-xs)',
                    padding: 'var(--badge-padding-y) var(--badge-padding-x)',
                    borderRadius: 'var(--badge-radius)'
                  }}
                >
                  {translations.sectors[sector as keyof typeof translations.sectors] || sector}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap" style={{ gap: 'var(--space-3)', paddingTop: 'var(--space-2)' }}>
            <a
              href={`mailto:${PROFILE.contact.email}`}
              className="flex items-center bg-primary-500 hover:bg-primary-600 text-white transition-colors"
              style={{
                fontSize: 'var(--text-sm)',
                padding: 'var(--btn-padding-y) var(--btn-padding-x)',
                gap: 'var(--btn-gap)',
                borderRadius: 'var(--btn-radius)'
              }}
            >
              <Mail style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />
              {translations.actions.email}
            </a>
            <a
              href={PROFILE.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-gray-700 hover:bg-gray-600 text-white transition-colors"
              style={{
                fontSize: 'var(--text-sm)',
                padding: 'var(--btn-padding-y) var(--btn-padding-x)',
                gap: 'var(--btn-gap)',
                borderRadius: 'var(--btn-radius)'
              }}
            >
              <Github style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />
              GitHub
            </a>
            <a
              href={PROFILE.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              style={{
                fontSize: 'var(--text-sm)',
                padding: 'var(--btn-padding-y) var(--btn-padding-x)',
                gap: 'var(--btn-gap)',
                borderRadius: 'var(--btn-radius)'
              }}
            >
              <Linkedin style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />
              LinkedIn
            </a>
            <button
              onClick={() => {
                const link = document.createElement('a')
                link.href = CV_PATH
                link.download = CV_FILENAME
                link.click()
              }}
              className="flex items-center bg-green-600 hover:bg-green-700 text-white transition-colors"
              style={{
                fontSize: 'var(--text-sm)',
                padding: 'var(--btn-padding-y) var(--btn-padding-x)',
                gap: 'var(--btn-gap)',
                borderRadius: 'var(--btn-radius)'
              }}
            >
              <FileText style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />
              {translations.actions.resume}
            </button>
          </div>
        </div>
      </WindowsWindowWrapper>

      {/* Projects Window */}
      <WindowsWindowWrapper windowKey="finder" title={translations.windows.projects.title} icon="/icons/win11/projects.png" className="w-[800px] max-h-[80vh]">
        <div className="grid grid-cols-2" style={{ gap: 'var(--grid-gap)' }}>
          {PROJECTS.map((project: Project) => (
            <div
              key={project.id}
              className="border transition-all duration-200 hover:scale-[1.01] rounded-lg overflow-hidden"
              style={{
                padding: 'var(--card-padding)',
                background: `linear-gradient(135deg, ${project.color}10, transparent)`,
                borderColor: `${project.color}30`,
              }}
            >
              <div style={{ marginBottom: 'var(--space-3)' }}>
                <div className="flex items-start justify-between" style={{ marginBottom: 'var(--space-2)' }}>
                  <h3 className="font-bold text-white" style={{ fontSize: 'var(--text-base)' }}>{project.name}</h3>
                  <span
                    className="text-white/60"
                    style={{ fontSize: 'var(--text-xs)', padding: 'var(--badge-padding-y) var(--badge-padding-x)' }}
                  >
                    {project.year}
                  </span>
                </div>
                <p className="text-white/60" style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)' }}>{project.description}</p>
                <span
                  className="inline-block"
                  style={{
                    fontSize: 'var(--text-xs)',
                    padding: 'var(--badge-padding-y) var(--badge-padding-x)',
                    borderRadius: 'var(--badge-radius)',
                    backgroundColor: `${project.color}20`,
                    color: project.color,
                  }}
                >
                  {project.sector}
                </span>
              </div>
              <div className="flex flex-wrap" style={{ gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
                {project.techStack.slice(0, 5).map((tech: string) => (
                  <span key={tech} className="bg-white/10 text-white/70" style={{ fontSize: 'var(--text-xs)', padding: 'var(--space-1) var(--space-2)', borderRadius: 'var(--radius-sm)' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </WindowsWindowWrapper>

      {/* Contact Window */}
      <WindowsWindowWrapper windowKey="contact" title={translations.windows.contact.title} icon="/icons/win11/user-folder.png" className="w-[500px]">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--window-gap)' }}>
          <p className="text-gray-300" style={{ fontSize: 'var(--text-base)' }}>{translations.windows.contact.subtitle}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <a href={`mailto:${PROFILE.contact.email}`} className="flex items-center text-white hover:text-primary-400 transition-colors" style={{ gap: 'var(--space-3)' }}>
              <div className="bg-primary-500/20 rounded-lg flex items-center justify-center" style={{ width: 'var(--icon-xl)', height: 'var(--icon-xl)' }}>
                <Mail style={{ width: 'var(--icon-base)', height: 'var(--icon-base)' }} className="text-primary-400" />
              </div>
              <div>
                <div className="font-medium" style={{ fontSize: 'var(--text-sm)' }}>{translations.windows.contact.email}</div>
                <div className="text-gray-400" style={{ fontSize: 'var(--text-xs)' }}>{PROFILE.contact.email}</div>
              </div>
            </a>
            <a href={PROFILE.contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center text-white hover:text-primary-400 transition-colors" style={{ gap: 'var(--space-3)' }}>
              <div className="bg-gray-700/50 rounded-lg flex items-center justify-center" style={{ width: 'var(--icon-xl)', height: 'var(--icon-xl)' }}>
                <Github style={{ width: 'var(--icon-base)', height: 'var(--icon-base)' }} className="text-white" />
              </div>
              <div>
                <div className="font-medium" style={{ fontSize: 'var(--text-sm)' }}>GitHub</div>
                <div className="text-gray-400" style={{ fontSize: 'var(--text-xs)' }}>@DarkCodex29</div>
              </div>
            </a>
            <a href={PROFILE.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center text-white hover:text-primary-400 transition-colors" style={{ gap: 'var(--space-3)' }}>
              <div className="bg-blue-600/20 rounded-lg flex items-center justify-center" style={{ width: 'var(--icon-xl)', height: 'var(--icon-xl)' }}>
                <Linkedin style={{ width: 'var(--icon-base)', height: 'var(--icon-base)' }} className="text-blue-400" />
              </div>
              <div>
                <div className="font-medium" style={{ fontSize: 'var(--text-sm)' }}>LinkedIn</div>
                <div className="text-gray-400" style={{ fontSize: 'var(--text-xs)' }}>gianpierre-mio</div>
              </div>
            </a>
          </div>
        </div>
      </WindowsWindowWrapper>

      {/* Experience Window */}
      <WindowsWindowWrapper windowKey="safari" title={translations.windows.experience.title} icon="/icons/win11/chrome.png" className="w-[700px] max-h-[80vh]">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--window-gap)' }}>
          {EXPERIENCE.map((exp: Experience) => (
            <div
              key={exp.id}
              className="border transition-all duration-200"
              style={{
                padding: 'var(--card-padding)',
                borderRadius: 'var(--card-radius)',
                background: `linear-gradient(135deg, ${exp.color}10, transparent)`,
                borderColor: `${exp.color}30`,
              }}
            >
              <div className="flex items-start justify-between" style={{ marginBottom: 'var(--space-2)' }}>
                <div>
                  <h3 className="font-bold text-white" style={{ fontSize: 'var(--text-base)' }}>{exp.role}</h3>
                  <p className="font-medium" style={{ fontSize: 'var(--text-sm)', color: exp.color }}>{exp.company}</p>
                </div>
                <span className="text-gray-400" style={{ fontSize: 'var(--text-xs)' }}>{exp.period}</span>
              </div>
              <p className="text-white/60" style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)' }}>{exp.description}</p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', marginBottom: 'var(--space-3)' }}>
                {exp.achievements.slice(0, 3).map((achievement: string, idx: number) => (
                  <li key={idx} className="text-white/50 flex items-start" style={{ fontSize: 'var(--text-xs)', gap: 'var(--space-2)' }}>
                    <span style={{ color: exp.color }}>•</span>
                    {achievement}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap" style={{ gap: 'var(--space-2)' }}>
                {exp.techStack.slice(0, 6).map((tech: string) => (
                  <span
                    key={tech}
                    className="bg-white/10 text-white/70"
                    style={{ fontSize: 'var(--text-xs)', padding: 'var(--space-1) var(--space-2)', borderRadius: 'var(--radius-sm)' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </WindowsWindowWrapper>

      {/* Gallery Window - Placeholder */}
      <WindowsWindowWrapper windowKey="photos" title="Galería" icon="/icons/win11/folder-pictures.png" className="w-[600px]">
        <div className="flex items-center justify-center" style={{ minHeight: '300px' }}>
          <p className="text-gray-400 text-center">Galería de proyectos próximamente</p>
        </div>
      </WindowsWindowWrapper>

      {/* Global Theme Toggle */}
      <GlobalControls />
    </div>
  )
})
Windows11View.displayName = 'Windows11View'

export default Windows11View
