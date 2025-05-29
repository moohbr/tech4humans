import { AccountSchemas } from "@models/account/schemas";
import { BankSchemas } from "@models/bank/schemas";
import { z } from "zod";

export class UpdateAccountOfUserSchemas {
  public static readonly requestSchema = z.object({
    type: AccountSchemas.accountTypeSchema.optional(),
    name: AccountSchemas.nameSchema.optional(),
    bankName: BankSchemas.nameSchema.optional(),
  });

  public static readonly httpRequestSchema = z.object({
    params: z.object({
      accountId: AccountSchemas.accountIdSchema,
    }),
    body: this.requestSchema,
  });
}
