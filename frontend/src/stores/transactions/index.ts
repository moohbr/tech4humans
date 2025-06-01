import { create } from 'zustand'
import { TransactionStore } from './interfaces'


export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  isLoading: false,
  error: null,
  
  setTransactions: (transactions) => 
    set({ transactions }),
  
  addTransaction: (transaction) => 
    set((state) => ({ 
      transactions: [...state.transactions, transaction] 
    })),
  
  updateTransaction: (updatedTransaction) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === updatedTransaction.id ? updatedTransaction : t
      ),
    })),
  
  deleteTransaction: (transactionId) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== transactionId),
    })),
  
  setLoading: (isLoading) => 
    set({ isLoading }),
  
  setError: (error) => 
    set({ error }),
})) 