import { TransactionType } from "@infrastructure/datasources/databases/typeorm/models/enums";
import { AccountSchemas } from "@models/account/schemas";
import { z } from "zod";

export class TransactionSchemas {
  public static readonly transactionIdSchema = z
    .number()
    .int("Transaction ID must be an integer")
    .positive("Transaction ID must be positive");

  public static readonly amountSchema = z
    .coerce
    .number()
    .refine((val) => val > 0, {
      message: "Amount must be greater than 0",
    });

  public static readonly descriptionSchema = z
    .string()
    .min(2, "Description must have at least 2 characters")
    .max(255, "Description cannot exceed 255 characters");

  public static readonly accountIdSchema = AccountSchemas.accountIdSchema;

  public static readonly transactionDateSchema = z.date();

  public static readonly transactionTypeSchema = z.nativeEnum(TransactionType);

  public static readonly createTransactionSchema = z.object({
    amount: this.amountSchema,
    description: this.descriptionSchema,
    destinationAccountId: this.accountIdSchema,
    sourceAccountId: this.accountIdSchema,
    type: this.transactionTypeSchema,
  });

  public static readonly transactionEntitySchema = z.object({
    id: this.transactionIdSchema,
    amount: this.amountSchema,
    description: this.descriptionSchema,
    destinationAccountId: this.accountIdSchema,
    sourceAccountId: this.accountIdSchema,
    type: this.transactionTypeSchema,
    transactionDate: this.transactionDateSchema,
  });
}