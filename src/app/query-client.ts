import { QueryClient } from '@tanstack/react-query';

/**
 * TanStack Query client configuration.
 *
 * Phase 1: Configured with sensible defaults for future API integration.
 * No real API calls are made in Phase 1.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000,   // 10 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});
