import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateTransactionDTO } from '@/types/transaction/types'
import { createTransaction } from '@/fetchers/transactions/create'
import { TransactionType } from '@/types/transaction/enum'
import { useDashboardStore } from '@/stores/dashboard'
import { useAccounts } from '@/hooks/queries/use-accounts'
import { toast } from 'sonner'
import { SourceAccountField } from './fields/source-account'
import { DestinationAccountField } from './fields/destination-account'
import { AmountField } from './fields/amount'
import { DescriptionField } from './fields/description'
import { Loader2 } from 'lucide-react'
import { useAuth } from '@/contexts/auth'

export function TransactionDialog() {
  const { isTransactionDialogOpen, setTransactionDialogOpen } = useDashboardStore()
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const transactionForm = useForm<CreateTransactionDTO>()
  const { accounts, isLoading: isLoadingAccounts } = useAccounts({ userId: user?.id ?? 0 })

  const accountOptions = accounts?.map((acc) => ({
    label: `${acc.bank?.name || acc?.bankName} - $${acc.balance}`,
    value: acc.id.toString(),
  })) || []

  const createTransactionMutation = useMutation({
    mutationFn: (data: CreateTransactionDTO) => {
      if (!data.sourceAccountId || !data.destinationAccountId) {
        throw new Error('As contas de origem e destino são obrigatórias')
      }
      return createTransaction(
        data.sourceAccountId,
        data.destinationAccountId,
        {
          type: TransactionType.TRANSFERENCIA,
          amount: data.amount || 0,
          description: data.description,
        }
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      setTransactionDialogOpen(false)
      toast.success('Transação realizada com sucesso')
      transactionForm.reset()
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Falha ao realizar transação')
    },
  })

  const isLoading = createTransactionMutation.isPending || isLoadingAccounts

  return (
    <Dialog open={isTransactionDialogOpen} onOpenChange={setTransactionDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova transação</DialogTitle>
        </DialogHeader>
        <Form {...transactionForm}>
          <form
            className="space-y-6"
            onSubmit={transactionForm.handleSubmit((data: CreateTransactionDTO) => {
              createTransactionMutation.mutate(data)
            })}
          >
            <div className="space-y-4">
              <SourceAccountField
                form={transactionForm}
                isReadOnly={isLoading}
                isLoading={isLoadingAccounts}
                accountOptions={accountOptions}
              />
              <DestinationAccountField
                form={transactionForm}
                isReadOnly={isLoading}
                isLoading={isLoadingAccounts}
                accountOptions={accountOptions}
              />
              <AmountField
                form={transactionForm}
                isReadOnly={isLoading}
                isLoading={isLoadingAccounts}
                accountOptions={accountOptions}
              />
              <DescriptionField
                form={transactionForm}
                isReadOnly={isLoading}
                isLoading={isLoadingAccounts}
                accountOptions={accountOptions}
              />
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  'Fazer transação'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 