import { handleResponse } from "@/fetchers/base";
import { LoginUserDTO } from "@/types/user/types";
import { LoginUserResponse } from "@/types/user/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const login = async (credentials: LoginUserDTO) => {
  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  return await handleResponse<LoginUserResponse>(response);
}   