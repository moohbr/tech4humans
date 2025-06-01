import { AccountType } from "@/types/account/enum";

export const ACCOUNT_TYPE_LABELS: Record<AccountType, string> = {
    [AccountType.POUPANCA]: "Poupança",
    [AccountType.CORRENTE]: "Conta Corrente",
    [AccountType.INVESTIMENTO]: "Investimento",
    [AccountType.CREDITO]: "Crédito",
};