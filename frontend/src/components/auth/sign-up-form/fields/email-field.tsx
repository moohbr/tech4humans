import { FormField, FormLabel, FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormFieldProps } from "./types";
import { UserSchemas } from "@/types/user/schema";

export function EmailField({ form, isLoading }: FormFieldProps) {
  return (
    <FormField
      control={form.control}
      name="user.email"
      rules={{
        required: 'O email é obrigatório',
        validate: (value: string) => {
          const result = UserSchemas.emailSchema.safeParse(value);
          if (!result.success) {
            return result.error.message;
          }
          return true;
        },
      }}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium text-zinc-300 mb-1.5 block">
            Email
          </FormLabel>
          <FormControl>
            <Input
              type="email"
              className="bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="seu@email.com"
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