import { AccountSchemas } from "@models/account/schemas";
import { BankSchemas } from "@models/bank/schemas";
import { UserSchemas } from "@models/user/schemas";
import { z } from "zod";

export class AddAccountToUserSchemas {
  public static readonly requestSchema = z.object({
      type: AccountSchemas.accountTypeSchema,
      balance: AccountSchemas.balanceSchema,
      bankName: BankSchemas.nameSchema,
      name: AccountSchemas.nameSchema,
  });

  public static readonly httpRequestSchema = z.object({
    params: z.object({
      userId: UserSchemas.userIdSchema,
    }),
    body: this.requestSchema,
  });
}
