import { AuthLayout } from "@/components/auth/layout";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { AuthToggle } from "@/components/auth/toggle";
import PageTitle from "@/components/page-title";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/sign-up")({
  component: SignUp,
});

function SignUp() {
  return (
    <>
      <PageTitle title="Criar conta" />
      <AuthLayout
        title="Criar conta"
        subtitle="Comece com sua conta gratuita"
      >
        <SignUpForm />
        <AuthToggle
          message="Já tem uma conta?"
          linkText="Entrar"
          linkTo="/auth/sign-in"
        />
      </AuthLayout>
    </>
  );
}
