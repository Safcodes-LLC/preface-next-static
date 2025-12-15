import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set) => ({
      isTextSize: 'medium',
      setTextSize: (size: 'small' | 'medium' | 'large') => set({ isTextSize: size }),
    }),
    {
      name: 'preface-web-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
