import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateAccountDTO } from '@/types/account/types'
import { createAccount } from '@/fetchers/accounts/create'
import { useDashboardStore } from '@/stores/dashboard'
import { toast } from 'sonner'
import { AccountTypeField } from './fields/account-type'
import { InitialBalanceField } from './fields/initial-balance'
import { BankNameField } from './fields/bank-name'
import { AccountNameField } from './fields/account-name'


export function NewAccountDialog() {
  const { isNewAccountDialogOpen, setNewAccountDialogOpen } = useDashboardStore()
  const queryClient = useQueryClient()
  const createAccountForm = useForm<CreateAccountDTO>()

  const createAccountMutation = useMutation({
    mutationFn: (data: CreateAccountDTO) => createAccount(1, {
      ...data,
      bankName: data.bankName,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      setNewAccountDialogOpen(false)
      toast.success('Conta criada com sucesso')
      createAccountForm.reset()
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Falha ao criar conta')
    },
  })

  const isLoading = createAccountMutation.isPending

  return (
    <Dialog open={isNewAccountDialogOpen} onOpenChange={setNewAccountDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar nova conta</DialogTitle>
        </DialogHeader>
        <Form {...createAccountForm}>
          <form
            className="space-y-6"
            onSubmit={createAccountForm.handleSubmit((data: CreateAccountDTO) => {
              createAccountMutation.mutate(data)
            })}
          >
            <div className="space-y-4">
              <AccountNameField
                form={createAccountForm}
                isReadOnly={isLoading}
                isLoading={isLoading}
              />
              <AccountTypeField
                form={createAccountForm}
                isReadOnly={isLoading}
                isLoading={isLoading}
              />
              <BankNameField
                form={createAccountForm}
                isReadOnly={isLoading}
                isLoading={isLoading}
              />
              <InitialBalanceField
                form={createAccountForm}
                isReadOnly={isLoading}
                isLoading={isLoading}
              />
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                {isLoading ? 'Criando...' : 'Criar conta'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 