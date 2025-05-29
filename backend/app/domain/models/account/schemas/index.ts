import { AccountType } from "@infrastructure/datasources/databases/typeorm/models/enums";
import { BankSchemas } from "@models/bank/schemas";
import { UserSchemas } from "@models/user/schemas";
import { z } from "zod";

export class AccountSchemas {
  public static readonly nameSchema = z
    .string()
    .min(2, "Name must have at least 2 characters")
    .max(100, "Name cannot exceed 100 characters")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Name can only contain letters and spaces");

  public static readonly accountIdSchema = z
    .coerce
    .number()
    .int("Account ID must be an integer")
    .positive("Account ID must be positive");

  public static readonly accountTypeSchema = z.nativeEnum(AccountType);

  public static readonly balanceSchema = z
    .number()
    // .max(9999999999, "Balance is too high")
    // .min(-9999999999, "Balance is too low")
    .refine((val) => Number.isFinite(val), {
      message: "Balance must be a finite number",
    });

  public static readonly createAccountSchema = z.object({
    type: this.accountTypeSchema, 
    balance: this.balanceSchema,
    userId: UserSchemas.userIdSchema,
    bankName: BankSchemas.nameSchema,
  });

  public static readonly accountEntitySchema = z.object({
    id: this.accountIdSchema,
    name: this.nameSchema,
    type: this.accountTypeSchema,
    balance: this.balanceSchema,
    createdAt: z.date(),
  });
}
