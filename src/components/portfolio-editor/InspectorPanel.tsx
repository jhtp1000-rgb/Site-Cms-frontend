import { useRef, useState } from 'react';
import { BiografiaEditor } from '../../pages/PortfolioEditor/BiografiaEditor';
import { ContatosEditor } from '../../pages/PortfolioEditor/ContatosEditor';
import { FaqEditor } from '../../pages/PortfolioEditor/FaqEditor';
import { CtasEditor } from '../../pages/PortfolioEditor/CtasEditor';
import { CarrosselEditor } from '../../pages/PortfolioEditor/CarrosselEditor';
import { DepoimentosEditor } from '../../pages/PortfolioEditor/DepoimentosEditor';
import { SECTION_LABELS, type SectionType } from '../../types/portfolio-layout';
import type { SectionEditorHandle } from '../../types/section-editor';

interface InspectorPanelProps {
  tipo: SectionType;
  paginaId: number;
  tenantId: number;
  color: string;
  onClose: () => void;
  onSaved: () => void;
}

export function InspectorPanel({ tipo, paginaId, tenantId, color, onClose, onSaved }: InspectorPanelProps) {
  const ref = useRef<SectionEditorHandle>(null);
  const [saving, setSaving] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleClose = async () => {
    if (tipo === 'HERO' && ref.current) {
      try {
        setSaving(true);
        setErro(null);
        await ref.current.save();
        onSaved();
      } catch {
        setErro('Não foi possível salvar. Tente novamente.');
        return;
      } finally {
        setSaving(false);
      }
    } else {
      onSaved();
    }
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden animate-fade-in"
        onClick={onClose}
      />

      <div
        className="fixed md:static inset-y-0 right-0 z-50
          w-full md:w-[26rem] md:flex-shrink-0
          bg-white md:bg-white/95 md:backdrop-blur-xl
          border-l border-slate-200/70 flex flex-col md:h-fit
          shadow-[-8px_0_30px_rgba(15,23,42,0.08)] md:shadow-[-8px_0_30px_rgba(15,23,42,0.04)]
          animate-fade-in-up"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Editando</p>
            <h3 className="font-display font-semibold text-slate-900 text-[17px] tracking-tight">
              {SECTION_LABELS[tipo]}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all duration-150"
            aria-label="Fechar"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {tipo === 'HERO' && <BiografiaEditor ref={ref} paginaId={paginaId} tenantId={tenantId} color={color} />}
          {tipo === 'PORTFOLIO' && <CarrosselEditor ref={ref} paginaId={paginaId} color={color} />}
          {tipo === 'CARDS_CTA' && <CtasEditor ref={ref} paginaId={paginaId} color={color} />}
          {tipo === 'DEPOIMENTOS' && <DepoimentosEditor ref={ref} paginaId={paginaId} color={color} />}
          {tipo === 'FAQ' && <FaqEditor ref={ref} paginaId={paginaId} color={color} />}
          {tipo === 'CONTATO' && <ContatosEditor ref={ref} paginaId={paginaId} color={color} />}
        </div>

        {erro && (
          <div className="px-5 py-3">
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 px-3.5 py-2.5 rounded-xl animate-scale-in">
              {erro}
            </p>
          </div>
        )}

        <div className="px-5 py-4 border-t border-slate-100">
          <button
            onClick={handleClose}
            disabled={saving}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-150 active:scale-[0.98] disabled:opacity-60"
            style={{ backgroundColor: color, boxShadow: `0 2px 10px ${color}35` }}
          >
            {saving ? 'Salvando...' : 'Concluir edição'}
          </button>
        </div>
      </div>
    </>
  );
}
