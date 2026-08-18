import { useState } from 'react';
import paginaService from '../../services/paginaService';

interface CriarPaginaFormProps {
  tenantId: number;
  color: string;
  onCreated: () => void;
}

function slugify(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function CriarPaginaForm({ tenantId, color, onCreated }: CriarPaginaFormProps) {
  const [tituloPagina, setTituloPagina] = useState('');
  const [urlPublica, setUrlPublica] = useState('');
  const [urlEditadaManualmente, setUrlEditadaManualmente] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTituloChange = (v: string) => {
    setTituloPagina(v);
    if (!urlEditadaManualmente) setUrlPublica(slugify(v));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tituloPagina.trim() || !urlPublica.trim()) return;

    setLoading(true);
    setError(null);

    const res = await paginaService.create({ tenantId, urlPublica, tituloPagina });

    if (res.success) {
      onCreated();
    } else {
      setError(res.error ?? 'Não foi possível criar a página. Verifique se a URL já está em uso.');
    }
    setLoading(false);
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm p-6 md:p-10 text-center animate-fade-in-up">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
        style={{ backgroundColor: `${color}12` }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </div>

      <h3 className="font-display text-xl font-semibold text-slate-900 mb-1.5 tracking-tight">
        Crie sua primeira página
      </h3>
      <p className="text-slate-500 text-sm mb-7 max-w-sm mx-auto leading-relaxed">
        Antes de editar as seções do seu portfólio, você precisa criar a página pública que vai recebê-las.
      </p>

      <form onSubmit={handleSubmit} className="text-left max-w-sm mx-auto space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
            Título da página
          </label>
          <input
            type="text"
            value={tituloPagina}
            onChange={(e) => handleTituloChange(e.target.value)}
            placeholder="Ex: Portfólio da Ana Lima"
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-150 focus:ring-4"
            style={{ '--tw-ring-color': `${color}1a` } as React.CSSProperties}
            onFocus={(e) => (e.target.style.borderColor = color)}
            onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
            Endereço público
          </label>
          <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden transition-colors duration-150 focus-within:border-current" style={{ color }}>
            <span className="px-3 py-2.5 text-sm text-slate-400 bg-slate-50 border-r border-slate-200">/p/</span>
            <input
              type="text"
              value={urlPublica}
              onChange={(e) => {
                setUrlEditadaManualmente(true);
                setUrlPublica(slugify(e.target.value));
              }}
              placeholder="sua-url"
              className="flex-1 px-3 py-2.5 text-sm outline-none min-w-0 text-slate-800"
              required
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 px-3.5 py-2.5 rounded-xl animate-scale-in">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full text-white font-medium rounded-xl py-2.5 transition-all duration-150 active:scale-[0.98] disabled:opacity-70 hover:brightness-95 shadow-sm"
          style={{ backgroundColor: color, boxShadow: `0 2px 8px ${color}35` }}
        >
          {loading ? 'Criando...' : 'Criar página'}
        </button>
      </form>
    </div>
  );
}
