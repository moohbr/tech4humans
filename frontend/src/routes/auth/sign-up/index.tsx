import { AuthLayout } from "@/components/auth/layout";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { AccountInfoForm } from "@/components/auth/account-info-form";
import { AuthToggle } from "@/components/auth/toggle";
import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState, useCallback } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import useSignUp from "@/hooks/mutations/use-sign-up";
import { AccountType } from "@/types/account/enum";
import { SignUpFormValues } from "@/components/auth/sign-up-form/types";
import { AccountInfoFormValues } from "@/components/auth/account-info-form/types";
import { ApiError } from "@/fetchers/base";

export const Route = createFileRoute("/auth/sign-up/")({
  component: SignUp,
});

type FormStep = 'user' | 'account';


function SignUp() {
  const [step, setStep] = useState<FormStep>('user');
  const [userFormData, setUserFormData] = useState<SignUpFormValues['user'] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useSignUp();

  const goBackToUserInfo = useCallback(() => {
    setStep('user');
  }, []);

  const onUserInfoSubmit = useCallback(async (data: SignUpFormValues) => {
    
    try {
      setIsSubmitting(true);
      setUserFormData(data.user);
      setStep('account');
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Falha ao validar informações do usuário";
      
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const onAccountInfoSubmit = useCallback(async (accountData: AccountInfoFormValues) => {    
    if (!userFormData) {
      toast.error("Dados do usuário não encontrados. Tente novamente.");
      setStep('user');
      return;
    }

    try {
      setIsSubmitting(true);
      
      await mutateAsync({
        user: userFormData,
        account: accountData
      });

      toast.success("Conta criada com sucesso!");
      
      setTimeout(() => {
        navigate({ to: "/users/dashboard" });
      }, 1000);
      
    } catch (error) { 
      let errorMessage = "Falha ao criar conta";
      if (error instanceof ApiError) {
        errorMessage = error.errors?.join(', ') || errorMessage;
      }

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }, [userFormData, mutateAsync, navigate]);

  return (
    <>
      <PageTitle title="Criar Conta" />
      <AuthLayout title="Criar Conta" subtitle="Crie uma conta para começar a usar o sistema">
        {step === 'account' ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={goBackToUserInfo}
                className="text-zinc-400 hover:text-zinc-300 p-1"
                disabled={isSubmitting || isPending}
              >
                <ArrowLeft size={16} />
              </Button>
              <h2 className="text-lg font-semibold text-zinc-200">
                Voltar
              </h2>
            </div>
            
            <AccountInfoForm
              account={{
                name: "",
                type: AccountType.POUPANCA,
                balance: 0,
                bankName: "",
              }}
              onSubmit={
                (data) => {
                  onAccountInfoSubmit({
                    type: data.account.type,
                    name: data.account.name,
                    balance: data.account.balance,
                    bankName: data.account.bank.name
                  });
                }
              }
              nextButtonText="Criar conta"
              isLoading={isSubmitting || isPending}
            />
          </div>
        ) : (
          <SignUpForm 
            onSubmit={onUserInfoSubmit}
            isLoading={isSubmitting}
          />
        )}
        <AuthToggle message="Já tem uma conta?" linkText="Fazer login" linkTo="/auth/sign-in" />
      </AuthLayout>
    </>
  );
}