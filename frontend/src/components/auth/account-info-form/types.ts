import { z } from "zod";
import { accountInfoFormSchema } from "./schema";


export type AccountInfoFormValues = z.infer<typeof accountInfoFormSchema>;

export type AccountInfoFormProps = {
  account: AccountInfoFormValues;
  onSubmit?: (data: AccountInfoFormValues) => void;
  isReadOnly?: boolean;
  nextButtonText?: string;
  isLoading?: boolean;
};