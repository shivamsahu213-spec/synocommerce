import { QueryClient } from '@tanstack/react-query';

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60000,
        gcTime: 300000,
        refetchOnWindowFocus: false,
        retry: 1
      }
    }
  });
}
