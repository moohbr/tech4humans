import { Bank } from "@/types/bank/types";
import { handleResponse } from "../base";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllBanks = async () => {
    const response = await fetch(`${API_BASE_URL}/banks`);
    return await handleResponse<Bank[]>(response);
}