import { memo, useState, useRef, useEffect } from 'react'
import { useThemeStore } from '@/application/store/useThemeStore'

interface ControlCenterProps {
  isOpen: boolean
  onClose: () => void
}

const ToggleTile = memo(({
  icon,
  label,
  isActive,
  onClick,
  activeColor = 'bg-primary-500'
}: {
  icon: React.ReactNode
  label: string
  isActive: boolean
  onClick: () => void
  activeColor?: string
}) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center rounded-xl transition-all duration-200 ${
      isActive
        ? `${activeColor} text-white shadow-lg`
        : 'bg-white/10 text-white/80 hover:bg-white/20'
    }`}
    style={{ padding: 'var(--space-3)', minHeight: '70px' }}
  >
    <div style={{ marginBottom: 'var(--space-1)' }}>{icon}</div>
    <span style={{ fontSize: 'var(--text-xs)' }}>{label}</span>
  </button>
))
ToggleTile.displayName = 'ToggleTile'

const SliderControl = memo(({
  icon,
  value,
  onChange,
  label
}: {
  icon: React.ReactNode
  value: number
  onChange: (value: number) => void
  label: string
}) => (
  <div className="flex items-center gap-3 bg-white/10 rounded-xl" style={{ padding: 'var(--space-3)' }}>
    <div className="text-white/80">{icon}</div>
    <input
      type="range"
      min="0"
      max="100"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer
        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:w-4
        [&::-webkit-slider-thumb]:h-4
        [&::-webkit-slider-thumb]:rounded-full
        [&::-webkit-slider-thumb]:bg-white
        [&::-webkit-slider-thumb]:shadow-md
        [&::-webkit-slider-thumb]:cursor-pointer"
      aria-label={label}
    />
  </div>
))
SliderControl.displayName = 'SliderControl'

export const ControlCenter = memo(({ isOpen, onClose }: ControlCenterProps) => {
  const { theme, toggleTheme } = useThemeStore()
  const [wifi, setWifi] = useState(true)
  const [bluetooth, setBluetooth] = useState(true)
  const [airdrop, setAirdrop] = useState(false)
  const [brightness, setBrightness] = useState(80)
  const [volume, setVolume] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      ref={containerRef}
      className="absolute top-8 right-2 w-80 bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl z-[100] animate-fade-in"
      style={{ padding: 'var(--space-3)' }}
    >
      <div className="grid grid-cols-2 gap-2" style={{ marginBottom: 'var(--space-3)' }}>
        <div className="col-span-2 grid grid-cols-3 gap-2">
          <ToggleTile
            icon={
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
              </svg>
            }
            label="Wi-Fi"
            isActive={wifi}
            onClick={() => setWifi(!wifi)}
            activeColor="bg-blue-500"
          />
          <ToggleTile
            icon={
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z"/>
              </svg>
            }
            label="Bluetooth"
            isActive={bluetooth}
            onClick={() => setBluetooth(!bluetooth)}
            activeColor="bg-blue-500"
          />
          <ToggleTile
            icon={
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            }
            label="AirDrop"
            isActive={airdrop}
            onClick={() => setAirdrop(!airdrop)}
            activeColor="bg-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2" style={{ marginBottom: 'var(--space-3)' }}>
        <ToggleTile
          icon={
            theme === 'dark' ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
              </svg>
            )
          }
          label={theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
          isActive={theme === 'dark'}
          onClick={toggleTheme}
          activeColor="bg-primary-600"
        />
        <ToggleTile
          icon={
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-9 18H4V4h7v16zm9 0h-7v-7h7v7zm0-9h-7V4h7v7z"/>
            </svg>
          }
          label="Stage Manager"
          isActive={false}
          onClick={() => {}}
        />
      </div>

      <div style={{ marginBottom: 'var(--space-3)' }}>
        <SliderControl
          icon={
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1z"/>
            </svg>
          }
          value={brightness}
          onChange={setBrightness}
          label="Brightness"
        />
        <div style={{ height: 'var(--space-2)' }} />
        <SliderControl
          icon={
            volume > 0 ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
            )
          }
          value={volume}
          onChange={setVolume}
          label="Sound"
        />
      </div>

      <div className="h-px bg-white/10" style={{ margin: '0 var(--space-2)' }} />

      <div
        className="flex items-center justify-between bg-white/10 rounded-xl"
        style={{ padding: 'var(--space-3)', marginTop: 'var(--space-3)' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
            <span className="text-white font-bold" style={{ fontSize: 'var(--text-sm)' }}>G</span>
          </div>
          <div>
            <p className="text-white font-medium" style={{ fontSize: 'var(--text-sm)' }}>Gianpierre</p>
            <p className="text-white/60" style={{ fontSize: 'var(--text-xs)' }}>Apple ID</p>
          </div>
        </div>
        <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
      </div>
    </div>
  )
})
ControlCenter.displayName = 'ControlCenter'

export default ControlCenter
