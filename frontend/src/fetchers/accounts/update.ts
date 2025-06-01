import { Account } from "@/types/account/types";
import { handleResponse } from "../base";

const API_BASE_URL = import.meta.env.BASE_URL;

export const updateAccount = async (
    accountId: number,
    data: Partial<
        Pick<Account, "name" | "type">
    >
): Promise<Account> => {
    const response = await fetch(`${API_BASE_URL}/accounts/${accountId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    const result = await handleResponse<Account>(response);
    return result.data!;
}