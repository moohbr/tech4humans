import { TransactionEntity } from "@models/transaction/entity";
import { TransactionSchemas } from "@models/transaction/schemas";
import { CreateTransactionData } from "@models/transaction/factory/types";

export class TransactionFactory {
    public static createTransaction(data: CreateTransactionData): TransactionEntity {
        const validatedData = TransactionSchemas.createTransactionSchema.parse(data);
        return TransactionEntity.create(validatedData);
    }

    public static createTransactionFromRaw(rawData: unknown): TransactionEntity {
        const validatedData = TransactionSchemas.createTransactionSchema.parse(rawData);
        return TransactionEntity.create(validatedData);
    }
}