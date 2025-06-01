import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import {
  useState,
  useCallback,
} from "react";
import { useForm } from "react-hook-form";
import { signUpSchema } from "./schemas";
import { SignUpFormProps, SignUpFormValues } from "./types";
import { toast } from "sonner";
import { useSignUpFormStore } from "@/stores/forms/sign-up";

export function SignUpForm({ onSubmit, isLoading = false }: SignUpFormProps) {
  const { data, updateData } = useSignUpFormStore();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema.pick({ user: true })),
    defaultValues: {
      user: {
        name: data.user?.name || "",
        email: data.user?.email || "",
        password: data.user?.password || "",
      },
    },
    mode: 'onChange',
  });

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const handleSubmit = useCallback((formData: SignUpFormValues) => {
    console.log('formData', formData);
    console.log('form.formState.isValid', form.formState.isValid);
    console.log('form.formState.errors', form.formState.errors);
    
    if (!form.formState.isValid) return;

    const result = signUpSchema.pick({ user: true }).safeParse(formData);
    if (!result.success) {
      console.log('result.error', result.error);

      toast.error('Erro ao validar os dados', {
        description: result.error.errors.map(error => error.message).join(', '),
      });
      return;
    }

    updateData({
      user: formData.user,
      account: data.account,
    });

    onSubmit?.(formData);
  }, [data, updateData, form.formState.isValid, onSubmit]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold text-zinc-200 mb-2">
          Criar Nova Conta
        </h2>
        <p className="text-sm text-zinc-400">
          Passo 1 de 2: Informações Pessoais
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="user.name"
              render={({ field }) => (
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
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="user.email"
              render={({ field }) => (
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
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="user.password"
              render={({ field }) => (
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
                        autoComplete="new-password"
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
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-indigo-600 text-white hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 mt-6 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || !form.formState.isValid}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Validando...
              </div>
            ) : (
              "Próxima etapa"
            )}
          </Button>

          {!form.formState.isValid && (
            <div className="text-xs text-red-400 mt-2 text-center">
              Por favor, preencha todos os campos obrigatórios
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}