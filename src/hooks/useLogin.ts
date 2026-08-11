// src/hooks/useLogin.ts
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginResponse {
  id: number;
  nome: string;
  email: string;
  token: string;
  tenantId: number;
}

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, senha: string) => {
    setLoading(true);
    setError(null);

    try {
      // Puxa a URL base da API configurada no .env (ex: VITE_API_URL=http://localhost:3000)
      const apiUrl = import.meta.env.VITE_API_URL || ''; 
      
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Mapeia os parâmetros da forma que a API espera
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        throw new Error('E-mail ou senha incorretos.');
      }

      const data: LoginResponse = await response.json();

      // Guardamento de token e informações essenciais no localStorage
      localStorage.setItem('@App:token', data.token);
      localStorage.setItem('@App:tenantId', data.tenantId.toString());
      localStorage.setItem('@App:user', JSON.stringify({ id: data.id, nome: data.nome, email: data.email }));

      // Redireciona para o painel após o sucesso
      navigate('/dashboard'); 
      
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro de conexão.');
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}