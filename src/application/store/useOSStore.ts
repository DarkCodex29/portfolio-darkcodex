import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type OperatingSystem = 'macos' | 'windows11'

interface OSState {
  currentOS: OperatingSystem
  setOS: (os: OperatingSystem) => void
  toggleOS: () => void
}

export const useOSStore = create<OSState>()(
  persist(
    (set, get) => ({
      currentOS: 'macos',
      setOS: (os) => {
        set({ currentOS: os })
      },
      toggleOS: () => {
        const newOS = get().currentOS === 'macos' ? 'windows11' : 'macos'
        set({ currentOS: newOS })
      },
    }),
    {
      name: 'darkcodex-os',
    }
  )
)
