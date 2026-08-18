import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import accordionService from '../../services/accordionService';
import type { Accordion } from '../../types/accordion';
import type { SectionEditorHandle } from '../../types/section-editor';
import { FloatingField } from './Floatingfield';

interface FaqEditorProps {
  paginaId: number;
  color: string;
}

export const FaqEditor = forwardRef<SectionEditorHandle, FaqEditorProps>(function FaqEditor(
  { paginaId, color },
  ref
) {
  const [faqs, setFaqs] = useState<Accordion[]>([]);
  const [loadingInicial, setLoadingInicial] = useState(true);
  const [pergunta, setPergunta] = useState('');
  const [resposta, setResposta] = useState('');
  const [adicionando, setAdicionando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let ativo = true;
    (async () => {
      const res = await accordionService.getByPagina(paginaId);
      if (ativo && res.success && res.data) setFaqs(res.data);
      if (ativo) setLoadingInicial(false);
    })();
    return () => {
      ativo = false;
    };
  }, [paginaId]);

  useImperativeHandle(ref, () => ({ async save() {} }));

  const handleAdd = async () => {
    if (!pergunta.trim() || !resposta.trim()) return;
    setAdicionando(true);
    setErro(null);
    const res = await accordionService.create({ paginaId, perguntaTitulo: pergunta, respostaConteudo: resposta });
    if (res.success && res.data) {
      setFaqs((prev) => [...prev, res.data!]);
      setPergunta('');
      setResposta('');
    } else {
      setErro(res.error ?? 'Não foi possível adicionar a pergunta.');
    }
    setAdicionando(false);
  };

  const handleDelete = async (id: number) => {
    const res = await accordionService.delete(id);
    if (res.success) setFaqs((prev) => prev.filter((f) => f.id !== id));
    else setErro(res.error ?? 'Não foi possível excluir a pergunta.');
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
      {faqs.length > 0 && (
        <ul className="space-y-2">
          {faqs.map((f) => (
            <li
              key={f.id}
              className="group flex items-start justify-between gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-3.5 transition-all duration-150 hover:shadow-md hover:border-slate-300 animate-fade-in"
            >
              <div className="min-w-0">
                <p className="font-medium text-slate-800 text-sm">{f.perguntaTitulo}</p>
                <p className="text-slate-400 text-xs mt-0.5 line-clamp-2">{f.respostaConteudo}</p>
              </div>
              <button
                onClick={() => handleDelete(f.id)}
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
        <FloatingField label="Pergunta" value={pergunta} onChange={setPergunta} color={color} />
        <FloatingField label="Resposta" value={resposta} onChange={setResposta} color={color} multiline rows={2} />
        <button
          onClick={handleAdd}
          disabled={adicionando}
          className="w-full px-4 py-2.5 text-sm font-semibold text-white rounded-xl transition-all duration-150 active:scale-[0.97] disabled:opacity-60 disabled:active:scale-100"
          style={{ backgroundColor: color, boxShadow: `0 2px 10px ${color}30` }}
        >
          {adicionando ? 'Adicionando...' : '+ Adicionar pergunta'}
        </button>
      </div>

      {erro && <p className="text-sm text-red-600 bg-red-50 border border-red-100 px-3.5 py-2.5 rounded-xl">{erro}</p>}
    </div>
  );
});
