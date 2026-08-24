import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import botaoCtaService from '../../services/botaoCtaService';
import cardCtaService from '../../services/cardCtaService';
import type { BotaoCta } from '../../types/botaoCta';
import type { CardCta } from '../../types/cardCta';
import type { SectionEditorHandle } from '../../types/section-editor';
import { FloatingField } from './Floatingfield';

interface CtasEditorProps {
  paginaId: number;
  color: string;
}

function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all duration-150 opacity-0 group-hover:opacity-100"
      aria-label="Excluir"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    </button>
  );
}

export const CtasEditor = forwardRef<SectionEditorHandle, CtasEditorProps>(function CtasEditor(
  { paginaId, color },
  ref
) {
  const [botoes, setBotoes] = useState<BotaoCta[]>([]);
  const [cards, setCards] = useState<CardCta[]>([]);
  const [loadingInicial, setLoadingInicial] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const [textoBotao, setTextoBotao] = useState('');
  const [linkBotao, setLinkBotao] = useState('');
  const [addingBotao, setAddingBotao] = useState(false);

  const [urlImagem, setUrlImagem] = useState('');
  const [textoCard, setTextoCard] = useState('');
  const [linkCard, setLinkCard] = useState('');
  const [addingCard, setAddingCard] = useState(false);

  useEffect(() => {
    let ativo = true;
    (async () => {
      const [resBotoes, resCards] = await Promise.all([
        botaoCtaService.getByPagina(paginaId),
        cardCtaService.getByPagina(paginaId),
      ]);
      if (ativo) {
        if (resBotoes.success && resBotoes.data) setBotoes(resBotoes.data);
        if (resCards.success && resCards.data) setCards(resCards.data);
        setLoadingInicial(false);
      }
    })();
    return () => {
      ativo = false;
    };
  }, [paginaId]);

  useImperativeHandle(ref, () => ({ async save() {} }));

  const handleAddBotao = async () => {
    if (!textoBotao.trim() || !linkBotao.trim()) return;
    setAddingBotao(true);
    setErro(null);
    const res = await botaoCtaService.create({ paginaId, textoExibicao: textoBotao, linkDestino: linkBotao });
    if (res.success && res.data) {
      setBotoes((prev) => [...prev, res.data!]);
      setTextoBotao('');
      setLinkBotao('');
    } else {
      setErro(res.error ?? 'Não foi possível adicionar o botão.');
    }
    setAddingBotao(false);
  };

  const handleDeleteBotao = async (id: number) => {
    const res = await botaoCtaService.delete(id);
    if (res.success) setBotoes((prev) => prev.filter((b) => b.id !== id));
    else setErro(res.error ?? 'Não foi possível excluir o botão.');
  };

  const handleAddCard = async () => {
    if (!textoCard.trim() || !linkCard.trim()) return;
    setAddingCard(true);
    setErro(null);
    const res = await cardCtaService.create({ paginaId, urlImagem, textoDestaque: textoCard, linkDestino: linkCard });
    if (res.success && res.data) {
      setCards((prev) => [...prev, res.data!]);
      setUrlImagem('');
      setTextoCard('');
      setLinkCard('');
    } else {
      setErro(res.error ?? 'Não foi possível adicionar o card.');
    }
    setAddingCard(false);
  };

  const handleDeleteCard = async (id: number) => {
    const res = await cardCtaService.delete(id);
    if (res.success) setCards((prev) => prev.filter((c) => c.id !== id));
    else setErro(res.error ?? 'Não foi possível excluir o card.');
  };

  if (loadingInicial) {
    return (
      <div className="p-5 md:p-6 bg-slate-50/50 border-t border-slate-100">
        <div className="w-full h-16 rounded-2xl skeleton-shimmer" />
      </div>
    );
  }

  return (
    <div className="p-5 md:p-6 bg-slate-50/50 border-t border-slate-100 space-y-6">
      <div className="space-y-2.5">
        <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">Botões de ação rápida</h4>

        {botoes.length > 0 && (
          <ul className="space-y-2">
            {botoes.map((b) => (
              <li
                key={b.id}
                className="group flex items-center justify-between gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-3 transition-all duration-150 hover:shadow-md hover:border-slate-300 animate-fade-in"
              >
                <div className="min-w-0">
                  <p className="font-medium text-slate-800 text-sm truncate">{b.textoExibicao}</p>
                  <p className="text-slate-400 text-xs truncate">{b.linkDestino}</p>
                </div>
                <DeleteButton onClick={() => handleDeleteBotao(b.id)} />
              </li>
            ))}
          </ul>
        )}

        <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-4 space-y-2.5">
          <FloatingField label="Texto (ex: Ver serviços)" value={textoBotao} onChange={setTextoBotao} color={color} />
          <FloatingField label="Link (https://...)" value={linkBotao} onChange={setLinkBotao} color={color} />
          <button
            onClick={handleAddBotao}
            disabled={addingBotao}
            className="w-full px-4 py-2.5 text-sm font-semibold text-white rounded-xl transition-all duration-150 active:scale-[0.97] disabled:opacity-60 disabled:active:scale-100"
            style={{ backgroundColor: color, boxShadow: `0 2px 10px ${color}30` }}
          >
            {addingBotao ? 'Adicionando...' : '+ Adicionar botão'}
          </button>
        </div>
      </div>

      <hr className="border-slate-200" />

      <div className="space-y-2.5">
        <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">Cards de destaque (banners)</h4>

        {cards.length > 0 && (
          <ul className="space-y-2">
            {cards.map((c) => (
              <li
                key={c.id}
                className="group flex items-center gap-3 bg-white border border-slate-200 rounded-2xl p-2.5 transition-all duration-150 hover:shadow-md hover:border-slate-300 animate-fade-in"
              >
                {c.urlImagem ? (
                  <img src={c.urlImagem} alt="" className="w-12 h-12 object-cover rounded-xl flex-shrink-0 ring-1 ring-slate-200" />
                ) : (
                  <div className="w-12 h-12 rounded-xl flex-shrink-0 bg-slate-100" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-slate-800 text-sm truncate">{c.textoDestaque}</p>
                  <p className="text-slate-400 text-xs truncate">{c.linkDestino}</p>
                </div>
                <DeleteButton onClick={() => handleDeleteCard(c.id)} />
              </li>
            ))}
          </ul>
        )}

        <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-4 space-y-2.5">
          <FloatingField label="URL da imagem de fundo" value={urlImagem} onChange={setUrlImagem} color={color} />
          <FloatingField label="Texto de destaque" value={textoCard} onChange={setTextoCard} color={color} />
          <FloatingField label="Link (https://...)" value={linkCard} onChange={setLinkCard} color={color} />
          <button
            onClick={handleAddCard}
            disabled={addingCard}
            className="w-full px-4 py-2.5 text-sm font-semibold text-white rounded-xl transition-all duration-150 active:scale-[0.97] disabled:opacity-60 disabled:active:scale-100"
            style={{ backgroundColor: color, boxShadow: `0 2px 10px ${color}30` }}
          >
            {addingCard ? 'Adicionando...' : '+ Adicionar card'}
          </button>
        </div>
      </div>

      {erro && <p className="text-sm text-red-600 bg-red-50 border border-red-100 px-3.5 py-2.5 rounded-xl">{erro}</p>}
    </div>
  );
});
