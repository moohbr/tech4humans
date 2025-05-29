import { z } from "zod";
import { UserSchemas } from "@models/user/schemas";
import { AccountSchemas } from "@models/account/schemas";
import { BankSchemas } from "@models/bank/schemas";

export class CreateUserSchemas {
  public static readonly requestSchema = z.object({
    account: z.object({
      name: AccountSchemas.nameSchema,
      type: AccountSchemas.accountTypeSchema,
      balance: AccountSchemas.balanceSchema,
      bank: z.object({
        name: BankSchemas.nameSchema,
      }),
    }),
    user: z.object({
      name: UserSchemas.nameSchema,
      email: UserSchemas.emailSchema,
      password: UserSchemas.passwordSchema,
    }),
  });

  public static readonly httpRequestSchema = z.object({
    body: this.requestSchema,
  });
}
