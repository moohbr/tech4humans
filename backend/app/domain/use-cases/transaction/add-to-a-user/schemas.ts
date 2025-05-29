import { TransactionSchemas } from "@models/transaction/schemas";
import { AccountSchemas } from "@models/account/schemas";
import { z } from "zod";

export class AddTransactionToUserSchemas {
  public static readonly requestSchema = z.object({
    params: z.object({
      sourceAccountId: AccountSchemas.accountIdSchema,
      destinationAccountId: AccountSchemas.accountIdSchema,
    }),
    transaction: z.object({
      type: TransactionSchemas.transactionTypeSchema,
      amount: TransactionSchemas.amountSchema,
    }),
  });

  public static readonly httpRequestSchema = z.object({
    params: z.object({
      sourceAccountId: AccountSchemas.accountIdSchema,
      destinationAccountId: AccountSchemas.accountIdSchema,
    }),
    body: z.object({
      type: TransactionSchemas.transactionTypeSchema,
      amount: TransactionSchemas.amountSchema,
    }),
  });
}