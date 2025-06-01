import { z } from "zod";
import { signUpSchema } from "./schemas";

export type SignUpFormValues = {
  user: z.infer<typeof signUpSchema>['user'];
}

export interface SignUpFormProps {
  onSubmit: (data: SignUpFormValues) => void;
  isLoading?: boolean;
}