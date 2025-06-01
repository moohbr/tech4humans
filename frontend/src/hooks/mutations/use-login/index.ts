import { useMutation } from '@tanstack/react-query';
import { login } from '@/fetchers/auth/login';
import { useAuth } from '@/contexts/auth';
import { LoginCredentials } from './types';

export function useLogin() {
  const { login: setAuth } = useAuth();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await login(credentials);
      setAuth(response.token);
      return response;
    },
  });
} 