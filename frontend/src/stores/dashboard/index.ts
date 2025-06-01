import { create } from 'zustand'
import { Account } from '@/types/account/types'

interface DashboardStore {
  isNewAccountDialogOpen: boolean
  isTransactionDialogOpen: boolean
  isEditAccountDialogOpen: boolean
  isDeleteAccountDialogOpen: boolean
  selectedAccount: Account | null
  setNewAccountDialogOpen: (isOpen: boolean) => void
  setTransactionDialogOpen: (isOpen: boolean) => void
  setEditAccountDialogOpen: (isOpen: boolean) => void
  setDeleteAccountDialogOpen: (isOpen: boolean) => void
  setSelectedAccount: (account: Account | null) => void
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  isNewAccountDialogOpen: false,
  isTransactionDialogOpen: false,
  isEditAccountDialogOpen: false,
  isDeleteAccountDialogOpen: false,
  selectedAccount: null,
  setNewAccountDialogOpen: (isOpen) => set({ isNewAccountDialogOpen: isOpen }),
  setTransactionDialogOpen: (isOpen) => set({ isTransactionDialogOpen: isOpen }),
  setEditAccountDialogOpen: (isOpen) => set({ isEditAccountDialogOpen: isOpen }),
  setDeleteAccountDialogOpen: (isOpen) => set({ isDeleteAccountDialogOpen: isOpen }),
  setSelectedAccount: (account) => set({ selectedAccount: account }),
})) 