import { useQuery } from '@tanstack/react-query';
import { getAllBanks } from '@/fetchers/banks/get-all';


export function useBanks({ enabled = true } = {}) {
  const { data: apiResponse, isLoading, error } = useQuery({
    queryKey: ['banks'],
    queryFn: getAllBanks,
    enabled,
    gcTime: 10 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  console.log(apiResponse?.message);
  return {
    banks: apiResponse?.data ?? [],
    isLoading,
    error: apiResponse?.errors ?? error
  };
}