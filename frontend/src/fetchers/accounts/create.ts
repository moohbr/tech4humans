import { handleResponse } from "../base";
import { Account, AccountType } from "@/types/account";


const API_BASE_URL = import.meta.env.BASE_URL;

export const createAccount = async (
    userId: number, data: {
        name: string; type: AccountType; bankName: string
    }): Promise<Account> => {
    const response = await fetch(`${API_BASE_URL}/accounts/user/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    const result = await handleResponse<Account>(response);
    return result.data!;
}