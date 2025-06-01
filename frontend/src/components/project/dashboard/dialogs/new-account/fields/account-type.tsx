import { FormField, FormLabel, FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Select } from "@/components/ui/select";
import { ACCOUNT_TYPE_LABELS } from "@/constants/account-type-labels";
import { AccountType } from "@/types/account/enum";
import { FormFieldProps } from "../types";
import { Skeleton } from '@/components/ui/skeleton'
import { AccountSchemas } from "@/types/account/schema";

export function AccountTypeField({ form, isReadOnly, isLoading }: FormFieldProps) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-10 w-full" />
      </div>
    )
  }

  return (
    <FormField
      control={form.control}
      name="type"
      rules={{
        required: 'O tipo de conta é obrigatório',
        validate: (value: AccountType | undefined) => {
          const result = AccountSchemas.accountTypeSchema.safeParse(value);
          if (!result.success) {
            return result.error.message;
          }
          return true;
        },
      }}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium text-zinc-300 mb-1.5 block">
            Tipo de Conta
          </FormLabel>
          <FormControl>
            <Select
              value={field.value}
              onChange={field.onChange}
              options={Object.values(AccountType).map((type) => ({
                value: type,
                label: ACCOUNT_TYPE_LABELS[type] || type,
              }))}
              placeholder="Selecione o tipo de conta"
              isLoading={isReadOnly || isLoading}
              className="bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
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