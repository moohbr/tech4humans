import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { signUpSchema } from "./schemas";
import { SignUpFormProps, SignUpFormValues } from "./types";
import { toast } from "sonner";
import { useSignUpFormStore } from "@/stores/forms/sign-up";
import { NameField } from "./fields/name-field";
import { EmailField } from "./fields/email-field";
import { PasswordField } from "./fields/password-field";

export function SignUpForm({ onSubmit, isLoading = false }: SignUpFormProps) {
  const { data, updateData } = useSignUpFormStore();

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

  const handleSubmit = useCallback((formData: SignUpFormValues) => {
    if (!form.formState.isValid) return;

    const result = signUpSchema.pick({ user: true }).safeParse(formData);
    if (!result.success) {
      console.error('result.error', result.error);

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
            <NameField form={form} isLoading={isLoading} />
            <EmailField form={form} isLoading={isLoading} />
            <PasswordField form={form} isLoading={isLoading} />
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
        </form>
      </Form>
    </div>
  );
}