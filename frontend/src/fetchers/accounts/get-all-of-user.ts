import { Account } from "@/types/account/types";
import { handleResponse } from "../base";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllAccountsOfUser = async (userId: number): Promise<Account[]> => {
  const response = await fetch(`${API_BASE_URL}/accounts/user/${userId}`);
  const result = await handleResponse<Account[]>(response);
  return result.data!;
};