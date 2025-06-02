import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useLogin } from "@/hooks/mutations/use-login";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { EmailField } from "./fields/email-field";
import { PasswordField } from "./fields/password-field";
import { signInSchema } from "./schema";
import { z } from "zod";
import { ApiError } from "@/fetchers/base";

type SignInFormValues = z.infer<typeof signInSchema>;

export function SignInForm() {
  const navigate = useNavigate();
  const { redirect } = useSearch({
    from: "/auth/sign-in",
    strict: true
  });
  
  const { mutateAsync: login, isPending } = useLogin();
  
  const form = useForm<SignInFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    try {
      const redirectTo = redirect || "/users/dashboard";
      
      await login(data);
      
      toast.success("Login realizado com sucesso!");
      
      navigate({ to: redirectTo });
      
    } catch (error) {
      console.error("[SignInForm] Login error:", error);
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error("Ocorreu um erro ao fazer login. Tente novamente.");
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <EmailField form={form} isLoading={isPending} />
        <PasswordField form={form} isLoading={isPending} />

        <Button
          type="submit"
          className="w-full"
          disabled={isPending}
        >
          {isPending ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </Form>
  );
}