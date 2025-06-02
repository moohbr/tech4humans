import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { User } from '@/types/user/types';
import { jwtDecode } from 'jwt-decode';
import { useDashboardStore } from '@/stores/dashboard';
import { useTransactionStore } from '@/stores/transactions';
import { useSignUpFormStore } from '@/stores/forms/sign-up';

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

type AuthProviderProps = {
  children: React.ReactNode;
}

type TokenPayload = {
  user: User;
  exp: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      const storedToken = localStorage.getItem('auth_token');
      if (storedToken) {
        try {
          const decoded = jwtDecode<{ user: User, exp: number }>(storedToken);
          
          const currentTime = Date.now() / 1000;
          if (decoded.exp && decoded.exp < currentTime) {
            localStorage.removeItem('auth_token');
          } else {
            setUser(decoded.user);
            setToken(storedToken);
          }
        } catch (error) {
          localStorage.removeItem('auth_token');
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

const login = useCallback(async (token: string) => {
  console.log("[Auth] Login called with token:", token);
  
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    console.log("[Auth] Decoded token:", decoded);
    
    localStorage.setItem('token', token);
    
    setUser(decoded.user);
    
  } catch (error) {
    console.error("[Auth] Invalid token:", error);
    throw new Error('Invalid authentication token');
  }
}, []);

  const resetAllStores = () => {
    useDashboardStore.setState({
      isNewAccountDialogOpen: false,
      isTransactionDialogOpen: false,
      isEditAccountDialogOpen: false,
      isDeleteAccountDialogOpen: false,
      selectedAccount: null
    });

    useTransactionStore.setState({
      transactions: [],
      isLoading: false,
      error: null
    });

    useSignUpFormStore.getState().clearData();
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
    localStorage.clear();
    sessionStorage.clear();
    resetAllStores();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
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