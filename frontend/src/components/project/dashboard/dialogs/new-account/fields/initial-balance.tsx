import { FormField, FormLabel, FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { FormFieldProps } from "../types";
import { Input } from "@/components/ui/input";
import { AccountSchemas } from "@/types/account/schema";
import { Skeleton } from '@/components/ui/skeleton'

export function InitialBalanceField({ form, isReadOnly, isLoading }: FormFieldProps) {
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
      name="balance"
      rules={{
        required: 'O saldo inicial é obrigatório',
        validate: (value: number | undefined) => {
          const result = AccountSchemas.balanceSchema.safeParse(value);
          if (!result.success) {
            return result.error.message;
          }
          return true;
        },
      }}    
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium text-zinc-300 mb-1.5 block">
            Saldo Inicial
          </FormLabel>
          <FormControl>
            <Input
              className="bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Ex: 1000.00"
              type="number"
              step="0.01"
              disabled={isReadOnly || isLoading}
              {...field}
              onChange={(e) => field.onChange(e.target.valueAsNumber)}
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