// src/contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

// 1. Tipagem atualizada para refletir o que a sua API retorna
interface User {
  id: number;
  nome: string;
  email: string;
  tenantId: number;
}

// 2. Adição da função de logout no contexto
interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => void; 
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 3. Substituímos o onAuthStateChanged do Firebase por uma verificação no localStorage
    const token = localStorage.getItem('@App:token');
    const storedUser = localStorage.getItem('@App:user');
    const storedTenantId = localStorage.getItem('@App:tenantId');

    if (token && storedUser && storedTenantId) {
      try {
        const parsedUser = JSON.parse(storedUser);
        
        // Reconstrói o objeto do usuário com o tenantId
        setUser({
          id: parsedUser.id,
          nome: parsedUser.nome,
          email: parsedUser.email,
          tenantId: Number(storedTenantId)
        });
      } catch (error) {
        console.error("Erro ao ler os dados do usuário:", error);
        // Se os dados estiverem corrompidos, limpamos a sessão por segurança
        logout();
      }
    }
    
    // Como a leitura do localStorage é síncrona e rápida, finalizamos o loading imediatamente
    setLoading(false); 
  }, []);

  // 4. Função utilitária para limpar a sessão em qualquer lugar do app
  const logout = () => {
    localStorage.removeItem('@App:token');
    localStorage.removeItem('@App:user');
    localStorage.removeItem('@App:tenantId');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};