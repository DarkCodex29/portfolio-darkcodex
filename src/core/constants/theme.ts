export const colors = {
  primary: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
  },
  accent: {
    cyan: '#22d3ee',
    teal: '#2dd4bf',
    emerald: '#34d399',
  },
  neutral: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#09090b',
  },
  surface: {
    dark: {
      base: '#0a0a0f',
      elevated: '#12121a',
      overlay: '#1a1a24',
      border: 'rgba(255, 255, 255, 0.08)',
    },
    light: {
      base: '#ffffff',
      elevated: '#f4f4f5',
      overlay: '#e4e4e7',
      border: 'rgba(0, 0, 0, 0.08)',
    },
  },
  text: {
    dark: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      muted: 'rgba(255, 255, 255, 0.5)',
    },
    light: {
      primary: '#18181b',
      secondary: 'rgba(24, 24, 27, 0.7)',
      muted: 'rgba(24, 24, 27, 0.5)',
    },
  },
  status: {
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  gradient: {
    primary: 'linear-gradient(135deg, #6d28d9 0%, #8b5cf6 50%, #a78bfa 100%)',
    dark: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)',
    glow: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
  },
} as const

export const spacing = {
  section: {
    padding: {
      mobile: '1.5rem',
      tablet: '3rem',
      desktop: '4rem',
    },
  },
  container: {
    maxWidth: '1280px',
    padding: '1rem',
  },
} as const

export const animation = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
    slower: 800,
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export type Theme = 'dark' | 'light'
export type Colors = typeof colors
