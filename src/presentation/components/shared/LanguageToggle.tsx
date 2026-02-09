import { memo } from 'react'
import { useLanguageStore } from '@/application/store/useLanguageStore'

export const LanguageToggle = memo(() => {
  const { language, toggleLanguage } = useLanguageStore()

  const isSpanish = language === 'es'

  return (
    <button
      onClick={toggleLanguage}
      className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-full hover:bg-black/60 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
      style={{
        width: 'var(--icon-2xl)',
        height: 'var(--icon-2xl)',
      }}
      aria-label={isSpanish ? 'Switch to English' : 'Cambiar a Español'}
      title={isSpanish ? 'English' : 'Español'}
    >
      <div className="relative w-full h-full flex items-center justify-center font-semibold text-sm">
        {/* ES Label */}
        <div
          className={`absolute transition-all duration-300 ${
            isSpanish
              ? 'opacity-100 rotate-0 scale-100 text-yellow-400'
              : 'opacity-0 rotate-90 scale-0 text-white'
          }`}
        >
          ES
        </div>

        {/* EN Label */}
        <div
          className={`absolute transition-all duration-300 ${
            !isSpanish
              ? 'opacity-100 rotate-0 scale-100 text-blue-400'
              : 'opacity-0 -rotate-90 scale-0 text-white'
          }`}
        >
          EN
        </div>
      </div>
    </button>
  )
})

LanguageToggle.displayName = 'LanguageToggle'

export default LanguageToggle
