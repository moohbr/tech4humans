import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UpdateAccountDTO } from '@/types/account/types'
import { updateAccount } from '@/fetchers/accounts/update'
import { useDashboardStore } from '@/stores/dashboard'
import { toast } from 'sonner'
import { useEffect } from 'react'
import { AccountTypeField } from './fields/account-type'
import { AccountNameField } from './fields/account-name'
import { DeleteAccountDialog } from '../delete-account'

export function EditAccountDialog() {
  const { isEditAccountDialogOpen, setEditAccountDialogOpen, selectedAccount } = useDashboardStore()
  const queryClient = useQueryClient()
  const updateAccountForm = useForm<UpdateAccountDTO>()

  useEffect(() => {
    if (selectedAccount) {
      updateAccountForm.reset({
        type: selectedAccount.type,
        name: selectedAccount.name,
        bankName: selectedAccount.bankName,
      })
    }
  }, [selectedAccount, updateAccountForm])

  const updateAccountMutation = useMutation({
    mutationFn: (data: UpdateAccountDTO) => {
      if (!selectedAccount) throw new Error('Nenhuma conta selecionada')
      return updateAccount(selectedAccount.id, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      setEditAccountDialogOpen(false)
      toast.success('Conta atualizada com sucesso')
      updateAccountForm.reset()
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Falha ao atualizar conta')
    },
  })

  if (!selectedAccount) return null

  const isLoading = updateAccountMutation.isPending

  return (
    <Dialog open={isEditAccountDialogOpen} onOpenChange={setEditAccountDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar conta</DialogTitle>
        </DialogHeader>
        <Form {...updateAccountForm}>
          <form 
            className="space-y-6"
            onSubmit={updateAccountForm.handleSubmit((data: UpdateAccountDTO) => {
              updateAccountMutation.mutate(data)
            })}
          >
            <div className="space-y-4">
              <AccountNameField 
                form={updateAccountForm} 
                isReadOnly={isLoading} 
                isLoading={isLoading} 
              />
              <AccountTypeField 
                form={updateAccountForm} 
                isReadOnly={isLoading} 
                isLoading={isLoading} 
              />
            </div>
            <div className="flex justify-between items-center gap-3">
              <DeleteAccountDialog userId={selectedAccount.userId} />
              <Button 
                type="submit"
                disabled={isLoading}
                className="sm:w-auto"
              >
                {isLoading ? 'Atualizando...' : 'Salvar alterações'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 