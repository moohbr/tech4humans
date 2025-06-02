import PageTitle from "@/components/page-title";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthLayout } from "../../components/auth/layout";
import { SignInForm } from "../../components/auth/sign-in-form";
import { AuthToggle } from "../../components/auth/toggle";

export const Route = createFileRoute("/auth/sign-in")({
  beforeLoad: ({ context }) => {
    if (context.user) {
      throw redirect({
        to: "/users/dashboard",
      });
    }
  },
  component: SignIn,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      redirect: typeof search.redirect === "string" ? search.redirect : undefined
    };
  }
});

function SignIn() {
  return (
    <>
      <PageTitle title="Entrar" />
      <AuthLayout
        title="Bem vindo de volta"
        subtitle="Entre com suas credenciais"
      >
        <SignInForm />
        <AuthToggle
          message="Não tem uma conta?"
          linkText="Criar conta"
          linkTo="/auth/sign-up"
        />
      </AuthLayout>
    </>
  );
}
