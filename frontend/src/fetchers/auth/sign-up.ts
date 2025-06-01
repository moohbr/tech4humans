import { handleResponse } from "../base";
import { CreateUserDTO, CreateUserResponse } from "@/types/user/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const signUp = async (data: CreateUserDTO) => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await handleResponse<CreateUserResponse>(response);
}