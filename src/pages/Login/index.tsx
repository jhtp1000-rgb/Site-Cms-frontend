import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';
import authService from '../../services/authService';
import usuarioService from '../../services/usuarioService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login: setSession } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await authService.login({ email, senha });

    if (!res.success || !res.data) {
      setError(res.error ?? 'E-mail ou senha incorretos.');
      setLoading(false);
      return;
    }

    let isAdmin = false;
    const resUsuarios = await usuarioService.getAll();
    if (resUsuarios.success && resUsuarios.data) {
      const atual = resUsuarios.data.find((u) => u.email === res.data!.email);
      isAdmin = atual?.isAdmin ?? false;
    }

    setSession({ ...res.data, isAdmin });
    navigate('/dashboard');
    setLoading(false);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-slate-50 px-4 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 w-[32rem] h-[32rem] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #059669, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 w-[28rem] h-[28rem] rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #0F172A, transparent 70%)' }}
      />

      <div className="w-full max-w-sm bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_8px_40px_rgba(15,23,42,0.08)] border border-slate-100 p-8 relative animate-fade-in-up">
        <div className="flex items-center gap-2.5 mb-8 animate-fade-in-up delay-1">
          <div className="w-9 h-9 rounded-xl bg-[#059669] text-white font-display font-bold flex items-center justify-center text-base shadow-sm shadow-emerald-500/30">
            CMS
          </div>
          <span className="font-display font-semibold text-slate-800 tracking-tight">
            site<span className="text-[#059669]">.cms</span>
          </span>
        </div>

        <div className="animate-fade-in-up delay-2">
          <h1 className="font-display text-[28px] leading-tight font-semibold text-[#0F172A] mb-1.5 tracking-tight">
            Bem-vindo de volta
          </h1>
          <p className="text-slate-500 text-sm mb-7">Acesse o painel da sua plataforma</p>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 px-3.5 py-2.5 rounded-xl mb-5 animate-scale-in">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in-up delay-3">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none transition-all duration-150 focus:border-[#059669] focus:ring-4 focus:ring-emerald-500/10"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none transition-all duration-150 focus:border-[#059669] focus:ring-4 focus:ring-emerald-500/10"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#059669] text-white font-medium rounded-xl py-2.5 shadow-sm shadow-emerald-500/25 transition-all duration-150 hover:bg-[#047857] hover:shadow-md hover:shadow-emerald-500/30 active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 mt-1"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Entrando...
              </span>
            ) : (
              'Entrar'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
