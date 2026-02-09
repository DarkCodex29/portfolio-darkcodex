import { memo } from 'react'
import { useThemeStore } from '@/application/store/useThemeStore'
import { useLanguageStore } from '@/application/store/useLanguageStore'

export const GlobalControls = memo(() => {
  const { theme, toggleTheme } = useThemeStore()
  const { language, toggleLanguage } = useLanguageStore()

  const isDark = theme === 'dark'
  const isSpanish = language === 'es'

  return (
    <div
      className="fixed z-[200] flex items-center gap-3"
      style={{
        bottom: 'var(--space-6)',
        right: 'var(--space-6)',
      }}
    >
      {/* Language Toggle */}
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
          <div
            className={`absolute transition-all duration-300 ${
              isSpanish
                ? 'opacity-100 rotate-0 scale-100 text-yellow-400'
                : 'opacity-0 rotate-90 scale-0 text-white'
            }`}
          >
            ES
          </div>
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

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-full hover:bg-black/60 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
        style={{
          width: 'var(--icon-2xl)',
          height: 'var(--icon-2xl)',
        }}
        aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        title={isDark ? 'Modo claro' : 'Modo oscuro'}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <svg
            className={`absolute transition-all duration-300 ${
              isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'
            }`}
            style={{ width: 'var(--icon-md)', height: 'var(--icon-md)' }}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="5" className="text-yellow-400" />
            <line x1="12" y1="1" x2="12" y2="3" className="text-yellow-400" />
            <line x1="12" y1="21" x2="12" y2="23" className="text-yellow-400" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" className="text-yellow-400" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" className="text-yellow-400" />
            <line x1="1" y1="12" x2="3" y2="12" className="text-yellow-400" />
            <line x1="21" y1="12" x2="23" y2="12" className="text-yellow-400" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" className="text-yellow-400" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" className="text-yellow-400" />
          </svg>

          <svg
            className={`absolute transition-all duration-300 ${
              !isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
            }`}
            style={{ width: 'var(--icon-md)', height: 'var(--icon-md)' }}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              className="text-blue-400"
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
            />
          </svg>
        </div>
      </button>
    </div>
  )
})

GlobalControls.displayName = 'GlobalControls'

export default GlobalControls
