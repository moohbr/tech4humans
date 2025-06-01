import { AccountType } from "./enum";


export type Account = {
    id: number;
    name: string;
    type: AccountType;
    balance: number;
    createdAt: Date;
    userId: number;
    bankName: string;
}

export type CreateAccountDTO = Pick<Account, "name" | "type" | "balance" | "bankName">


export type UpdateAccountDTO = Partial<Pick<Account, "name" | "type" | "bankName">>