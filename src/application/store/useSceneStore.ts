import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type SceneView = 'badge' | 'room' | 'desktop'

interface SceneState {
  currentView: SceneView
  isTransitioning: boolean
  isMobile: boolean

  // Actions
  setView: (view: SceneView) => void
  setTransitioning: (value: boolean) => void
  setIsMobile: (value: boolean) => void

  // Navigation
  goToBadge: () => void
  goToRoom: () => void
  goToDesktop: () => void
}

export const useSceneStore = create<SceneState>()(
  immer((set) => ({
    currentView: 'badge',
    isTransitioning: false,
    isMobile: false,

    setView: (view) =>
      set((state) => {
        state.currentView = view
      }),

    setTransitioning: (value) =>
      set((state) => {
        state.isTransitioning = value
      }),

    setIsMobile: (value) =>
      set((state) => {
        state.isMobile = value
      }),

    goToBadge: () =>
      set((state) => {
        state.isTransitioning = true
        state.currentView = 'badge'
      }),

    goToRoom: () =>
      set((state) => {
        state.isTransitioning = true
        state.currentView = 'room'
      }),

    goToDesktop: () =>
      set((state) => {
        state.isTransitioning = true
        state.currentView = 'desktop'
      }),
  }))
)

export default useSceneStore
