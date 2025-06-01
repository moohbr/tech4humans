import { FormField, FormLabel, FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Select } from "@/components/ui/select";
import { useMemo } from "react";
import { FormFieldProps } from "../types";
import { ACCOUNT_TYPE_LABELS } from "@/constants/account-type-labels";
import { AccountType } from "@/types/account/enum";
import { Input } from "@/components/ui/input";

export function AccountTypeField({ form, isReadOnly, isLoading }: FormFieldProps) {
    const accountTypeOptions = useMemo(() =>
      Object.values(AccountType).map((type) => ({
        value: type,
        label: ACCOUNT_TYPE_LABELS[type] || type,
      })), []
    );
    return (
      <FormField
      control={form.control}
      name="type"
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium text-zinc-300 mb-1.5 block">
            Tipo de Conta
          </FormLabel>
          <FormControl>
            {isReadOnly ? (
              <Input
                className="bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/50 text-zinc-900 dark:text-zinc-100"
                value={ACCOUNT_TYPE_LABELS[field.value as AccountType] || field.value}
                disabled={isReadOnly || isLoading}
                readOnly
              />
            ) : (
              <Select
                value={field.value}
                onChange={field.onChange}
                options={accountTypeOptions}
                placeholder="Selecione o tipo de conta"
                isLoading={isReadOnly || isLoading}
                className="bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            )}
          </FormControl>
          {fieldState.error && (
            <FormMessage className="text-red-400 text-xs">
              {fieldState.error.message}
            </FormMessage>
          )}
        </FormItem>
      )}
    />
    );
}
  