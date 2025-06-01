import { FormField, FormLabel, FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormFieldProps } from "./types";
import { UserSchemas } from "@/types/user/schema";

export function NameField({ form, isLoading }: FormFieldProps) {
  return (
    <FormField
      control={form.control}
      name="user.name"
      rules={{
        required: 'O nome é obrigatório',
        validate: (value: string) => {
          const result = UserSchemas.nameSchema.safeParse(value);
          if (!result.success) {
            return result.error.message;
          }
          return true;
        },
      }}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium text-zinc-300 mb-1.5 block">
            Nome Completo
          </FormLabel>
          <FormControl>
            <Input
              className="bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Digite seu nome completo"
              disabled={isLoading}
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