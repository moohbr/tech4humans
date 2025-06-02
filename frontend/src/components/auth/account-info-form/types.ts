// import { z } from "zod";
// import { accountInfoFormSchema } from "./schema";
import { CompleteSignUpData } from "../sign-up-form/types";
import { UseFormReturn } from "react-hook-form";
import { AccountType } from "@/types/account/enum";


// export type AccountInfoFormValues = z.infer<typeof accountInfoFormSchema>;
export type AccountInfoFormValues = {
  name: string;
  type: AccountType;
  balance: number;
  bankName: string;
}
export type AccountInfoFormProps = {
  onSubmit?: (data: {
    user: {
      name: string;
      email: string;
      password: string;
    };
    account: {
      name: string;
      type: AccountType;
      balance: number;
      bank: {
        name: string;
      };
    };
  }) => void;
  isReadOnly?: boolean;
  nextButtonText?: string;
  isLoading?: boolean;
};

export interface FormFieldProps {
  form: UseFormReturn<AccountInfoFormValues>;
  isReadOnly: boolean;
  isLoading: boolean;
}
