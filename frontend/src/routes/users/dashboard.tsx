import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectOption } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Account, CreateAccountDTO, UpdateAccountDTO } from '@/types/account/types'
import { useAccounts } from '@/hooks/queries/use-accounts'
import { CreateTransactionDTO } from '@/types/transaction/types'
import { createAccount } from '@/fetchers/accounts/create'
import { AccountType } from '@/types/account/enum'
import { updateAccount } from '@/fetchers/accounts/update'
import { createTransaction } from '@/fetchers/transactions/create'
import { TransactionType } from '@/types/transaction/enum'
import { toast } from 'sonner'
import { useTransactions } from '@/hooks/queries/use-transactions'
import { format } from 'date-fns'
import { useAuth } from '@/contexts/auth'
import { useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/users/dashboard')({
  component: RouteComponent,
})


function RouteComponent() {
  const [isNewAccountDialogOpen, setIsNewAccountDialogOpen] = useState(false)
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false)
  const [isEditAccountDialogOpen, setIsEditAccountDialogOpen] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)

  const queryClient = useQueryClient()
  const { accounts, isLoading: isLoadingAccounts } = useAccounts(1)
  const { transactions, isLoading: isLoadingTransactions } = useTransactions({ userId: 1 })

  const createAccountForm = useForm<CreateAccountDTO>()
  const updateAccountForm = useForm<UpdateAccountDTO>()
  const transactionForm = useForm<CreateTransactionDTO>()

  const createAccountMutation = useMutation({
    mutationFn: (data: CreateAccountDTO) => createAccount(1, {
      bankName: data.bank?.name,
      ...data
    }),
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

  const createTransactionMutation = useMutation({
    mutationFn: (data: CreateTransactionDTO) => {
      if (!data.sourceAccountId || !data.destinationAccountId) {
        throw new Error('Source and destination accounts are required')
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
      setIsTransactionDialogOpen(false)
      toast.success('Transaction completed successfully')
      transactionForm.reset()
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to create transaction')
    },
  })

  const totalBalance = accounts?.reduce((sum: number, acc: Account) => sum + acc.balance, 0) || 0

  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate({ to: '/auth/sign-in' })
  }

  const handleEditAccount = (acc: Account) => {
    setSelectedAccount(acc)
    setIsEditAccountDialogOpen(true)
  }

  const accountTypeOptions: SelectOption[] = Object.values(AccountType).map((type) => ({
    label: type,
    value: type,
  }))

  const accountOptions: SelectOption[] = accounts?.map((acc: Account) => ({
    label: `${acc.bank.name} - $${acc.balance}`,
    value: acc.id.toString(),
  })) || []

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Meu Dashboard</h1>
        <Button variant="destructive" onClick={handleLogout}>
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
                    <h3 className="font-semibold">{acc.bank.name}</h3>
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
          {isLoadingTransactions ? (
            <div className="text-center">Carregando transações...</div>
          ) : transactions && transactions.length > 0 ? (
            <div className="space-y-4">
              {transactions.map((transaction) => {
                const sourceAccount = accounts?.find(acc => acc.id === transaction.sourceAccountId)
                const destinationAccount = accounts?.find(acc => acc.id === transaction.destinationAccountId)
                
                return (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge>{transaction.type}</Badge>
                        <span className="text-sm text-gray-600">
                          {format(new Date(transaction.transactionDate), 'dd/MM/yyyy HH:mm')}
                        </span>
                      </div>
                      <p className="text-sm mt-1">
                        De: {sourceAccount?.bank.name} → Para: {destinationAccount?.bank.name}
                      </p>
                      {transaction.description && (
                        <p className="text-sm text-gray-600 mt-1">{transaction.description}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-semibold text-green-600">
                        R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center text-gray-500">Nenhuma transação encontrada</div>
          )}
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
            <Input {...createAccountForm.register('bank.name')} required />
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
        createTransactionMutation.mutate(data)
      })}>
        <div className="space-y-4">
          <div>
            <label>Conta de Origem</label>
            <Select
              value={transactionForm.watch('sourceAccountId')?.toString()}
              onChange={(value) => transactionForm.setValue('sourceAccountId', Number(value))}
              options={accountOptions}
              placeholder="Selecione a conta de origem"
              required
            />
          </div>
          <div>
            <label>Conta de Destino</label>
            <Select
              value={transactionForm.watch('destinationAccountId')?.toString()}
              onChange={(value) => transactionForm.setValue('destinationAccountId', Number(value))}
              options={accountOptions.filter(opt => opt.value !== transactionForm.watch('sourceAccountId')?.toString())}
              placeholder="Selecione a conta de destino"
              required
            />
          </div>
          <div>
            <label>Valor</label>
            <Input
              {...transactionForm.register('amount', { 
                valueAsNumber: true,
                required: 'Valor é obrigatório',
                min: { value: 0.01, message: 'Valor deve ser maior que zero' }
              })}
              type="number"
              step="0.01"
              required
            />
          </div>
          <div>
            <label>Descrição</label>
            <Input {...transactionForm.register('description')} required />
          </div>
          <Button 
            type="submit" 
            disabled={createTransactionMutation.isPending}
          >
            {createTransactionMutation.isPending ? 'Processando...' : 'Realizar Transação'}
          </Button>
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
