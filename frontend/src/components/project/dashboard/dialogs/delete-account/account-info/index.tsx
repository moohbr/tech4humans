import { ACCOUNT_TYPE_LABELS } from '@/constants/account-type-labels'
import { formatCurrency } from '@/lib/format'
import { AlertTriangle } from 'lucide-react'
import { AccountInfoProps } from './types'

export function AccountInfo({ account }: AccountInfoProps) {
  const hasBalance = account.balance !== 0

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-900">
        <div>
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Nome da conta:</span>
          <p className="text-sm text-zinc-900 dark:text-zinc-100">{account.name}</p>
        </div>
        <div className="mt-3">
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Banco:</span>
          <p className="text-sm text-zinc-900 dark:text-zinc-100">{account.bankName}</p>
        </div>
        <div className="mt-3">
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Tipo:</span>
          <p className="text-sm text-zinc-900 dark:text-zinc-100">
            {ACCOUNT_TYPE_LABELS[account.type] || account.type}
          </p>
        </div>
        <div className="mt-3">
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Saldo atual:</span>
          <p className="text-sm text-zinc-900 dark:text-zinc-100">
            {formatCurrency(account.balance)}
          </p>
        </div>
      </div>

      {hasBalance && (
        <div className="flex items-start gap-3 p-3 text-sm bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
          <div className="text-yellow-800 dark:text-yellow-200">
            <p>Esta conta ainda possui saldo. Recomendamos transferir o saldo para outra conta antes de excluí-la.</p>
          </div>
        </div>
      )}
    </div>
  )
} 