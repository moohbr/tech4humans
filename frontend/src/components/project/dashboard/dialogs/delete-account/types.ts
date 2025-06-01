import { Account } from "@/types/account/types"

export type DeleteAccountDialogProps = {
    userId: Pick<Account, 'userId'>['userId']
}