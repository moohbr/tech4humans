import { z } from "zod";
import { signInSchema } from "./schema";

export type SignInFormValues = z.infer<typeof signInSchema>;