import { useMutation } from '@tanstack/react-query';
import { login } from '@/fetchers/auth/login';
import { useAuth } from '@/contexts/auth';
import { LoginCredentials } from './types';

export function useLogin()  {
  const { login: setAuth } = useAuth();
  
  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await login(credentials);
      
      const token = response.data?.token;
      
      if (!token) {
        throw new Error('No authentication token received from server');
      }
      
      await setAuth(token);
      return response;
    },
  });
}