import { useState, useCallback, memo } from 'react'
import { useThemeStore } from '@/application/store/useThemeStore'
import { PROFILE } from '@/core/constants/profile'

interface ActionCenterProps {
  isOpen: boolean
  onClose: () => void
}

interface ToggleButtonProps {
  icon: React.ReactNode
  label: string
  isActive: boolean
  onClick: () => void
}

const ToggleButton = memo(({ icon, label, isActive, onClick }: ToggleButtonProps) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-2 rounded-lg transition-all ${
      isActive ? 'bg-primary-500/30 border-2 border-primary-400' : 'bg-white/10 hover:bg-white/20'
    }`}
    style={{ padding: 'var(--space-3)', minHeight: '80px', flex: 1 }}
  >
    <div className="text-white text-2xl">{icon}</div>
    <span className="text-white text-xs font-medium">{label}</span>
  </button>
))
ToggleButton.displayName = 'ToggleButton'

interface SliderControlProps {
  icon: React.ReactNode
  value: number
  onChange: (value: number) => void
  label: string
}

const SliderControl = memo(({ icon, label, value, onChange }: SliderControlProps) => (
  <div className="flex items-center gap-3 bg-white/10 rounded-lg" style={{ padding: 'var(--space-3)' }}>
    <div className="text-white text-xl">{icon}</div>
    <div className="flex-1">
      <p className="text-white text-xs font-medium mb-2">{label}</p>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider-thumb"
      />
    </div>
    <span className="text-white text-xs font-medium w-8 text-right">{value}%</span>
  </div>
))
SliderControl.displayName = 'SliderControl'

export const ActionCenter = memo(({ isOpen, onClose }: ActionCenterProps) => {
  const { theme, toggleTheme } = useThemeStore()
  const [wifi, setWifi] = useState(true)
  const [bluetooth, setBluetooth] = useState(false)
  const [airplane, setAirplane] = useState(false)
  const [brightness, setBrightness] = useState(75)
  const [volume, setVolume] = useState(50)

  const handleToggleTheme = useCallback(() => {
    toggleTheme()
  }, [toggleTheme])

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-[80]" onClick={onClose} />
      <div className="fixed bottom-14 right-2 w-96 bg-black/60 backdrop-blur-3xl rounded-xl border border-white/10 shadow-2xl z-[90] animate-fade-in overflow-hidden">
        <div style={{ padding: 'var(--space-4)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold text-sm">Configuración rápida</h3>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white w-6 h-6 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-3">
            <ToggleButton
              icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>}
              label="WiFi"
              isActive={wifi}
              onClick={() => setWifi(!wifi)}
            />
            <ToggleButton
              icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z"/></svg>}
              label="Bluetooth"
              isActive={bluetooth}
              onClick={() => setBluetooth(!bluetooth)}
            />
            <ToggleButton
              icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>}
              label="Avión"
              isActive={airplane}
              onClick={() => setAirplane(!airplane)}
            />
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <ToggleButton
              icon={theme === 'dark' ? <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 2c-1.05 0-2.05.16-3 .46 4.06 1.27 7 5.06 7 9.54s-2.94 8.27-7 9.54c.95.3 1.95.46 3 .46 5.52 0 10-4.48 10-10S14.52 2 9 2z"/></svg> : <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/></svg>}
              label="Tema"
              isActive={false}
              onClick={handleToggleTheme}
            />
            <ToggleButton
              icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4zM13 18h-2v-2h2v2zm0-4h-2V9h2v5z"/></svg>}
              label="Batería"
              isActive={false}
              onClick={() => {}}
            />
            <ToggleButton
              icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>}
              label="Enfocar"
              isActive={false}
              onClick={() => {}}
            />
          </div>

          <div style={{ marginBottom: 'var(--space-3)' }}>
            <SliderControl
              icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/></svg>}
              value={brightness}
              onChange={setBrightness}
              label="Brillo"
            />
            <div style={{ height: 'var(--space-2)' }} />
            <SliderControl
              icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>}
              value={volume}
              onChange={setVolume}
              label="Volumen"
            />
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border-t border-white/10 flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">{PROFILE.name.first[0]}</span>
            </div>
            <span className="text-white text-sm">{PROFILE.name.first}</span>
          </div>
          <button className="px-3 py-1.5 rounded bg-primary-500/30 hover:bg-primary-500/40 text-white text-xs font-medium transition-colors">
            Configuración
          </button>
        </div>
      </div>
    </>
  )
})
ActionCenter.displayName = 'ActionCenter'

export default ActionCenter
