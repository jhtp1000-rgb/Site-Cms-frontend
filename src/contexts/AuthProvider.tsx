import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import apiService from '../services/api';

interface User {
  id: number;
  nome: string;
  email: string;
  tenantId: number;
  isAdmin: boolean;
}

interface LoginData {
  id: number;
  nome: string;
  email: string;
  token: string;
  tenantId: number;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

const USER_KEY = '@App:user';
const TENANT_ID_KEY = '@App:tenantId';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = apiService.getToken();
    const storedUser = localStorage.getItem(USER_KEY);
    const storedTenantId = localStorage.getItem(TENANT_ID_KEY);

    if (token && storedUser && storedTenantId) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser({
          id: parsed.id,
          nome: parsed.nome,
          email: parsed.email,
          tenantId: Number(storedTenantId),
          isAdmin: Boolean(parsed.isAdmin),
        });
      } catch {
        apiService.clearToken();
        setUser(null);
      }
    }

    setLoading(false);

    const handleExpired = () => setUser(null);
    window.addEventListener('auth-token-expired', handleExpired);
    return () => window.removeEventListener('auth-token-expired', handleExpired);
  }, []);

  const login = (data: LoginData) => {
    apiService.setToken(data.token);
    localStorage.setItem(TENANT_ID_KEY, data.tenantId.toString());
    localStorage.setItem(
      USER_KEY,
      JSON.stringify({ id: data.id, nome: data.nome, email: data.email, isAdmin: data.isAdmin })
    );
    setUser({
      id: data.id,
      nome: data.nome,
      email: data.email,
      tenantId: data.tenantId,
      isAdmin: data.isAdmin,
    });
  };

  const logout = () => {
    apiService.clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
