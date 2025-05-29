import { UserSchemas } from "@models/user/schemas";
import { z } from "zod";

export class GetAllAccountsOfUserSchemas {
  public static readonly requestSchema = z.object({
    userId: UserSchemas.userIdSchema,
  });

  public static readonly httpRequestSchema = z.object({
    params: this.requestSchema,
  });
}
