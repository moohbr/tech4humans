import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { AccountType } from "@/types/account/enum";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCallback, useMemo } from "react";
import { accountInfoFormSchema, accountInfoTransformedSchema } from "./schema";
import { AccountInfoFormProps, AccountInfoFormValues } from "./types";
import { ACCOUNT_TYPE_LABELS } from "@/constants/account-type-labels";

export function AccountInfoForm({ 
  account, 
  onSubmit, 
  isReadOnly = false, 
  nextButtonText = "Próxima etapa",
  isLoading = false 
}: AccountInfoFormProps) {
  
  const form = useForm<AccountInfoFormValues>({
    resolver: zodResolver(accountInfoFormSchema),
    defaultValues: {
      name: account.name || "",
      type: account.type || AccountType.POUPANCA,
      balance: account.balance || 0,
      bank: {
        name: account.bank?.name || "",
      },
    },
    mode: 'onChange',
  });

  const accountTypeOptions = useMemo(() => 
    Object.values(AccountType).map((type) => ({
      value: type,
      label: ACCOUNT_TYPE_LABELS[type] || type,
    })), []
  );

  const handleSubmit = useCallback((data: AccountInfoFormValues) => {
    if (!onSubmit) return;

    try {
      const transformedData = accountInfoTransformedSchema.parse(data);
      console.log('Account info form submission:', transformedData);
      onSubmit(transformedData);
    } catch (error) {
      console.error('Account info transformation error:', error);
    }
  }, [onSubmit]);

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
    <div className="space-y-6">
      {!isReadOnly && (
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-zinc-200 mb-2">
            Informações da Conta
          </h3>
          <p className="text-sm text-zinc-400">
            Passo 2 de 2: Configure sua conta bancária
          </p>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-zinc-300 mb-1.5 block">
                    Nome da Conta
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Ex: Conta Principal, Poupança"
                      disabled={isReadOnly || isLoading}
                      {...field}
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
                        value={ACCOUNT_TYPE_LABELS[field.value] || field.value}
                        disabled
                        readOnly
                      />
                    ) : (
                      <Select
                        value={field.value}
                        onChange={field.onChange}
                        options={accountTypeOptions}
                        placeholder="Selecione o tipo de conta"
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

            <FormField
              control={form.control}
              name="balance"
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

            <FormField
              control={form.control}
              name="bank.name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-zinc-300 mb-1.5 block">
                    Nome do Banco
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Ex: Banco do Brasil, Itaú, Nubank"
                      disabled={isReadOnly || isLoading}
                      {...field}
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
          </div>

          {!isReadOnly && onSubmit && (
            <Button
              type="submit"
              className="w-full bg-indigo-600 text-white hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 mt-6 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || !form.formState.isValid}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Criando conta...
                </div>
              ) : (
                nextButtonText
              )}
            </Button>
          )}

          {!isReadOnly && (
            <div className="text-center mt-4">
              <p className="text-xs text-zinc-400">
                Todos os campos são obrigatórios para criar sua conta
              </p>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}