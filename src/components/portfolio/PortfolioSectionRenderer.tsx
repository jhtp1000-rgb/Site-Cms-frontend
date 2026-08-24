// src/components/portfolio/PortfolioSectionRenderer.tsx
import { Dashboard } from '../Dashboard/Dashboard';
import { AreaPortfolios } from '../AreaPortfolios/AreaPortfolios';
import { CardsCtaSection } from '../Ctas/CardsCtaSection';
import { Depoimentos } from '../Depoimentos/Depoimentos';
import { FaqSection } from '../Faq/FaqSection';
import { ContatoSection } from '../Contato/ContatoSection';
import type { PortfolioViewModel } from '../../types/portfolio-view-model';
import type { SectionType } from '../../types/portfolio-layout';
import type { SimViewport } from '../../utils/responsive';

interface PortfolioSectionRendererProps {
  tipo: SectionType;
  viewModel: PortfolioViewModel;
  viewport?: SimViewport;
}

export function PortfolioSectionRenderer({ tipo, viewModel, viewport }: PortfolioSectionRendererProps) {
  switch (tipo) {
    case 'HERO':
      return (
        <Dashboard
          nome={viewModel.nomeTenant}
          subtitulo={viewModel.tituloPagina}
          bio={viewModel.bio}
          contatos={viewModel.contatos}
          botoesCta={viewModel.botoesCta}
          viewport={viewport}
        />
      );
    case 'PORTFOLIO':
      return <AreaPortfolios imagens={viewModel.imagensCarrossel} viewport={viewport} />;
    case 'CARDS_CTA':
      return <CardsCtaSection cards={viewModel.cardsCta} viewport={viewport} />;
    case 'DEPOIMENTOS':
      return <Depoimentos feedbacks={viewModel.feedbacks} viewport={viewport} />;
    case 'FAQ':
      return <FaqSection faqs={viewModel.faqs} />;
    case 'CONTATO':
      return <ContatoSection contatos={viewModel.contatos} />;
    default:
      return null;
  }
}

export function sectionHasData(tipo: SectionType, viewModel: PortfolioViewModel): boolean {
  switch (tipo) {
    case 'HERO':
      return Boolean(viewModel.bio) || viewModel.contatos.length > 0 || viewModel.botoesCta.length > 0;
    case 'PORTFOLIO':
      return viewModel.imagensCarrossel.length > 0;
    case 'CARDS_CTA':
      return viewModel.cardsCta.length > 0;
    case 'DEPOIMENTOS':
      return viewModel.feedbacks.length > 0;
    case 'FAQ':
      return viewModel.faqs.length > 0;
    case 'CONTATO':
      return viewModel.contatos.length > 0;
    default:
      return false;
  }
}