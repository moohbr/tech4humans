import { motion } from 'framer-motion'
import { Account } from '@/types/account/types'
import { QuickActionsCard } from './stats/quick-actions-card'
import { TotalBalanceCard } from './stats/total-balance'

interface StatsProps {
  accounts: Account[]
}

export function DashboardStats({ accounts }: StatsProps) {
  const totalBalance = accounts.reduce((acc, curr) => acc + curr.balance, 0)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
    >
      <TotalBalanceCard totalBalance={totalBalance} />
      <div className="hidden xl:block">
        <div className="h-full w-full bg-transparent" />
      </div>
      <div className="hidden xl:block">
        <div className="h-full w-full bg-transparent" />
      </div>
      <QuickActionsCard />
    </motion.div>
  )
} 