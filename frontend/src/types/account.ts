export enum AccountType {
    CORRENTE = "Corrente",
    POUPANCA = "Poupança",
    CREDITO = "Crédito",
    INVESTIMENTO = "Investimento",
} 

export interface Account {
    id: number;
    type: AccountType;
    balance: number;
    createdAt: Date;
    userId: number;
    bankName: string;
}

export interface CreateAccountDTO {
    bankName: string;
    type: AccountType;
    balance: number;
}

export interface UpdateAccountDTO {
  type: AccountType
} 