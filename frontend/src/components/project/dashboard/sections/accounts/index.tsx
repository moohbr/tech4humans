import { motion } from 'framer-motion'
import { Account } from '@/types/account/types'
import { AccountCard } from '@/components/project/dashboard/cards/account'
import { useDashboardStore } from '@/stores/dashboard'
import { AccountsSectionProps } from './types'


export function AccountsSection({ accounts, isLoading, bankColors }: AccountsSectionProps) {
  const {
    setSelectedAccount,
    setEditAccountDialogOpen,
    setDeleteAccountDialogOpen
  } = useDashboardStore()

  const handleEditAccount = (acc: Account) => {
    setSelectedAccount(acc)
    setEditAccountDialogOpen(true)
  }

  const handleDeleteAccount = (acc: Account) => {
    setSelectedAccount(acc)
    setDeleteAccountDialogOpen(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-xl shadow-sm border border-zinc-200/50 dark:border-zinc-800/50 w-full"
    >
      <div className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3 sm:mb-4">Minhas contas</h2>
        {isLoading ? (
          <div className="text-center text-zinc-600 dark:text-zinc-400 py-6 sm:py-8 text-sm sm:text-base">Carregando contas...</div>
        ) : (
          <div className="space-y-3 sm:space-y-4 max-h-96 overflow-y-auto">
            {accounts?.length === 0 ? (
              <div className="text-center text-zinc-600 dark:text-zinc-400 py-6 sm:py-8 text-sm sm:text-base">Nenhuma conta encontrada</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4">
                {accounts?.map((acc: Account, index) => (
                  <AccountCard
                    key={acc.id}
                    account={acc}
                    bankColor={bankColors.get(acc.bankName || acc.bank.name) || 'zinc'}
                    index={index}
                    onEdit={handleEditAccount}
                    onDelete={handleDeleteAccount}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
} 