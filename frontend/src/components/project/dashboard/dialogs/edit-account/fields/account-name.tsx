import { FormField, FormLabel, FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { FormFieldProps } from "../types";
import { Input } from "@/components/ui/input";
import { AccountSchemas } from "@/types/account/schema";

export function AccountNameField({ form, isReadOnly, isLoading }: FormFieldProps) {
  return (
    <FormField
      control={form.control}
      name="name"
      rules={{
        required: 'O nome da conta é obrigatório',
        validate: (value: string | undefined) => {
          const result = AccountSchemas.nameSchema.safeParse(value);
          if (!result.success) {
            return result.error.message;
          }
          return true;
        },
      }}    
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
  );
}
  