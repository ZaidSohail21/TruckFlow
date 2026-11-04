import { create } from 'zustand';
import type { Theme } from '../types';

const THEME_KEY = 'truckflow_theme';

function getStoredTheme(): Theme {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'dark' || stored === 'light') return stored;
  // Default to light theme
  return 'light';
}

function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  root.setAttribute('data-theme', theme);
  root.style.colorScheme = theme;
  localStorage.setItem(THEME_KEY, theme);
}

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  initialize: () => void;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: 'light',

  initialize: () => {
    const theme = getStoredTheme();
    applyTheme(theme);
    set({ theme });
  },

  setTheme: (theme) => {
    applyTheme(theme);
    set({ theme });
  },

  toggleTheme: () => {
    const next = get().theme === 'light' ? 'dark' : 'light';
    applyTheme(next);
    set({ theme: next });
  },
}));
