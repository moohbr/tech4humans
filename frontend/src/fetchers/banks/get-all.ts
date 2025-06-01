import { Bank } from "@/types/bank/types";
import { handleResponse } from "../base";

const API_BASE_URL = import.meta.env.BASE_URL;

export const getAllBanks = async (): Promise<Bank[]> => {
    const response = await fetch(`${API_BASE_URL}/banks`);
    const result = await handleResponse<Bank[]>(response);
    return result.data!;
}