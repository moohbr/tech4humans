import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useLogin } from "@/hooks/mutations/use-login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth";
import { SignInFormValues } from "./types";
import { signInSchema } from "./schema";
import { EmailField } from "./fields/email-field";
import { PasswordField } from "./fields/password-field";


export function SignInForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync, isPending } = useLogin();

  const onSubmit = async (data: SignInFormValues) => {
    try {
      const response = await mutateAsync({
        email: data.email,
        password: data.password,
      });

      login(response?.data?.token ?? "");
      toast.success("Login realizado com sucesso!");

      setTimeout(() => {
        navigate({ to: "/users/dashboard" });
      }, 500);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro ao fazer login");
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4">
          <EmailField form={form} isLoading={isPending} />
          <PasswordField form={form} isLoading={isPending} />

          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 focus:outline-none"
            >
              Esqueceu a senha?
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-indigo-600 text-white hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
        >
          {isPending ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </Form>
  );
}
