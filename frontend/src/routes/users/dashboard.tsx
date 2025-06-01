import { createFileRoute } from '@tanstack/react-router'
import { useMemo } from 'react'
import { DASHBOARD_CONSTANTS } from '@/constants/dashboard-ui'
import { useDashboardData } from '@/hooks/queries/use-dashboard'
import { generateBankColorMap } from '@/lib/bank-colors'
import { DashboardHeader } from '@/components/project/dashboard/layout/header'
import { DashboardStats } from '@/components/project/dashboard/cards/stats'
import { NewAccountDialog } from '@/components/project/dashboard/dialogs/new-account'
import { TransactionDialog } from '@/components/project/dashboard/dialogs/transaction-dialog/index'
import { EditAccountDialog } from '@/components/project/dashboard/dialogs/edit-account'
import { DeleteAccountDialog } from '@/components/project/dashboard/dialogs/delete-account'
import { AccountsSection } from '@/components/project/dashboard/sections/accounts'
import { TransactionsSection } from '@/components/project/dashboard/sections/transaction'

export const Route = createFileRoute('/users/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const { accounts, transactions, isLoadingAccounts, isLoadingTransactions } = useDashboardData(
    DASHBOARD_CONSTANTS.USER_ID
  )

  const bankColors = useMemo(() => generateBankColorMap(accounts || []), [accounts])

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 relative overflow-x-hidden">
      <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-zinc-800/50 bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none" />

      <DashboardHeader />

      <div className="w-full max-w-none px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 relative space-y-4 sm:space-y-6 lg:space-y-8 py-4 sm:py-6 lg:py-8 overflow-y-auto">
        <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-zinc-900 dark:text-zinc-50">Dashboard</h1>

        <DashboardStats accounts={accounts || []} />

        <AccountsSection
          accounts={accounts}
          isLoading={isLoadingAccounts}
          bankColors={bankColors}
        />

        <TransactionsSection
          transactions={transactions}
          accounts={accounts}
          isLoading={isLoadingTransactions}
          bankColors={bankColors}
        />
      </div>

      <NewAccountDialog />
      <TransactionDialog />
      <EditAccountDialog />
      <DeleteAccountDialog userId={DASHBOARD_CONSTANTS.USER_ID} />
    </div>
  )
}