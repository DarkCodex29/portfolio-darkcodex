import { t } from './translations'

export const UI_TEXT = {
  hero: {
    cta: t.hero.cta,
    scrollHint: t.hero.scrollHint,
  },
  navigation: {
    back: t.navigation.back,
    home: t.navigation.home,
  },
  loading: {
    default: t.loading.default,
  },
} as const

export const LAYOUT = {
  hero: {
    position: 'left-[58%]',
    maxWidth: 'max-w-lg',
  },
  setup: {
    position: 'left-0',
    width: 'w-[50%]',
  },
  badge: {
    position: '-right-[15%]',
    width: 'w-[50%]',
  },
} as const

export const ICONS = {
  arrow: {
    viewBox: '0 0 24 24',
    path: 'M13 7l5 5m0 0l-5 5m5-5H6',
  },
} as const
