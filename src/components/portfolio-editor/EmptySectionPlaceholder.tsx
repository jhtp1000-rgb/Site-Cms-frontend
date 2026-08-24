import { SECTION_LABELS, type SectionType } from '../../types/portfolio-layout';

interface EmptySectionPlaceholderProps {
  tipo: SectionType;
  onClick: () => void;
}

export function EmptySectionPlaceholder({ tipo, onClick }: EmptySectionPlaceholderProps) {
  return (
    <div className="p-4">
      <button
        type="button"
        onClick={onClick}
        className="block w-full rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/60 px-6 py-12 text-center cursor-pointer transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-0.5"
      >
        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-3.5 text-slate-400">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
        <p className="font-display font-semibold text-slate-700 text-[15px] mb-1">
          {SECTION_LABELS[tipo]}
        </p>
        <p className="text-[13px] text-slate-400">Sem conteúdo ainda — clique para adicionar</p>
      </button>
    </div>
  );
}
