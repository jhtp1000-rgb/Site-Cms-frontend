import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SECTION_LABELS, type PageLayoutSection, type SectionType } from '../../types/portfolio-layout';
import type { PortfolioViewModel } from '../../types/portfolio-view-model';
import { sectionHasData } from '../portfolio/PortfolioSectionRenderer';

interface AsideMenuTenantProps {
  color: string;
  isOpen: boolean;
  onClose: () => void;
  // Opcionais — só existem quando já há uma página criada, com layout
  // carregado. Sem eles, "Painel de Edição" fica sem o acordeão.
  secoes?: PageLayoutSection[];
  viewModel?: PortfolioViewModel;
  selectedSection?: SectionType | null;
  onSelectSection?: (tipo: SectionType) => void;
  onToggleVisibilidade?: (tipo: SectionType) => void;
}

const dashboardIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const assinaturaIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
    <line x1="1" y1="10" x2="23" y2="10"></line>
  </svg>
);

const chevronIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

export default function AsideMenuTenant({
  color,
  isOpen,
  onClose,
  secoes,
  viewModel,
  selectedSection,
  onSelectSection,
  onToggleVisibilidade,
}: AsideMenuTenantProps) {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [secoesExpanded, setSecoesExpanded] = useState(true);

  const temSecoes = Boolean(secoes && secoes.length > 0 && viewModel);

  const fecharNoMobile = () => {
    if (window.innerWidth < 768) onClose();
  };

  const handleDashboardClick = () => {
    setActiveItem('dashboard');
    if (temSecoes) {
      setSecoesExpanded((v) => !v);
    } else {
      fecharNoMobile();
    }
  };

  const handleSelectSecao = (tipo: SectionType, visivel: boolean) => {
    // Selecionar uma seção oculta já a reativa — evita um segundo passo
    // separado só pra "mostrar" antes de poder editar/pré-visualizar.
    if (!visivel) onToggleVisibilidade?.(tipo);
    onSelectSection?.(tipo);
    fecharNoMobile();
  };

  const itemClass = (id: string) =>
    `group flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 outline-none w-full ${
      activeItem === id
        ? 'text-slate-900'
        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
    }`;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white/70 backdrop-blur-xl border-r border-slate-200/70 flex flex-col h-[calc(100vh-4rem)] transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0 mt-16 md:mt-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <nav className="flex-1 overflow-y-auto p-3.5">
          <ul className="flex flex-col gap-1">
            <li>
              <button
                type="button"
                onClick={handleDashboardClick}
                className={itemClass('dashboard')}
                style={activeItem === 'dashboard' ? { backgroundColor: `${color}12` } : undefined}
              >
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-150"
                  style={{
                    backgroundColor: activeItem === 'dashboard' ? color : 'transparent',
                    color: activeItem === 'dashboard' ? '#fff' : undefined,
                  }}
                >
                  {dashboardIcon}
                </span>
                <span className="flex-1 text-left">Painel de Edição</span>
                {temSecoes && (
                  <span
                    className="flex-shrink-0 text-slate-400 transition-transform duration-200"
                    style={{ transform: secoesExpanded ? 'rotate(0deg)' : 'rotate(180deg)' }}
                  >
                    {chevronIcon}
                  </span>
                )}
              </button>

              {temSecoes && secoesExpanded && (
                <ul className="mt-1.5 ml-3.5 pl-3.5 border-l border-slate-200 flex flex-col gap-0.5 animate-fade-in">
                  {[...secoes!]
                    .sort((a, b) => a.ordem - b.ordem)
                    .map((secao) => {
                      const temDado = sectionHasData(secao.tipo, viewModel!);
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
                        <li key={secao.tipo}>
                          <button
                            type="button"
                            onClick={() => handleSelectSecao(secao.tipo, secao.visivel)}
                            className="w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg text-left text-[13px] transition-colors duration-150"
                            style={
                              isSelected
                                ? { backgroundColor: `${color}12`, color, fontWeight: 600 }
                                : { color: '#64748b' }
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
              )}
            </li>

            <li>
              <Link
                to="/admin/assinatura"
                onClick={() => {
                  setActiveItem('assinatura');
                  fecharNoMobile();
                }}
                className={itemClass('assinatura')}
                style={activeItem === 'assinatura' ? { backgroundColor: `${color}12` } : undefined}
              >
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-150"
                  style={{
                    backgroundColor: activeItem === 'assinatura' ? color : 'transparent',
                    color: activeItem === 'assinatura' ? '#fff' : undefined,
                  }}
                >
                  {assinaturaIcon}
                </span>
                <span>Assinatura</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}