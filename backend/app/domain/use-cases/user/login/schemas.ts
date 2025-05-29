import { z } from "zod";
import { UserSchemas } from "@models/user/schemas";

export class UserLoginSchemas {
  public static readonly requestSchema = z.object({
    email: UserSchemas.emailSchema,
    password: z.string().min(8).max(100),
  });

  public static readonly httpRequestSchema = z.object({
    body: this.requestSchema,
  });
}
