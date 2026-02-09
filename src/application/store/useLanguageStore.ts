import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { TRANSLATIONS, type Language, type TranslationKeys } from '@/core/constants/translations'

interface LanguageState {
  language: Language
  translations: TranslationKeys
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: 'es',
      translations: TRANSLATIONS.es,
      setLanguage: (language) => {
        set({ language, translations: TRANSLATIONS[language] })
        document.documentElement.setAttribute('lang', language)
      },
      toggleLanguage: () => {
        const newLanguage = get().language === 'es' ? 'en' : 'es'
        set({ language: newLanguage, translations: TRANSLATIONS[newLanguage] })
        document.documentElement.setAttribute('lang', newLanguage)
      },
    }),
    {
      name: 'darkcodex-language',
      onRehydrateStorage: () => (state) => {
        if (state) {
          document.documentElement.setAttribute('lang', state.language)
        }
      },
    }
  )
)
