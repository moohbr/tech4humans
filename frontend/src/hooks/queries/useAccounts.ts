import { useQuery } from '@tanstack/react-query'
import { Account } from '@/types/account'
import { getAccounts } from '@/fetchers/accounts'

export function useAccounts() {
  const { data: accounts, isLoading, error } = useQuery<Account[]>({
    queryKey: ['accounts'],
    queryFn: getAccounts,
  })

  return {
    accounts,
    isLoading,
    error,
  }
} 