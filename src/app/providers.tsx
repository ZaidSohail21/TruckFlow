import { type ReactNode, useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { queryClient } from './query-client';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const initAuth = useAuthStore(state => state.initialize);
  const initTheme = useThemeStore(state => state.initialize);

  useEffect(() => {
    initTheme();
    initAuth();
  }, [initTheme, initAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          duration: 4000,
          style: {
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
          },
        }}
      />
    </QueryClientProvider>
  );
}
