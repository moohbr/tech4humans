import { TransactionType } from "./enum";

export type Transaction = {
    id: number;
    type: TransactionType;
    amount: number;
    description: string;
    transactionDate: Date;
    sourceAccountId: number;
    destinationAccountId: number;
}

export type CreateTransactionDTO = Partial<Pick<Transaction, "type" | "amount" | "description" | "sourceAccountId" | "destinationAccountId">>

export type UpdateTransactionDTO = Partial<Pick<Transaction, "type" | "amount" | "description" | "sourceAccountId" | "destinationAccountId">>