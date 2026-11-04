import { create } from 'zustand';
import type { User } from '../types';
import { login as authLogin, logout as authLogout, getCurrentUser } from '../services/authService';
import type { LoginCredentials } from '../services/authService';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  initialize: () => void;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  initialize: () => {
    const user = getCurrentUser();
    set({ user, isAuthenticated: user !== null });
  },

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const result = await authLogin(credentials);
      if (result.success && result.user) {
        set({ user: result.user, isAuthenticated: true, isLoading: false, error: null });
        return true;
      } else {
        set({ isLoading: false, error: result.error ?? 'Login failed.' });
        return false;
      }
    } catch {
      set({ isLoading: false, error: 'An unexpected error occurred. Please try again.' });
      return false;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    await authLogout();
    set({ user: null, isAuthenticated: false, isLoading: false, error: null });
  },

  clearError: () => set({ error: null }),
}));
