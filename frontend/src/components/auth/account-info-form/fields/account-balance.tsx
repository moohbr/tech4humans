import { FormField, FormLabel, FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCallback } from "react";
import { FormFieldProps } from "../types";
import { AccountSchemas } from "@/types/account/schema";

export function BalanceField({ form, isReadOnly, isLoading }: FormFieldProps) {
    const formatCurrency = useCallback((value: string) => {
      const numericValue = value.replace(/[^\d.,]/g, '').replace(',', '.');
      return numericValue;
    }, []);
  
    const handleBalanceChange = useCallback((value: string, onChange: (value: number) => void) => {
      const formattedValue = formatCurrency(value);
      const numericValue = parseFloat(formattedValue) || 0;
      onChange(numericValue);
    }, [formatCurrency]);
  
    return (
      <FormField
      control={form.control}
      name="balance"
      rules={{
        required: 'O saldo inicial é obrigatório',
        validate: (value: number) => {
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
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">
                R$
              </div>
              <Input
                className="bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent pl-10"
                type="number"
                step="0.01"
                min="0"
                placeholder="0,00"
                disabled={isReadOnly || isLoading}
                value={field.value || ''}
                onChange={(e) => handleBalanceChange(e.target.value, field.onChange)}
                onBlur={field.onBlur}
                ref={field.ref}
              />
            </div>
          </FormControl>
          {fieldState.error && (
            <FormMessage className="text-red-400 text-xs">
              {fieldState.error.message}
            </FormMessage>
          )}
          {!isReadOnly && (
            <p className="text-xs text-zinc-400 mt-1">
              Informe o saldo atual da sua conta
            </p>
          )}
        </FormItem>
      )}
    />
    );
  }
  