import { Account } from '@/types/account/types'

export const calculateTotalBalance = (accounts: Account[]): number => {
  return accounts?.reduce((sum: number, acc: Account) => sum + acc.balance, 0) || 0
}
