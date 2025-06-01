import { Account } from "@/types/account/types"

export type AccountCardProps = {
    account: Account
    bankColor: string
    index: number
    onEdit: (account: Account) => void
    onDelete: (account: Account) => void
  }