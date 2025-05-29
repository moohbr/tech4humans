import { Account, CreateAccountDTO, UpdateAccountDTO } from '@/types/account'

export async function getAccounts(): Promise<Account[]> {
    const response = await fetch('http://localhost:3000/accounts')
    const data = await response.json()
    return data
}

export async function createAccount(account: CreateAccountDTO): Promise<Account> {
  const response = await fetch('http://localhost:3000/accounts', {
    method: 'POST',
    body: JSON.stringify(account),
  })
  const data = await response.json()
  return data
}

export async function updateAccount(id: number, account: UpdateAccountDTO): Promise<Account> {
  const response = await fetch(`http://localhost:3000/accounts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(account),
  })
  const data = await response.json()
        return data
}

export async function deleteAccount(id: number): Promise<void> {
  const response = await fetch(`http://localhost:3000/accounts/${id}`, {
    method: 'DELETE',
  })
  const data = await response.json()
  return data
} 