import { create } from "zustand"
import { persist } from "zustand/middleware"

const useThemeStore = create(
  persist(
    (set) => ({
      darkMode: true,
      toggleDarkMode: () =>
        set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: "theme-storage", // key in localStorage
    }
  )
)

export default useThemeStore
