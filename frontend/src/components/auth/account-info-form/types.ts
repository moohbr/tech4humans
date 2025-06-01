import { z } from "zod";
import { accountInfoFormSchema } from "./schema";
import { CompleteSignUpData } from "../sign-up-form/types";
import { UseFormReturn } from "react-hook-form";


export type AccountInfoFormValues = z.infer<typeof accountInfoFormSchema>;

export type AccountInfoFormProps = {
  account: AccountInfoFormValues;
  onSubmit?: (data: CompleteSignUpData) => void;
  isReadOnly?: boolean;
  nextButtonText?: string;
  isLoading?: boolean;
};

export interface FormFieldProps {
  form: UseFormReturn<AccountInfoFormValues>;
  isReadOnly: boolean;
  isLoading: boolean;
}
