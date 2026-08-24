import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import contatoService from '../../services/contatoService';
import type { Contato } from '../../types/contato';
import type { SectionEditorHandle } from '../../types/section-editor';
import { FloatingField } from './FloatingField';

interface ContatosEditorProps {
  paginaId: number;
  color: string;
}

const TIPOS = [
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'email', label: 'E-mail' },
  { value: 'telefone', label: 'Telefone' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'outro', label: 'Outro' },
];

export const ContatosEditor = forwardRef<SectionEditorHandle, ContatosEditorProps>(
  function ContatosEditor({ paginaId, color }, ref) {
    const [contatos, setContatos] = useState<Contato[]>([]);
    const [loadingInicial, setLoadingInicial] = useState(true);
    const [tipo, setTipo] = useState('whatsapp');
    const [valor, setValor] = useState('');
    const [adicionando, setAdicionando] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
      let ativo = true;
      (async () => {
        const res = await contatoService.getByPagina(paginaId);
        if (ativo && res.success && res.data) setContatos(res.data);
        if (ativo) setLoadingInicial(false);
      })();
      return () => {
        ativo = false;
      };
    }, [paginaId]);

    useImperativeHandle(ref, () => ({ async save() {} }));

    const handleAdd = async () => {
      if (!valor.trim()) return;
      setAdicionando(true);
      setErro(null);
      const res = await contatoService.create({ paginaId, tipoContato: tipo, valorContato: valor });
      if (res.success && res.data) {
        setContatos((prev) => [...prev, res.data!]);
        setValor('');
      } else {
        setErro(res.error ?? 'Não foi possível adicionar o contato.');
      }
      setAdicionando(false);
    };

    const handleDelete = async (id: number) => {
      const res = await contatoService.delete(id);
      if (res.success) setContatos((prev) => prev.filter((c) => c.id !== id));
      else setErro(res.error ?? 'Não foi possível excluir o contato.');
    };

    if (loadingInicial) {
      return (
        <div className="p-5 md:p-6 bg-slate-50/50 border-t border-slate-100">
          <div className="w-full h-16 rounded-2xl skeleton-shimmer" />
        </div>
      );
    }

    return (
      <div className="p-5 md:p-6 bg-slate-50/50 border-t border-slate-100 space-y-4">
        {contatos.length > 0 && (
          <ul className="space-y-2">
            {contatos.map((c) => (
              <li
                key={c.id}
                className="group flex items-center justify-between gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-3 transition-all duration-150 hover:shadow-md hover:border-slate-300 animate-fade-in"
              >
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{c.tipoContato}</span>
                  <p className="font-medium text-slate-800 text-sm truncate">{c.valorContato}</p>
                </div>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all duration-150 opacity-0 group-hover:opacity-100"
                  aria-label="Excluir"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-4 space-y-2.5">
          <div className="flex flex-wrap gap-1.5">
            {TIPOS.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setTipo(t.value)}
                className="px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-150"
                style={
                  tipo === t.value
                    ? { backgroundColor: color, color: '#fff' }
                    : { backgroundColor: '#f1f5f9', color: '#64748b' }
                }
              >
                {t.label}
              </button>
            ))}
          </div>
          <FloatingField label="Valor (ex: (11) 99999-9999)" value={valor} onChange={setValor} color={color} />
          <button
            onClick={handleAdd}
            disabled={adicionando}
            className="w-full px-4 py-2.5 text-sm font-semibold text-white rounded-xl transition-all duration-150 active:scale-[0.97] disabled:opacity-60 disabled:active:scale-100"
            style={{ backgroundColor: color, boxShadow: `0 2px 10px ${color}30` }}
          >
            {adicionando ? 'Adicionando...' : '+ Adicionar contato'}
          </button>
        </div>

        {erro && <p className="text-sm text-red-600 bg-red-50 border border-red-100 px-3.5 py-2.5 rounded-xl">{erro}</p>}
      </div>
    );
  }
);
