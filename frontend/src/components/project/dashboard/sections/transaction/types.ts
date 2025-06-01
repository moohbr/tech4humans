import { Account } from "@/types/account/types"
import { Transaction } from "@/types/transaction/types"

export type TransactionsSectionProps = {
    transactions: Transaction[] | undefined
    accounts: Account[] | undefined
    isLoading: boolean
    bankColors: Map<string, string>
}