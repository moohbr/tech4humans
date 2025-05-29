import { TransactionEntity } from "@models/transaction/entity";

export type CreateTransactionData = Omit<
  ReturnType<TransactionEntity["toPersistence"]>,
  "id" | "createdAt" | "updatedAt"
>;
