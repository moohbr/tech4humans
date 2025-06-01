import { TransactionType } from "@infrastructure/datasources/databases/typeorm/models/enums";

export type TransactionRawEntity = {
    id: number;
    amount: number;
    description: string;
    destinationAccountId: number;
    sourceAccountId: number;
    type: TransactionType;
    transactionDate: Date;
}
   