import { useState, useEffect, useCallback } from 'react';
import TenantHeader from '../../components/Layout/TenantHeader';
import AsideMenuTenant from '../../components/Layout/AsideMenuTenant';
import GeneralInfoTenant from '../../components/Layout/GeneralInfoTenant';
import { CriarPaginaForm } from './CriarPaginaForm';
import { PublicLinkBanner } from './PublicLinkBanner';
import { VisualPortfolioEditor } from '../../components/portfolio-editor/VisualPortfolioEditor';
import { useAuth } from '../../contexts/AuthProvider';
import { usePageLayout } from '../../hooks/usePageLayout';
import paginaService from '../../services/paginaService';
import biografiaService from '../../services/biografiaService';
import contatoService from '../../services/contatoService';
import accordionService from '../../services/accordionService';
import botaoCtaService from '../../services/botaoCtaService';
import cardCtaService from '../../services/cardCtaService';
import feedbackService from '../../services/feedbackService';
import carrosselService from '../../services/carrosselService';
import tenantService from '../../services/tenantService';
import type { PortfolioViewModel } from '../../types/portfolio-view-model';
import type { SectionType } from '../../types/portfolio-layout';

interface TenantData {
  color: string;
  tenantName: string;
  tenantPortfolioName: string;
  assinatura: 'pro' | 'premium' | 'free';
  stats: { activeSections: number; totalSections: number; lastEdit: string; views: string | number };
}

function formatarData(iso: string): string {
  try {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(iso));
  } catch {
    return iso;
  }
}

export default function PortfolioEditor() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<SectionType | null>(null);
  const { user } = useAuth();

  const [tenantData, setTenantData] = useState<TenantData | null>(null);
  const [paginaId, setPaginaId] = useState<number | null>(null);
  const [viewModel, setViewModel] = useState<PortfolioViewModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const layout = usePageLayout(paginaId);

  const carregarDados = useCallback(async () => {
    if (!user?.tenantId) return;
    setLoading(true);
    setError(null);

    const resPaginas = await paginaService.getByTenant(user.tenantId);
    if (!resPaginas.success || !resPaginas.data) {
      setError(resPaginas.error ?? 'Falha ao buscar as páginas do tenant.');
      setLoading(false);
      return;
    }

    if (resPaginas.data.length === 0) {
      setTenantData({
        color: '#00966D',
        tenantName: user.nome,
        tenantPortfolioName: 'Sua página ainda não foi criada',
        assinatura: 'free',
        stats: { activeSections: 0, totalSections: 6, lastEdit: '—', views: 0 },
      });
      setPaginaId(null);
      setViewModel(null);
      setLoading(false);
      return;
    }

    const pagina = resPaginas.data[0];
    setPaginaId(pagina.id);

    const [biografia, contatos, accordions, botoesCta, cardsCta, feedbacks, carrosseis, tenantInfo] = await Promise.all([
      biografiaService.getByPagina(pagina.id),
      contatoService.getByPagina(pagina.id),
      accordionService.getByPagina(pagina.id),
      botaoCtaService.getByPagina(pagina.id),
      cardCtaService.getByPagina(pagina.id),
      feedbackService.getByPagina(pagina.id),
      carrosselService.getByPagina(pagina.id),
      tenantService.getById(user.tenantId),
    ]);

    const listaContatos = contatos.data ?? [];
    const listaBotoesCta = botoesCta.data ?? [];
    const listaCardsCta = cardsCta.data ?? [];
    const listaAccordions = accordions.data ?? [];
    const listaFeedbacks = feedbacks.data ?? [];
    const imagensCarrossel = (carrosseis.data ?? []).flatMap((c) => c.imagens ?? []);
    const nomeExibicao = tenantInfo.data?.nome ?? user.nome;

    const sections = [
      {
        id: 'dashboard',
        temConteudo: Boolean(biografia.data?.conteudoTexto),
        label: 'Hero / Apresentação',
        desc: 'Foto, nome, título e bio principal',
      },
      {
        id: 'carrossel',
        temConteudo: imagensCarrossel.length > 0,
        label: 'Carrossel de Projetos',
        desc: `${imagensCarrossel.length} projeto(s) no portfólio`,
      },
      {
        id: 'ctas',
        temConteudo: listaBotoesCta.length > 0 || listaCardsCta.length > 0,
        label: 'Botões de Ação (CTAs)',
        desc: `${listaBotoesCta.length} botão(ões) + ${listaCardsCta.length} card(s)`,
      },
      {
        id: 'faq',
        temConteudo: listaAccordions.length > 0,
        label: 'Perguntas Frequentes',
        desc: `${listaAccordions.length} pergunta(s) cadastrada(s)`,
      },
      {
        id: 'contatos',
        temConteudo: listaContatos.length > 0,
        label: 'Contatos',
        desc: `${listaContatos.length} canal(is) de contato`,
      },
      {
        id: 'depoimentos',
        temConteudo: listaFeedbacks.length > 0,
        label: 'Depoimentos',
        desc: `${listaFeedbacks.length} avaliação(ões) de clientes`,
      },
    ];

    const ativas = sections.filter((s) => s.temConteudo).length;

    setTenantData({
      color: '#00966D',
      tenantName: user.nome,
      tenantPortfolioName: pagina.urlPublica,
      assinatura: 'pro',
      stats: {
        activeSections: ativas,
        totalSections: sections.length,
        lastEdit: formatarData(pagina.dataCriacao),
        views: 0,
      },
    });

    setViewModel({
      paginaId: pagina.id,
      tituloPagina: pagina.tituloPagina,
      nomeTenant: nomeExibicao,
      bio: biografia.data?.conteudoTexto ?? null,
      contatos: listaContatos,
      botoesCta: listaBotoesCta,
      cardsCta: listaCardsCta,
      imagensCarrossel,
      feedbacks: listaFeedbacks,
      faqs: listaAccordions,
    });

    setLoading(false);
  }, [user]);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  if (loading || !tenantData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-[#00966D] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-red-50 text-red-600 px-6 py-4 rounded-xl shadow-sm font-medium">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50">
      <TenantHeader
        color={tenantData.color}
        tenantName={tenantData.tenantName}
        tenantPortfolioName={tenantData.tenantPortfolioName}
        assinatura={tenantData.assinatura}
        onToggleMenu={() => setIsMenuOpen((v) => !v)}
      />

      <div className="flex flex-1 min-h-0 overflow-hidden relative">
        <AsideMenuTenant
          color={tenantData.color}
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          secoes={paginaId ? layout.secoes : undefined}
          viewModel={viewModel ?? undefined}
          selectedSection={selectedSection}
          onSelectSection={setSelectedSection}
          onToggleVisibilidade={layout.toggleVisibility}
        />

        {!paginaId ? (
          <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
            <div className="max-w-4xl mx-auto">
              <div className="text-sm text-slate-400 mb-6 font-medium">
                CMS <span className="mx-1">&gt;</span> <span className="text-slate-700">Painel de Edição</span>
              </div>

              <GeneralInfoTenant
                color={tenantData.color}
                activeSections={tenantData.stats.activeSections}
                totalSections={tenantData.stats.totalSections}
                lastEdit={tenantData.stats.lastEdit}
                views={tenantData.stats.views}
              />

              {user && (
                <div className="pb-20">
                  <CriarPaginaForm tenantId={user.tenantId} color={tenantData.color} onCreated={carregarDados} />
                </div>
              )}
            </div>
          </main>
        ) : (
          // SCROLL #1 (fora): este container é a "página inteira" — rola
          // se GeneralInfoTenant + banner + o bloco do editor, juntos,
          // não couberem na tela (janela muito curta, por exemplo).
          <div className="flex-1 min-h-0 flex flex-col overflow-y-auto">
            <div className="px-4 md:px-8 pt-4 flex-shrink-0">
              <GeneralInfoTenant
                color={tenantData.color}
                activeSections={tenantData.stats.activeSections}
                totalSections={tenantData.stats.totalSections}
                lastEdit={tenantData.stats.lastEdit}
                views={tenantData.stats.views}
              />
              <PublicLinkBanner paginaId={paginaId} color={tenantData.color} />
            </div>

            {viewModel && user?.tenantId && (
              // min-h garante espaço vertical de verdade pro bloco do
              // editor — sem isso, ele encolhia até caber no conteúdo, e
              // o scroll interno do canvas/coluna de edição nunca tinha
              // altura suficiente pra ativar.
              <div className="flex-1 min-h-[70vh]">
                <VisualPortfolioEditor
                  paginaId={paginaId}
                  tenantId={user.tenantId}
                  viewModel={viewModel}
                  color={tenantData.color}
                  onContentSaved={carregarDados}
                  secoes={layout.secoes}
                  loadingLayout={layout.loading}
                  layoutError={layout.error}
                  saving={layout.saving}
                  isDirty={layout.isDirty}
                  setOrder={layout.setOrder}
                  toggleVisibility={layout.toggleVisibility}
                  save={layout.save}
                  discard={layout.discard}
                  selectedSection={selectedSection}
                  onSelectSection={setSelectedSection}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
