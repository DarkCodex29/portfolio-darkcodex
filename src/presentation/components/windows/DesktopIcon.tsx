import { memo } from 'react'
import { useLanguageStore } from '@/application/store/useLanguageStore'
import type { DesktopIcon as DesktopIconType } from '@/core/constants/desktop'

interface DesktopIconProps {
  icon: DesktopIconType
  isSelected: boolean
  onClick: () => void
  onDoubleClick: () => void
}

export const DesktopIcon = memo(({ icon, isSelected, onClick, onDoubleClick }: DesktopIconProps) => {
  const { translations } = useLanguageStore()

  const getTranslatedName = () => {
    if (!icon.nameKey) return icon.name
    const keys = icon.nameKey.split('.')
    let value: any = translations
    for (const key of keys) {
      value = value[key]
    }
    return value || icon.name
  }

  return (
  <button
    className={`flex flex-col items-center gap-1 p-2 rounded transition-all cursor-default select-none ${
      isSelected ? 'bg-primary-500/30 border border-primary-400/50' : 'hover:bg-white/10'
    }`}
    onClick={onClick}
    onDoubleClick={onDoubleClick}
  >
    <div className="w-14 h-14 flex items-center justify-center">
      {icon.icon === 'hdd' || icon.icon === 'pc' ? (
        <div className="w-12 h-12 rounded bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/>
          </svg>
        </div>
      ) : (
        <img
          src={icon.icon}
          alt={icon.name}
          className="w-12 h-12 object-contain drop-shadow-lg"
          draggable={false}
        />
      )}
    </div>
    <span className="text-[11px] text-white font-medium text-center max-w-[70px] leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
      {getTranslatedName()}
    </span>
  </button>
  )
})
DesktopIcon.displayName = 'DesktopIcon'

interface BackButtonProps {
  isSelected: boolean
  onClick: () => void
  onDoubleClick: () => void
}

export const BackButton = memo(({ isSelected, onClick, onDoubleClick }: BackButtonProps) => {
  const { translations } = useLanguageStore()

  return (
  <button
    className={`flex flex-col items-center gap-1 p-2 rounded transition-all cursor-default select-none ${
      isSelected ? 'bg-primary-500/30 border border-primary-400/50' : 'hover:bg-white/10'
    }`}
    onClick={onClick}
    onDoubleClick={onDoubleClick}
  >
    <div className="w-14 h-14 flex items-center justify-center">
      <div className="w-12 h-12 rounded bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
        <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </div>
    </div>
    <span className="text-[11px] text-white font-medium text-center drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
      {translations.desktop.back}
    </span>
  </button>
  )
})
BackButton.displayName = 'BackButton'

export default DesktopIcon
