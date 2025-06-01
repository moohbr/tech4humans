import { z } from "zod";
import { accountInfoFormSchema } from "./schema";
import { UseFormReturn } from "react-hook-form";
import { UpdateAccountDTO } from "@/types/account/types";


export type AccountInfoFormValues = z.infer<typeof accountInfoFormSchema>;

export type AccountInfoFormProps = {
  account: AccountInfoFormValues;
  onSubmit?: (data: UpdateAccountDTO) => void;
  isReadOnly?: boolean;
  nextButtonText?: string;
  isLoading?: boolean;
};

export interface FormFieldProps {
  form: UseFormReturn<UpdateAccountDTO>;
  isReadOnly: boolean;
  isLoading: boolean;
}
