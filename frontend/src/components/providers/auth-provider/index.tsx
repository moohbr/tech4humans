import { User } from "@/types/user/types";
import { LayoutGrid } from "lucide-react";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { jwtDecode } from "jwt-decode";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface TokenPayload {
  userId: number;
  iat: number;
  exp: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: async () => undefined,
  logout: () => undefined,
});

function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch user data
  const fetchUserData = async (userId: number, authToken: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch user data');
      const userData = await response.json();
      setUser(userData.data);
      return userData.data;
    } catch (error) {
      logout();
      throw error;
    }
  };

  const initializeAuth = async () => {
    try {
      const storedToken = localStorage.getItem('auth_token');
      if (!storedToken) {
        return;
      }

      const decoded = jwtDecode<TokenPayload>(storedToken);
      if (decoded.exp * 1000 < Date.now()) {
        throw new Error('Token expired');
      }

      setToken(storedToken);
      await fetchUserData(decoded.userId, storedToken);
    } catch (error) {
      localStorage.removeItem('auth_token');
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  const login = async (newToken: string) => {
    try {
      const decoded = jwtDecode<TokenPayload>(newToken);
      
      if (decoded.exp * 1000 < Date.now()) {
        throw new Error('Token expired');
      }

      localStorage.setItem('auth_token', newToken);
      setToken(newToken);
      await fetchUserData(decoded.userId, newToken);
    } catch (error) {
      localStorage.removeItem('auth_token');
      setToken(null);
      setUser(null);
      throw new Error('Invalid authentication token');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
  };

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center h-screen flex-col md:flex-row bg-zinc-50 dark:bg-zinc-950">
        <div className="p-1.5 bg-linear-to-br from-indigo-500 to-purple-500 rounded-lg shadow-xs animate-spin">
          <LayoutGrid className="w-5 h-5 text-white" />
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthProvider;
