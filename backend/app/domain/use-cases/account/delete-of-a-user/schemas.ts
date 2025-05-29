import { AccountSchemas } from "@models/account/schemas";
import { z } from "zod";

export class DeleteAccountOfUserSchemas {
  public static readonly requestSchema = z.object({
    accountId: AccountSchemas.accountIdSchema,
  });

  public static readonly httpRequestSchema = z.object({
    params: this.requestSchema,
  });
}
