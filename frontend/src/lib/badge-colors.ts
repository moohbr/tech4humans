import { AccountType } from '@/types/account/enum'
import { TransactionType } from '@/types/transaction/enum'
import { BADGE_COLORS } from '@/constants/badge-colors'

export const getAccountBadgeColor = (type: AccountType): string => {
  return BADGE_COLORS.ACCOUNT_TYPE[type.toUpperCase() as keyof typeof BADGE_COLORS.ACCOUNT_TYPE]
}

export const getTransactionBadgeColor = (type: TransactionType): string => {
  return BADGE_COLORS.TRANSACTION_TYPE[type.toUpperCase() as keyof typeof BADGE_COLORS.TRANSACTION_TYPE]
}