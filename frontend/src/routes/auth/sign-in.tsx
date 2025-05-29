import PageTitle from "@/components/page-title";
import { createFileRoute } from "@tanstack/react-router";
import { AuthLayout } from "../../components/auth/layout";
import { SignInForm } from "../../components/auth/sign-in-form";
import { AuthToggle } from "../../components/auth/toggle";

export const Route = createFileRoute("/auth/sign-in")({
  component: SignIn,
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
