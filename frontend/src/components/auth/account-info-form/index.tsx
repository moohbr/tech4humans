import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { AccountType } from "@/types/account/enum";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import { accountInfoFormSchema } from "./schema";
import { AccountInfoFormProps, AccountInfoFormValues } from "./types";
import { toast } from "sonner";
import { signUpSchema } from "../sign-up-form/schemas";
import { useSignUpFormStore } from "@/stores/forms/sign-up";
import { AccountNameField } from "./fields/account-name";
import { AccountTypeField } from "./fields/account-type";
import { BalanceField } from "./fields/account-balance";
import { BankNameField } from "./fields/bank-name";

export function AccountInfoForm({
  onSubmit,
  isReadOnly = false,
  nextButtonText = "Próxima etapa",
  isLoading = false
}: AccountInfoFormProps) {
  const data = useSignUpFormStore(state => state.data);
  const updateData = useSignUpFormStore(state => state.updateData);

  const form = useForm<AccountInfoFormValues>({
    resolver: zodResolver(accountInfoFormSchema),
    defaultValues: {
      name: data.account?.name ?? "",
      type: data.account?.type ?? AccountType.POUPANCA,
      balance: data.account?.balance ?? 0,
      bankName: data.account?.bank?.name ?? "",
    },
    mode: 'onChange',
  });

  const handleSubmit = useCallback((formData: AccountInfoFormValues) => {
    if (!form.formState.isValid) return;

    const result = signUpSchema.safeParse({
      account: {
        ...formData,
        bank: {
          name: formData.bankName
        }
      },
      user: data.user,
    });

    if (!result.success) {
      toast.error('Erro ao validar os dados', {
        description: result.error.errors.map(error => error.path + ' ' + error.message).join(', '),
      });
      return;
    }

    updateData({
      user: data.user,
      account: {
        ...formData,
        bank: {
          name: formData.bankName
        }
      },
    });

    onSubmit?.({
      user: data.user,
      account: {
        ...formData,
        bank: {
          name: formData.bankName
        }
      },
    });
  }, [data.user, updateData, form.formState.isValid, onSubmit]);

  return (
    <div className="space-y-6">
      {!isReadOnly && (
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-zinc-200 mb-2">
            Informações da Conta
          </h3>
          <p className="text-sm text-zinc-400">
            Passo 2 de 2: Configure sua conta bancária
          </p>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-4">
            <AccountNameField form={form} isReadOnly={isReadOnly} isLoading={isLoading} />
            <AccountTypeField form={form} isReadOnly={isReadOnly} isLoading={isLoading} />
            <BalanceField form={form} isReadOnly={isReadOnly} isLoading={isLoading} />
            <BankNameField form={form} isReadOnly={isReadOnly} isLoading={isLoading} />
          </div>

          {!isReadOnly && (
            <Button
              type="submit"
              className="w-full"
              disabled={!form.formState.isValid || isLoading}
            >
              {isLoading ? "Carregando..." : nextButtonText}
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}