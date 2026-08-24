
export type SectionType =
  | 'HERO'
  | 'PORTFOLIO'
  | 'CARDS_CTA'
  | 'DEPOIMENTOS'
  | 'FAQ'
  | 'CONTATO';

export interface PageLayoutSection {
  tipo: SectionType;
  ordem: number;
  visivel: boolean;
}

export interface PageLayout {
  paginaId: number;
  secoes: PageLayoutSection[];
}

export const DEFAULT_LAYOUT_ORDER: SectionType[] = [
  'HERO',
  'PORTFOLIO',
  'CARDS_CTA',
  'DEPOIMENTOS',
  'FAQ',
  'CONTATO',
];

export function buildDefaultLayout(paginaId: number): PageLayout {
  return {
    paginaId,
    secoes: DEFAULT_LAYOUT_ORDER.map((tipo, index) => ({
      tipo,
      ordem: index,
      visivel: true,
    })),
  };
}

export const SECTION_LABELS: Record<SectionType, string> = {
  HERO: 'Hero / Biografia',
  PORTFOLIO: 'Portfólio / Carrossel',
  CARDS_CTA: 'Cards de destaque',
  DEPOIMENTOS: 'Depoimentos',
  FAQ: 'Perguntas Frequentes',
  CONTATO: 'Contato',
};
