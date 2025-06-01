import { useQuery } from '@tanstack/react-query'
import { Transaction } from '@/types/transaction/types'
import { getAllTransactionsOfUser } from '@/fetchers/transactions/get-all-of-user'
import { useTransactionStore } from '@/stores/transactions'

export function useTransactions({ userId, enabled = true }: UseTransactionsOptions) {
  const { setTransactions, setLoading, setError } = useTransactionStore()

  const query = useQuery<Transaction[], Error>({
    queryKey: ['transactions', userId],
    queryFn: () => getAllTransactionsOfUser(userId),
    enabled: enabled && Boolean(userId)
  })

  const { data: transactions, isLoading, error } = query

  if (transactions) {
    setTransactions(transactions)
  }
  if (error) {
    setError(error)
  }
  setLoading(isLoading)

  return {
    transactions,
    isLoading,
    error,
  }
}
