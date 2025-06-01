import { Account } from "@/types/account/types"

export type AccountsSectionProps = {
    accounts: Account[] | undefined
    isLoading: boolean
    bankColors: Map<string, string>
}