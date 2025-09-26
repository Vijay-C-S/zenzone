import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useDarkMode = create(
  persist(
    (set) => ({
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: 'zenzone-dark-mode',
    }
  )
)