import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Theme, ThemeState } from '../types/theme';
import { themes } from '../config/themes';

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      currentTheme: themes[0],
      setTheme: (theme: Theme) => set({ currentTheme: theme }),
    }),
    {
      name: 'theme-storage',
    }
  )
);