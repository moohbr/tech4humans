import { useQuery } from '@tanstack/react-query'
import { Account } from '@/types/account/types'
import { getAllAccountsOfUser } from '@/fetchers/accounts/get-all-of-user'

export function useAccounts({ userId, enabled = true }: UseAccountsOptions) {
  const { data: accounts, isLoading, error } = useQuery<Account[]>({
    queryKey: ['accounts', userId],
    queryFn: () => getAllAccountsOfUser(userId),
    enabled: enabled && Boolean(userId),
  })
  return {
    accounts,
    isLoading,
    error,
  }
} 