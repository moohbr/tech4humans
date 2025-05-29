import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectOption } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAccount, updateAccount } from '@/fetchers/accounts'
import { useForm } from 'react-hook-form'
import { Account, AccountType, CreateAccountDTO, UpdateAccountDTO } from '@/types/account'
import { useAccounts } from '@/hooks/queries/useAccounts'
import { CreateTransactionDTO } from '@/types/transaction'

export const Route = createFileRoute('/users/dashboard')({
  component: RouteComponent,
})


function RouteComponent() {
  const [isNewAccountDialogOpen, setIsNewAccountDialogOpen] = useState(false)
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false)
  const [isEditAccountDialogOpen, setIsEditAccountDialogOpen] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)

  const queryClient = useQueryClient()
  const { accounts, isLoading: isLoadingAccounts } = useAccounts()

  const createAccountForm = useForm<CreateAccountDTO>()
  const updateAccountForm = useForm<UpdateAccountDTO>()
  const transactionForm = useForm<CreateTransactionDTO>()

  const createAccountMutation = useMutation({
    mutationFn: (data: CreateAccountDTO) => createAccount(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      setIsNewAccountDialogOpen(false)
    },
  })

  const updateAccountMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateAccountDTO }) =>
      updateAccount(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      setIsEditAccountDialogOpen(false)
    },
  })

  const totalBalance = accounts?.reduce((sum: number, acc: Account) => sum + acc.balance, 0) || 0

  const handleEditAccount = (acc: Account) => {
    setSelectedAccount(acc)
    setIsEditAccountDialogOpen(true)
  }

  const accountTypeOptions: SelectOption[] = Object.values(AccountType).map((type) => ({
    label: type,
    value: type,
  }))

  const accountOptions: SelectOption[] = accounts?.map((acc: Account) => ({
    label: `${acc.bankName} - $${acc.balance}`,
    value: acc.id.toString(),
  })) || []

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Meu Dashboard</h1>
        <Button variant="destructive" onClick={() => {}}>
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Saldo Total</h2>
          <p className="text-3xl font-bold text-green-600">
            R$ {totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Ações Rápidas</h2>
            <div className="space-x-4">
              <Button onClick={() => setIsNewAccountDialogOpen(true)}>
                Adicionar Nova Conta
              </Button>
              <Button onClick={() => setIsTransactionDialogOpen(true)}>
                Nova Transação
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Minhas Contas</h2>
          {isLoadingAccounts ? (
            <div className="text-center">Carregando contas...</div>
          ) : (
            <div className="space-y-4">
              {accounts?.map((acc: Account) => (
                <div
                  key={acc.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">{acc.bankName}</h3>
                    <div className="flex items-center space-x-2">
                      <Badge>{acc.type}</Badge>
                      <span className="text-gray-600">
                        Saldo: ${acc.balance.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => handleEditAccount(acc)}
                  >
                    Editar
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Últimas Transações</h2>
        </div>
      </div>
      </div>

<Dialog open={isNewAccountDialogOpen} onOpenChange={setIsNewAccountDialogOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Adicionar Nova Conta</DialogTitle>
    </DialogHeader>
    <Form {...createAccountForm}>
      <form onSubmit={createAccountForm.handleSubmit((data: CreateAccountDTO) => {
        createAccountMutation.mutate(data)
      })}>
        <div className="space-y-4">
          <div>
            <label>Nome do Banco</label>
            <Input {...createAccountForm.register('bankName')} required />
          </div>
          <div>
            <label>Tipo de Conta</label>
            <Select
              {...createAccountForm.register('type')}
              options={accountTypeOptions}
              required
            />
          </div>
          <div>
            <label>Saldo Inicial</label>
            <Input
              {...createAccountForm.register('balance', { valueAsNumber: true })}
              type="number"
              step="0.01"
              required
            />
          </div>
          <Button type="submit">Criar Conta</Button>
        </div>
      </form>
    </Form>
  </DialogContent>
</Dialog>

<Dialog open={isTransactionDialogOpen} onOpenChange={setIsTransactionDialogOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Nova Transação</DialogTitle>
    </DialogHeader>
    <Form {...transactionForm}>
      <form onSubmit={transactionForm.handleSubmit((data: CreateTransactionDTO) => {
        setIsTransactionDialogOpen(false)
      })}>
        <div className="space-y-4">
          <div>
            <label>Conta de Origem</label>
            <Select
              {...transactionForm.register('sourceAccountId')}
              options={accountOptions}
              required
            />
          </div>
          <div>
            <label>Conta de Destino</label>
            <Select
              {...transactionForm.register('destinationAccountId')}
              options={accountOptions}
              required
            />
          </div>
          <div>
            <label>Valor</label>
            <Input
              {...transactionForm.register('amount', { valueAsNumber: true })}
              type="number"
              step="0.01"
              required
            />
          </div>
          <div>
            <label>Descrição</label>
            <Input {...transactionForm.register('description')} required />
          </div>
          <Button type="submit">Realizar Transação</Button>
        </div>
      </form>
    </Form>
  </DialogContent>
</Dialog>

<Dialog open={isEditAccountDialogOpen} onOpenChange={setIsEditAccountDialogOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Editar Conta</DialogTitle>
    </DialogHeader>
    {selectedAccount && (
      <Form {...updateAccountForm}>
        <form onSubmit={updateAccountForm.handleSubmit((data: UpdateAccountDTO) => {
          updateAccountMutation.mutate({
            id: selectedAccount.id,
            data,
          })
        })}>
          <div className="space-y-4">
            <div>
              <label>Tipo de Conta</label>
              <Select
                {...updateAccountForm.register('type')}
                options={accountTypeOptions}
                defaultValue={selectedAccount.type}
                required
              />
            </div>
            <Button type="submit">Salvar Alterações</Button>
          </div>
        </form>
      </Form>
    )}
  </DialogContent>
</Dialog>
    </div>
  )
}
