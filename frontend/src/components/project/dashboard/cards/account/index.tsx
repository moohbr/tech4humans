import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge, BadgeProps } from '@/components/ui/badge'
import { PencilIcon, TrashIcon } from 'lucide-react'
import { getAccountBadgeColor } from '@/lib/badge-colors'
import { formatCurrency } from '@/lib/format'
import { AccountCardProps } from './types'    


export const AccountCard = ({ account, bankColor, index, onEdit, onDelete }: AccountCardProps) => {
  return (
    <motion.div
      key={account.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.01 }}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
    >
      <div className="w-full sm:w-auto mb-4 sm:mb-0">
        <h3 className="font-medium text-zinc-900 dark:text-zinc-50">{account.name}</h3>
        <p className={`text-${bankColor}-600 dark:text-${bankColor}-400 text-sm`}>
          {account.bankName}
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center mt-2 gap-2 sm:gap-4">
          <div className="w-full sm:w-32">
            <Badge variant="outline" badgeColor={getAccountBadgeColor(account.type) as BadgeProps['badgeColor']}>
              {account.type}
            </Badge>
          </div>
          <span className={`text-sm ${account.balance > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            Saldo: {formatCurrency(account.balance)}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(account)}
          className="text-zinc-600 dark:text-zinc-400 flex-1 sm:flex-none"
        >
          <PencilIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(account)}
          className="text-red-600 dark:text-red-400 flex-1 sm:flex-none"
        >
          <TrashIcon className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  )
}