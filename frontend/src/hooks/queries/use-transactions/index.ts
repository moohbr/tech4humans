import { useQuery } from '@tanstack/react-query'
import { Transaction } from '@/types/transaction/types'
import { getAllTransactionsOfUser } from '@/fetchers/transactions/get-all-of-user'

export function useTransactions({ 
  userId, 
  enabled = true,
  refetchInterval = 5000
}: { 
  userId: number, 
  enabled: boolean,
  refetchInterval?: number | false 
}) {
  const { data: transactions, isLoading, error } = useQuery<Transaction[]>({
    queryKey: ['transactions', userId],
    queryFn: () => getAllTransactionsOfUser(userId),
    enabled: enabled && Boolean(userId),
    refetchInterval: refetchInterval,
    refetchIntervalInBackground: true,
    staleTime: 0,
  })
  return {
    transactions,
    isLoading,
    error,
  }
} 