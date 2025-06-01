import { UseFormReturn } from "react-hook-form";
import { SignInFormValues } from "../types";

export interface FormFieldProps {
  form: UseFormReturn<SignInFormValues>;
  isLoading: boolean;
} 