import { WalletIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { formatCurrency } from '@/lib/format'


export function TotalBalanceCard({ totalBalance }: TotalBalanceCardProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="flex items-center justify-start h-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-xl shadow-sm border border-zinc-200/50 dark:border-zinc-800/50 p-3 sm:p-4 md:p-5 lg:p-6"
    >
      <div className="flex items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        <div className="p-2 sm:p-2.5 md:p-3 lg:p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex-shrink-0">
          <WalletIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-zinc-600 dark:text-zinc-400" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-zinc-600 dark:text-zinc-400">Saldo total</h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-zinc-900 dark:text-zinc-50 truncate">
            {formatCurrency(totalBalance)}
          </p>
        </div>
      </div>
    </motion.div>
  )
} 