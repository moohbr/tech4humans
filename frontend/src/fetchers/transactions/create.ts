import { Transaction } from "@/types/transaction/types";
import { handleResponse } from "../base";
import { TransactionType } from "@/types/transaction/enum";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createTransaction = async (
    sourceAccountId: number,
    destinationAccountId: number,
    data: {
      type: TransactionType;
      amount: number;
      description?: string;
    }
  ): Promise<Transaction> => {
    const response = await fetch(
      `${API_BASE_URL}/transactions/from/${sourceAccountId}/to/${destinationAccountId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }
    );
    const result = await handleResponse<Transaction>(response);
    return result.data!;
}