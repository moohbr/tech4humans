import { motion } from 'framer-motion'
import { TransactionCard } from '@/components/project/dashboard/cards/transaction'
import { TransactionsSectionProps } from './types'


export function TransactionsSection({ transactions, accounts, isLoading, bankColors }: TransactionsSectionProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-xl shadow-sm border border-zinc-200/50 dark:border-zinc-800/50 w-full"
    >
      <div className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3 sm:mb-4">Transações recentes</h2>
        {isLoading ? (
          <div className="text-center text-zinc-600 dark:text-zinc-400 py-6 sm:py-8 text-sm sm:text-base">Carregando transações...</div>
        ) : transactions && transactions.length > 0 ? (
          <div className="space-y-3 sm:space-y-4 max-h-96 overflow-y-auto">
            {transactions.map((transaction, index) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                accounts={accounts || []}
                bankColors={bankColors}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-zinc-600 dark:text-zinc-400 py-6 sm:py-8 text-sm sm:text-base">Nenhuma transação encontrada</div>
        )}
      </div>
    </motion.div>
  )
} 