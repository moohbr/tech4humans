import { FormField, FormLabel, FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { FormFieldProps } from "../types";
import { Select } from "@/components/ui/select";
import { Skeleton } from '@/components/ui/skeleton'
import { BankSchemas } from "@/types/bank/schema";
import { useBanks } from "@/hooks/queries/use-banks";
import { useMemo } from "react";
import { Input } from "@/components/ui/input";

export function BankNameField({ form, isReadOnly, isLoading }: FormFieldProps) {
  const { banks, isLoading: isLoadingBanks, error } = useBanks();
  
  const bankOptions = useMemo(() => {
    const options = banks?.map((bank) => ({
      value: bank.name,
      label: bank.name,
    })) || [];
    return options;
  }, [banks]);

  if (isLoadingBanks) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-10 w-full" />
      </div>
    )
  }

  if (error) {
    console.error('Error loading banks:', error);
    return (
      <div className="space-y-2">
        <FormLabel className="text-sm font-medium text-zinc-300 mb-1.5 block">
          Nome do Banco
        </FormLabel>
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <p className="text-red-600 dark:text-red-400 text-sm">
            Erro ao carregar bancos. Tente novamente.
          </p>
        </div>
      </div>
    );
  }

  if (!banks || banks.length === 0) {
    return (
      <div className="space-y-2">
        <FormLabel className="text-sm font-medium text-zinc-300 mb-1.5 block">
          Nome do Banco
        </FormLabel>
        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
          <p className="text-yellow-600 dark:text-yellow-400 text-sm">
            Nenhum banco disponível.
          </p>
        </div>
      </div>
    );
  }

  return (
    <FormField
      control={form.control}
      name="bankName"
      rules={{
        required: 'O nome do banco é obrigatório',
        validate: (value: string) => {
          if (!value) return 'O nome do banco é obrigatório';
          const result = BankSchemas.nameSchema.safeParse(value);
          if (!result.success) {
            return result.error.message;
          }
          return true;
        },
      }}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium text-zinc-300 mb-1.5 block">
            Nome do Banco
          </FormLabel>
          <FormControl>
            {isReadOnly ? (
              <Input
                className="bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/50 text-zinc-900 dark:text-zinc-100"
                value={field.value || ''}
                disabled
                readOnly
              />
            ) : (
              <Select
                value={field.value || ''}
                onChange={(value) => {
                  field.onChange(value);
                }}
                options={bankOptions}
                placeholder="Selecione o banco"
                isLoading={isLoading}
                disabled={isLoading}
                className="bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                name="bankName"
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