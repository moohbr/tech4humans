import { AccountType } from "./enum";
import { Bank } from "../bank/types";

export interface Account {
    id: string;
    name: string;
    type: AccountType;
    balance: number;
    bank: Bank;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateAccountDTO = {
    name: string;
    type: AccountType;
    balance: number;
    bank: {
        name: string;
    };
}

export type UpdateAccountDTO = Partial<Pick<Account, "name" | "type" | "bank">>