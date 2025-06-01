import { motion } from 'framer-motion'
import { Badge, BadgeProps } from '@/components/ui/badge'
import { getTransactionBadgeColor } from '@/lib/badge-colors'
import { formatCurrency, formatDate } from '@/lib/format'
import { TransactionCardProps } from './types'


export const TransactionCard = ({ transaction, accounts, bankColors, index }: TransactionCardProps) => {
  const sourceAccount = accounts?.find(acc => acc.id === transaction.sourceAccountId)
  const destinationAccount = accounts?.find(acc => acc.id === transaction.destinationAccountId)

  return (
    <motion.div
      key={transaction.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.01 }}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
    >
      <div className="flex-1 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <div className="w-full sm:w-32">
            <Badge badgeColor={getTransactionBadgeColor(transaction.type) as BadgeProps['badgeColor']} variant="outline">
              {transaction.type}
            </Badge>
          </div>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            {formatDate(transaction.transactionDate)}
          </span>
        </div>
        <p className="text-sm mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <span className="flex items-center gap-1">
            De: <span className={`text-${bankColors.get(sourceAccount?.bankName || '') || 'zinc'}-600 dark:text-${bankColors.get(sourceAccount?.bankName || '') || 'zinc'}-400`}>
              {sourceAccount?.bankName}
            </span>
          </span>
          <span className="text-zinc-400 dark:text-zinc-600 hidden sm:inline mx-2">→</span>
          <span className="flex items-center gap-1">
            Para: <span className={`text-${bankColors.get(destinationAccount?.bankName || '') || 'zinc'}-600 dark:text-${bankColors.get(destinationAccount?.bankName || '') || 'zinc'}-400`}>
              {destinationAccount?.bankName}
            </span>
          </span>
        </p>
        {transaction.description && (
          <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">{transaction.description}</p>
        )}
      </div>
      <div className="text-right mt-4 sm:mt-0 w-full sm:w-auto">
        <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {formatCurrency(transaction.amount)}
        </span>
      </div>
    </motion.div>
  )
}