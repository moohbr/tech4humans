import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteAccount } from '@/fetchers/accounts/delete'
import { useDashboardStore } from '@/stores/dashboard'
import { toast } from 'sonner'
import {  Loader2 } from 'lucide-react'
import { useAccounts } from '@/hooks/queries/use-accounts'
import { DeleteButton } from './buttons/delete'
import { AccountInfo } from './account-info'
import { DeleteAccountLoading } from './loading'
import { DeleteAccountDialogProps } from './types'

export function DeleteAccountDialog({ userId }: DeleteAccountDialogProps) {
  const { 
    isDeleteAccountDialogOpen, 
    setDeleteAccountDialogOpen, 
    selectedAccount 
  } = useDashboardStore()
  const queryClient = useQueryClient()
  const { accounts, isLoading: isLoadingAccounts } = useAccounts({ userId })

  const deleteAccountMutation = useMutation({
    mutationFn: () => {
      if (!selectedAccount) throw new Error('Nenhuma conta selecionada')
      return deleteAccount(selectedAccount.id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      setDeleteAccountDialogOpen(false)
      toast.success('Conta excluída com sucesso')
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Falha ao excluir conta')
    },
  })

  const isLoading = deleteAccountMutation.isPending || isLoadingAccounts
  const isDeleting = deleteAccountMutation.isPending

  const showDeleteButton = accounts && accounts.length > 1

  if (!selectedAccount || !showDeleteButton) return null

  return (
    <>
      <Dialog open={isDeleteAccountDialogOpen} onOpenChange={setDeleteAccountDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir conta</DialogTitle>
            <DialogDescription className="text-zinc-500 dark:text-zinc-400">
              Tem certeza que deseja excluir esta conta? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>

          {isLoadingAccounts ? (
            <DeleteAccountLoading />
          ) : (
            <>
              <AccountInfo account={selectedAccount} />

              <DialogFooter className="gap-3 sm:gap-0">
                <Button
                  variant="outline"
                  onClick={() => setDeleteAccountDialogOpen(false)}
                  disabled={isDeleting || isLoading}
                >
                  Cancelar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => deleteAccountMutation.mutate()}
                  disabled={isDeleting || isLoading}
                  className="gap-2"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Excluindo...
                    </>
                  ) : (
                    <>
                      <DeleteButton 
                        onClick={() => deleteAccountMutation.mutate()}
                        disabled={isDeleting}
                        isLoading={isDeleting}
                      />
                    </>
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
} 