import { FormField, FormLabel, FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState, useCallback } from "react";
import { FormFieldProps } from "./types";
import { UserSchemas } from "@/types/user/schema";

export function PasswordField({ form, isLoading }: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  return (
    <FormField
      control={form.control}
      name="password"
      rules={{
        required: 'A senha é obrigatória',
        validate: (value: string) => {
          const result = UserSchemas.passwordSchema.safeParse(value);
          if (!result.success) {
            return result.error.message;
          }
          return true;
        },
      }}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium text-zinc-300 mb-1.5 block">
            Senha
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                className="bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-10"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                disabled={isLoading}
                autoComplete="password"
                {...field}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-300 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-800 rounded p-0.5"
                disabled={isLoading}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
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