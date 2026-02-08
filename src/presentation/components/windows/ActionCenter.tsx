import { useState, useCallback, memo } from 'react'
import { useThemeStore } from '@/application/store/useThemeStore'
import { PROFILE } from '@/core/constants/profile'

interface ActionCenterProps {
  isOpen: boolean
  onClose: () => void
}

interface ToggleButtonProps {
  icon: string
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
    <span className="text-2xl">{icon}</span>
    <span className="text-white text-xs font-medium">{label}</span>
  </button>
))
ToggleButton.displayName = 'ToggleButton'

interface SliderControlProps {
  icon: string
  value: number
  onChange: (value: number) => void
  label: string
}

const SliderControl = memo(({ icon, label, value, onChange }: SliderControlProps) => (
  <div className="flex items-center gap-3 bg-white/10 rounded-lg" style={{ padding: 'var(--space-3)' }}>
    <span className="text-xl">{icon}</span>
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
              icon="📶"
              label="WiFi"
              isActive={wifi}
              onClick={() => setWifi(!wifi)}
            />
            <ToggleButton
              icon="🔵"
              label="Bluetooth"
              isActive={bluetooth}
              onClick={() => setBluetooth(!bluetooth)}
            />
            <ToggleButton
              icon="✈️"
              label="Avión"
              isActive={airplane}
              onClick={() => setAirplane(!airplane)}
            />
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <ToggleButton
              icon={theme === 'dark' ? '🌙' : '☀️'}
              label="Tema"
              isActive={false}
              onClick={handleToggleTheme}
            />
            <ToggleButton
              icon="🔋"
              label="Batería"
              isActive={false}
              onClick={() => {}}
            />
            <ToggleButton
              icon="🎯"
              label="Enfocar"
              isActive={false}
              onClick={() => {}}
            />
          </div>

          <div style={{ marginBottom: 'var(--space-3)' }}>
            <SliderControl
              icon="☀️"
              value={brightness}
              onChange={setBrightness}
              label="Brillo"
            />
            <div style={{ height: 'var(--space-2)' }} />
            <SliderControl
              icon="🔊"
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
