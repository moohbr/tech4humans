export enum TransactionType {
    DEBITO = "Débito",
    CREDITO = "Crédito",
    TRANSFERENCIA = "Transferência",
  }

export interface Transaction {
    id: number;
    type: TransactionType;
    amount: number;
    description: string;
    transactionDate: Date;
    sourceAccountId: number;
    destinationAccountId: number;
}

export interface CreateTransactionDTO {
    type: TransactionType;
    amount: number;
    description: string;
    sourceAccountId: number;
    destinationAccountId: number;
}

export interface UpdateTransactionDTO {
    type: TransactionType;
    amount: number;
    description: string;
    sourceAccountId: number;
    destinationAccountId: number;
}