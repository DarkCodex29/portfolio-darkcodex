import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

const INITIAL_Z_INDEX = 1000

interface WindowState {
  isOpen: boolean
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
  data: any
}

interface WindowConfig {
  [key: string]: WindowState
}

const WINDOW_CONFIG: WindowConfig = {
  finder: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
  safari: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
  vscode: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
  about: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
}

interface WindowStoreState {
  windows: WindowConfig
  nextZIndex: number

  // Actions
  openWindow: (windowKey: string, data?: any) => void
  closeWindow: (windowKey: string) => void
  focusWindow: (windowKey: string) => void
  toggleMaximizeWindow: (windowKey: string) => void
  minimizeWindow: (windowKey: string) => void
  restoreWindow: (windowKey: string) => void
  toggleWindow: (windowKey: string) => void
}

export const useWindowStore = create<WindowStoreState>()(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,

    openWindow: (windowKey, data = null) =>
      set((state) => {
        const win = state.windows[windowKey]
        if (!win) return
        win.isOpen = true
        win.zIndex = state.nextZIndex++
        win.data = data ?? win.data
      }),

    closeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey]
        if (!win) return
        win.isOpen = false
        win.isMaximized = false
        win.zIndex = INITIAL_Z_INDEX
        win.data = null
      }),

    focusWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey]
        if (!win) return
        win.zIndex = state.nextZIndex++
      }),

    toggleMaximizeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey]
        if (!win) return
        win.isMaximized = !win.isMaximized
        if (win.isMaximized) {
          win.zIndex = state.nextZIndex++
        }
      }),

    minimizeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey]
        if (!win) return
        win.isMinimized = true
      }),

    restoreWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey]
        if (!win) return
        win.isMinimized = false
        win.zIndex = state.nextZIndex++
      }),

    toggleWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey]
        if (!win) return

        if (!win.isOpen) {
          win.isOpen = true
          win.isMinimized = false
          win.zIndex = state.nextZIndex++
        } else if (win.isMinimized) {
          win.isMinimized = false
          win.zIndex = state.nextZIndex++
        } else {
          win.isMinimized = true
        }
      }),
  }))
)

export default useWindowStore
