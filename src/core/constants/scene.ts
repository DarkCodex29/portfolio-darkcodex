export const CAMERA = {
  badge: {
    position: [0, 0, 13] as [number, number, number],
    fov: 25,
  },
  setup: {
    position: [0, 0, 6] as [number, number, number],
    fov: 35,
  },
} as const

export const PHYSICS = {
  gravity: [0, -40, 0] as [number, number, number],
  timeStep: 1 / 60,
} as const

export const LIGHTS = {
  ambient: { intensity: Math.PI },
  directional: {
    main: { position: [5, 5, 5] as [number, number, number], intensity: 1.2 },
    fill: { position: [-5, 3, -5] as [number, number, number], intensity: 0.5 },
  },
  point: {
    primary: { position: [-2, 2, 3] as [number, number, number], intensity: 1, color: '#3b82f6' },
    accent: { position: [2, 0, 2] as [number, number, number], intensity: 0.5, color: '#06b6d4' },
  },
  formers: [
    { intensity: 2, color: 'white', position: [0, -1, 5] as [number, number, number], rotation: [0, 0, Math.PI / 3] as [number, number, number], scale: [100, 0.1, 1] as [number, number, number] },
    { intensity: 3, color: 'white', position: [-1, -1, 1] as [number, number, number], rotation: [0, 0, Math.PI / 3] as [number, number, number], scale: [100, 0.1, 1] as [number, number, number] },
    { intensity: 3, color: 'white', position: [1, 1, 1] as [number, number, number], rotation: [0, 0, Math.PI / 3] as [number, number, number], scale: [100, 0.1, 1] as [number, number, number] },
    { intensity: 10, color: 'white', position: [-10, 0, 14] as [number, number, number], rotation: [0, Math.PI / 2, Math.PI / 3] as [number, number, number], scale: [100, 10, 1] as [number, number, number] },
  ],
} as const

export const GL_CONFIG = {
  alpha: true,
  antialias: true,
  powerPreference: 'high-performance' as const,
} as const

export const TRANSITION = {
  scale: 100,
  opacity: 1,
  duration: 1.2,
  ease: 'power2.inOut',
} as const
