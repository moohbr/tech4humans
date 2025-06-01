import { User } from '@/types/user/types';

const API_BASE_URL = import.meta.env.BASE_URL;

interface LoginResponse {
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export async function login(credentials: { email: string; password: string }) {
  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  const { data } = await response.json() as LoginResponse;
  return data;
} 