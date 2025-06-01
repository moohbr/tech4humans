import { handleResponse } from "../base";
import { CreateUserDTO, User } from "@/types/user/types";

const API_BASE_URL = import.meta.env.BASE_URL;

export const signUp = async (data: CreateUserDTO): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await handleResponse<User>(response);
    return result.data!;
}