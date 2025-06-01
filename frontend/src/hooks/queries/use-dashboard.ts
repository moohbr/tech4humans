import { DASHBOARD_CONSTANTS } from '@/constants/dashboard-ui'
import { useAccounts } from '@/hooks/queries/use-accounts'
import { useTransactions } from '@/hooks/queries/use-transactions'

export const useDashboardData = (userId: number) => {
  const { accounts, isLoading: isLoadingAccounts } = useAccounts({ userId })
  const { transactions, isLoading: isLoadingTransactions } = useTransactions({ 
    userId, 
    enabled: true,
    refetchInterval: DASHBOARD_CONSTANTS.REFETCH_INTERVAL
  })

  return {
    accounts,
    transactions,
    isLoadingAccounts,
    isLoadingTransactions,
    isLoading: isLoadingAccounts || isLoadingTransactions
  }
}