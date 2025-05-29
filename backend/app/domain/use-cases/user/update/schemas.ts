import { z } from "zod";
import { UserSchemas } from "@models/user/schemas";

export class UpdateUserSchemas {
  public static readonly requestSchema = z.object({
    user: z.object({
      name: UserSchemas.nameSchema.optional(),
      email: UserSchemas.emailSchema.optional(),
      password: UserSchemas.passwordSchema.optional(),
    }),
  });

  public static readonly httpRequestSchema = z.object({
    body: this.requestSchema,
    params: z.object({
      id: UserSchemas.userIdSchema,
    }),
  });
}
