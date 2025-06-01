import { Button } from '@/components/ui/button'
import { PlusIcon, ArrowRightIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { useDashboardStore } from '@/stores/dashboard'

export function QuickActionsCard() {
  const {
    setNewAccountDialogOpen,
    setTransactionDialogOpen,
  } = useDashboardStore()

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-xl shadow-sm border border-zinc-200/50 dark:border-zinc-800/50 p-4 sm:p-6"
    >
      <div className="space-y-3 sm:space-y-4">
        <h2 className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400">Ações rápidas</h2>
        <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
          <Button onClick={() => setNewAccountDialogOpen(true)} className="flex-1 text-sm h-9 sm:h-10">
            <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="truncate">Nova conta</span>
          </Button>
          <Button onClick={() => setTransactionDialogOpen(true)} className="flex-1 text-sm h-9 sm:h-10">
            <ArrowRightIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="truncate">Nova transação</span>
          </Button>
        </div>
      </div>
    </motion.div>
  )
} 