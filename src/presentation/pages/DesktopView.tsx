import { useState, useEffect } from 'react'
import { Dock } from '@/presentation/features/settings/components/Dock'
import { TerminalWindow } from '@/presentation/features/skills/components/TerminalWindow'
import { AboutWindow } from '@/presentation/features/about/components/AboutWindow'
import { ProjectsWindow } from '@/presentation/features/projects/components/ProjectsWindow'
import { ContactWindow } from '@/presentation/features/contact/components/ContactWindow'

interface DesktopViewProps {
  onBack?: () => void
}

const desktopIcons = [
  { id: 'projects', name: 'Projects', icon: '/images/folder.png', type: 'folder' },
  { id: 'about', name: 'About Me', icon: '/images/txt.png', type: 'file' },
  { id: 'resume', name: 'Resume.pdf', icon: '/images/pdf.png', type: 'file' },
  { id: 'github', name: 'GitHub', icon: '/icons/github.svg', type: 'link' },
  { id: 'linkedin', name: 'LinkedIn', icon: '/icons/linkedin.svg', type: 'link' },
]

const sideIcons = [
  { id: 'macintosh', name: 'Macintosh HD', icon: 'hdd' },
  { id: 'experience', name: 'Experience', icon: '/images/folder.png' },
  { id: 'education', name: 'Education', icon: '/images/folder.png' },
  { id: 'skills', name: 'Skills', icon: '/images/terminal.png' },
]

export const DesktopView = ({ onBack }: DesktopViewProps) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 h-7 bg-black/40 backdrop-blur-2xl flex items-center justify-between px-4 z-50 border-b border-white/5">
        <div className="flex items-center gap-5">
          <button className="text-white font-bold text-sm hover:bg-white/10 px-2 py-0.5 rounded transition-colors"></button>
          <span className="text-white/90 text-[13px] font-semibold">DarkCodex</span>
          <div className="flex items-center gap-4 text-white/60 text-[13px]">
            {['File', 'Edit', 'View', 'Go', 'Window', 'Help'].map(item => (
              <button key={item} className="hover:text-white transition-colors">{item}</button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 text-white/70 text-[13px]">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span>100%</span>
          </div>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
          </svg>
          <div className="px-2 py-0.5 rounded hover:bg-white/10 cursor-pointer">
            <span>{formatDate(currentTime)}</span>
            <span className="ml-2">{formatTime(currentTime)}</span>
          </div>
        </div>
      </div>

      <div className="absolute top-12 right-6 flex flex-col gap-2 z-10">
        {onBack && (
          <button
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all cursor-pointer ${selectedIcon === 'home' ? 'bg-white/20' : 'hover:bg-white/10'}`}
            onClick={(e) => {
              if (e.detail === 1) setSelectedIcon('home')
              if (e.detail === 2) onBack()
            }}
          >
            <div className="w-14 h-14 flex items-center justify-center">
              <svg className="w-12 h-12 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
            </div>
            <span className="text-[11px] text-white/90 font-medium">Home</span>
          </button>
        )}

        {desktopIcons.map((icon) => (
          <button
            key={icon.id}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all cursor-pointer ${selectedIcon === icon.id ? 'bg-white/20' : 'hover:bg-white/10'}`}
            onClick={() => setSelectedIcon(icon.id)}
          >
            <div className="w-14 h-14 flex items-center justify-center">
              <img src={icon.icon} alt={icon.name} className="w-12 h-12 object-contain drop-shadow-lg" draggable={false} />
            </div>
            <span className="text-[11px] text-white/90 font-medium text-center max-w-[70px] truncate">{icon.name}</span>
          </button>
        ))}
      </div>

      <div className="absolute top-12 left-6 flex flex-col gap-2 z-10">
        {sideIcons.map((icon) => (
          <button
            key={icon.id}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all cursor-pointer ${selectedIcon === icon.id ? 'bg-white/20' : 'hover:bg-white/10'}`}
            onClick={() => setSelectedIcon(icon.id)}
          >
            <div className="w-14 h-14 flex items-center justify-center">
              {icon.icon === 'hdd' ? (
                <svg className="w-12 h-12 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 4h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v10h16V6H4zm4 14h8v2H8v-2z"/>
                </svg>
              ) : (
                <img src={icon.icon} alt={icon.name} className="w-12 h-12 object-contain drop-shadow-lg" draggable={false} />
              )}
            </div>
            <span className="text-[11px] text-white/90 font-medium text-center">{icon.name}</span>
          </button>
        ))}
      </div>

      <TerminalWindow />
      <AboutWindow />
      <ProjectsWindow />
      <ContactWindow />

      <Dock />

      <div className="absolute inset-0 z-0" onClick={() => setSelectedIcon(null)} />
    </div>
  )
}

export default DesktopView
