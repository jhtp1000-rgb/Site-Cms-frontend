import { useState } from 'react';
import { useAuthForm } from '../../hooks/useAuthForm';

export default function Login() {
  const { 
    isLogin, loading, error, formData, handleChange, toggleMode, handleSubmit 
  } = useAuthForm();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="max-h-screen bg-slate-50 flex items-center justify-center p-4">
      
      <div className="bg-white max-h-screen w-full max-w-md rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
        
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 bg-[#00966D] text-white rounded flex items-center justify-center font-bold">
            A
          </div>
          <span className="font-bold text-slate-800 text-lg">
            analima.<span className="text-[#00966D]">digital</span>
          </span>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">
            {isLogin ? 'Entrar na sua conta' : 'Criar sua conta'}
          </h1>
          <p className="text-slate-500 text-sm">
            {isLogin ? 'Acesse o painel da sua plataforma' : 'Comece agora, grátis por 14 dias'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nome completo</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ana Lima"
                className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#00966D] transition-colors"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#00966D] transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={isLogin ? "••••••••" : "Mín. 8 caracteres"}
                className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#00966D] transition-colors"
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

          {isLogin ? (
            <div className="flex justify-end">
              <a href="#" className="text-sm text-[#00966D] hover:underline font-medium">
                Esqueci minha senha
              </a>
            </div>
          ) : (
            <div className="bg-[#e8f7f2] p-3 rounded-lg flex items-start gap-2 mt-2">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="mt-1 accent-[#00966D]"
              />
              <span className="text-sm text-[#006b4d]">
                Concordo com os <strong>Termos de Uso</strong> e <strong>Política de Privacidade</strong>
              </span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00966D] hover:bg-[#007a58] text-white font-medium rounded-lg py-3 mt-4 transition-colors disabled:opacity-70"
          >
            {loading 
              ? 'Processando...' 
              : (isLogin ? 'Entrar' : 'Criar conta grátis')
            }
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-500">
          {isLogin ? (
            <>
              Não tem uma conta?{' '}
              <button onClick={toggleMode} className="text-[#00966D] font-bold hover:underline">
                Criar conta
              </button>
            </>
          ) : (
            <>
              Já tem uma conta?{' '}
              <button onClick={toggleMode} className="text-[#00966D] font-bold hover:underline">
                Entrar
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}