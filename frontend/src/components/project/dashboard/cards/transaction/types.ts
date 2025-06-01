import { Account } from "@/types/account/types"
import { Transaction } from "@/types/transaction/types"

export type TransactionCardProps = {
    transaction: Transaction
    accounts: Account[]
    bankColors: Map<string, string>
    index: number
  }