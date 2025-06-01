import { Transaction } from "@/types/transaction/types";

export interface TransactionStore {
    transactions: Transaction[]
    isLoading: boolean
    error: Error | null
    setTransactions: (transactions: Transaction[]) => void
    addTransaction: (transaction: Transaction) => void
    updateTransaction: (updatedTransaction: Transaction) => void
    deleteTransaction: (transactionId: number) => void
    setLoading: (isLoading: boolean) => void
    setError: (error: Error | null) => void
}