import { AccountType } from "./enum";
import { Bank } from "../bank/types";


export type Account = {
    id: number;
    name: string;
    type: AccountType;
    balance: number;
    createdAt: Date;
    userId: number;
    bank: Bank;
}

export type CreateAccountDTO = Pick<Account, "name" | "type" | "balance" | "bank">


export type UpdateAccountDTO = Partial<Pick<Account, "name" | "type" | "bank">>