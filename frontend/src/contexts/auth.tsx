import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types/user/types';
import { jwtDecode } from 'jwt-decode';



type AuthContextType = {
    user: User | null;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

type AuthProviderProps = {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      try {
        const decoded = jwtDecode<{ user: User }>(storedToken);
        setUser(decoded.user);
        setToken(storedToken);
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('auth_token');
      }
    }
  }, []);

  const login = (newToken: string) => {
    try {
      const decoded = jwtDecode<{ user: User }>(newToken);
      setUser(decoded.user);
      setToken(newToken);
      localStorage.setItem('auth_token', newToken);
    } catch (error) {
      console.error('Invalid token:', error);
      throw new Error('Invalid authentication token');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 