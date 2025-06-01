import { UserSchemas } from "@/types/user/schema";
import { z } from "zod";

export const signInSchema = z.object({
  email: UserSchemas.emailSchema,
  password: UserSchemas.passwordSchema,
});