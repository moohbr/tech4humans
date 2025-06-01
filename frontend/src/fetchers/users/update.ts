import { User } from "@/types/user/types";
import { handleResponse } from "../base";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const updateUser = async (id: number, data: Partial<{ name: string; email: string }>): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await handleResponse<User>(response);
    return result.data!;
}