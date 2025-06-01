import { Transaction } from "@/types/transaction/types";
import { handleResponse } from "../base";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllTransactionsOfUser = async (userId: number): Promise<Transaction[]> => {
  const response = await fetch(`${API_BASE_URL}/transactions/user/${userId}`);
  const result = await handleResponse<Transaction[]>(response);
  return result.data;
}