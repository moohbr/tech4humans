import { handleResponse } from "../base";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const deleteUser = async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });
    await handleResponse(response);
} 