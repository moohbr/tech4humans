import { UseFormReturn } from "react-hook-form";
import { SignUpFormValues } from "../types";

export interface FormFieldProps {
  form: UseFormReturn<SignUpFormValues>;
  isLoading: boolean;
} 