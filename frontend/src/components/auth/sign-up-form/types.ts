import { z } from "zod";
import { signUpSchema } from "./schemas";
import { accountInfoFormSchema } from "../account-info-form/schema";

export type SignUpFormValues = {
  user: z.infer<typeof signUpSchema>['user'];
}

export interface SignUpFormProps {
  onSubmit?: (data: SignUpFormValues) => void;
  isLoading?: boolean;
}

export type AccountInfoFormValues = z.infer<typeof accountInfoFormSchema>;

export interface AccountInfoFormProps {
  onSubmit?: (data: { user: SignUpFormValues['user']; account: AccountInfoFormValues }) => void;
  isReadOnly?: boolean;
  nextButtonText?: string;
  isLoading?: boolean;
}

export type CompleteSignUpData = z.infer<typeof signUpSchema>;