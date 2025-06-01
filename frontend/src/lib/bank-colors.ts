import { Account } from '@/types/account/types'
import { BANK_COLORS } from '@/constants/bank-colors'

export const generateBankColorMap = (accounts: Account[]): Map<string, string> => {
  if (!accounts) return new Map()
  
  const uniqueBanks = [...new Set(accounts.map(acc => acc.bankName))]
  const bankColorMap = new Map()
  
  uniqueBanks.forEach((bank, index) => {
    bankColorMap.set(bank, BANK_COLORS[index % BANK_COLORS.length])
  })
  
  return bankColorMap
}