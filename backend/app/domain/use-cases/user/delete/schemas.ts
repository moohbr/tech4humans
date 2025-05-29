import { z } from "zod";
import { UserSchemas } from "@models/user/schemas";

export class DeleteUserSchemas {
  public static readonly requestSchema = z.object({
    id: UserSchemas.userIdSchema,
  });

  public static readonly httpRequestSchema = z.object({
    params: this.requestSchema,
  });
}
