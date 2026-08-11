// src/pages/Login.tsx
import React, { useState } from 'react';
import { useLogin } from '../../hooks/useLogin'; // Importa o hook

interface LoginProps {
  // Propriedades visuais do tenant mantidas[cite: 8]
  color?: string;
  tenantName?: string;
  tenantPortfolioName?: string;
}

export default function Login({
  color = '#00966D',
  tenantName = 'Ana Lima',
  tenantPortfolioName = 'analima.digital'
}: LoginProps) {
  // Consome a lógica de negócio do Hook
  const { login, loading, error } = useLogin();

  // Estados locais apenas para controle dos inputs[cite: 8]
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Lógica para colorir a extensão do domínio se houver um "."[cite: 8]
  const nameParts = tenantPortfolioName.split('.');
  const nameMain = nameParts[0];
  const nameExtension = nameParts.length > 1 ? `.${nameParts.slice(1).join('.')}` : '';

  // Intercepta o envio do form e aciona o Hook passando os dados[cite: 8]
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password); // Dispara a chamada de API
  };

  return (
    // min-h-screen garante que a tela ocupe toda a altura sem cortar o conteúdo[cite: 8]
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      
      <div className="bg-white w-full max-w-md rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
        
        {/* Header / Logo Dinâmico[cite: 8] */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div 
            className="w-8 h-8 text-white rounded flex items-center justify-center font-bold uppercase"
            style={{ backgroundColor: color }}
          >
            {tenantName.charAt(0)}
          </div>
          <span className="font-bold text-slate-800 text-lg">
            {nameMain}
            {nameExtension && (
              <span style={{ color: color }}>{nameExtension}</span>
            )}
          </span>
        </div>

        {/* Títulos[cite: 8] */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">
            Entrar na sua conta
          </h1>
          <p className="text-slate-500 text-sm">
            Acesse o painel da sua plataforma
          </p>
        </div>

        {/* Mensagem de Erro[cite: 8] */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 text-center">
            {error}
          </div>
        )}

        {/* Formulário[cite: 8] */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none transition-colors"
              onFocus={(e) => e.target.style.borderColor = color}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none transition-colors"
                onFocus={(e) => e.target.style.borderColor = color}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <a href="#" className="text-sm hover:underline font-medium" style={{ color: color }}>
              Esqueci minha senha
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white font-medium rounded-lg py-3 mt-4 transition-colors disabled:opacity-70 hover:brightness-90"
            style={{ backgroundColor: color }}
          >
            {loading ? 'Processando...' : 'Entrar'}
          </button>
        </form>

      </div>
    </div>
  );
}