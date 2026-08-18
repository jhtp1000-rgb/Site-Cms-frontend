import { SECTION_LABELS, type PageLayoutSection, type SectionType } from '../../types/portfolio-layout';
import type { PortfolioViewModel } from '../../types/portfolio-view-model';
import { sectionHasData } from '../portfolio/PortfolioSectionRenderer';

interface SectionsPanelProps {
  secoes: PageLayoutSection[];
  viewModel: PortfolioViewModel;
  color: string;
  selectedSection: SectionType | null;
  onSelect: (tipo: SectionType) => void;
  onToggleVisibilidade: (tipo: SectionType) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function SectionsPanel({
  secoes,
  viewModel,
  color,
  selectedSection,
  onSelect,
  onToggleVisibilidade,
  isOpen,
  onClose,
}: SectionsPanelProps) {
  const ocultas = secoes.filter((s) => !s.visivel);

  const handleSelect = (tipo: SectionType) => {
    onSelect(tipo);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm md:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      <div
        className={`w-72 md:w-64 flex-shrink-0 bg-white md:bg-white/60 md:backdrop-blur-xl border-r border-slate-200/70 p-4 overflow-y-auto
          fixed md:static inset-y-0 left-0 z-40 transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="flex items-center justify-between mb-3 md:mb-3">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">Seções</h3>
          <button
            onClick={onClose}
            className="md:hidden w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
            aria-label="Fechar"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <ul className="space-y-1">
          {secoes.map((secao, i) => {
            const temDado = sectionHasData(secao.tipo, viewModel);
            const isSelected = selectedSection === secao.tipo;

            let statusLabel = 'Visível';
            let statusColor = color;
            if (!secao.visivel) {
              statusLabel = 'Oculta';
              statusColor = '#94a3b8';
            } else if (!temDado) {
              statusLabel = 'Vazia';
              statusColor = '#d97706';
            }

            return (
              <li key={secao.tipo} className={`animate-fade-in-up delay-${Math.min(i + 1, 4)}`}>
                <button
                  onClick={() => handleSelect(secao.tipo)}
                  className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-left text-sm transition-all duration-150"
                  style={
                    isSelected
                      ? { backgroundColor: `${color}12`, color, fontWeight: 600 }
                      : { color: '#475569' }
                  }
                >
                  <span className="truncate">{SECTION_LABELS[secao.tipo]}</span>
                  <span
                    className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-md flex-shrink-0 tracking-wide"
                    style={{ backgroundColor: `${statusColor}15`, color: statusColor }}
                  >
                    {statusLabel}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {ocultas.length > 0 && (
          <div className="mt-7 animate-fade-in-up">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
              Adicionar seção
            </h4>
            <p className="text-xs text-slate-400 mb-2.5 px-1">
              Reative uma seção oculta para voltar a exibi-la.
            </p>
            <ul className="space-y-1.5">
              {ocultas.map((secao) => (
                <li key={secao.tipo}>
                  <button
                    onClick={() => onToggleVisibilidade(secao.tipo)}
                    className="w-full text-left px-3 py-2.5 text-sm rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-50 border border-dashed border-slate-200 hover:border-slate-300 transition-all duration-150"
                  >
                    + {SECTION_LABELS[secao.tipo]}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
