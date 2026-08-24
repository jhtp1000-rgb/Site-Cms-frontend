// src/components/portfolio/PortfolioRenderer.tsx
import { Box } from '@mui/material';
import { PublicHeader } from '../Header/PublicHeader';
import { PortfolioSectionRenderer, sectionHasData } from './PortfolioSectionRenderer';
import { colors, CONTAINER_MAX_WIDTH } from '../../theme/colors';
import { resp, type SimViewport } from '../../utils/responsive';
import type { PortfolioViewModel } from '../../types/portfolio-view-model';
import type { PageLayoutSection, SectionType } from '../../types/portfolio-layout';

export type PortfolioRenderMode = 'public' | 'editor';

export interface EditorSectionSlotProps {
  tipo: SectionType;
  temDado: boolean;
  visivel: boolean;
  selecionada: boolean;
  children: React.ReactNode;
}

interface PortfolioRendererProps {
  viewModel: PortfolioViewModel;
  layout: PageLayoutSection[];
  mode: PortfolioRenderMode;
  renderEditorSlot?: (props: EditorSectionSlotProps) => React.ReactNode;
  selectedSection?: SectionType | null;
  // Só definido no modo editor — simula um breakpoint específico,
  // ignorando a largura real do navegador. undefined = comportamento
  // normal do MUI (usado na vitrine pública de verdade).
  viewport?: SimViewport;
}

const PAIR_GROUPS: { left: SectionType; right: SectionType; background: 'white' | 'grey' }[] = [
  { left: 'DEPOIMENTOS', right: 'CARDS_CTA', background: 'white' },
  { left: 'FAQ', right: 'CONTATO', background: 'grey' },
];

const PAIRED_TYPES = new Set(PAIR_GROUPS.flatMap((p) => [p.left, p.right]));

type RenderGroup =
  | { kind: 'solo'; secao: PageLayoutSection }
  | { kind: 'pair'; left: PageLayoutSection; right: PageLayoutSection; background: 'white' | 'grey' }
  | { kind: 'pair-fallback'; secao: PageLayoutSection; background: 'white' | 'grey' };

function buildRenderGroups(
  secoesOrdenadas: PageLayoutSection[],
  mode: PortfolioRenderMode,
  viewModel: PortfolioViewModel
): RenderGroup[] {
  const byTipo = new Map(secoesOrdenadas.map((s) => [s.tipo, s]));
  const consumed = new Set<SectionType>();
  const groups: RenderGroup[] = [];

  const qualifica = (s: PageLayoutSection | undefined) => {
    if (!s) return false;
    if (mode === 'editor') return true;
    return s.visivel && sectionHasData(s.tipo, viewModel);
  };

  for (const secao of secoesOrdenadas) {
    if (consumed.has(secao.tipo)) continue;

    if (!PAIRED_TYPES.has(secao.tipo)) {
      groups.push({ kind: 'solo', secao });
      consumed.add(secao.tipo);
      continue;
    }

    const pairDef = PAIR_GROUPS.find((p) => p.left === secao.tipo || p.right === secao.tipo)!;
    const left = byTipo.get(pairDef.left);
    const right = byTipo.get(pairDef.right);
    consumed.add(pairDef.left);
    consumed.add(pairDef.right);

    const leftOk = qualifica(left);
    const rightOk = qualifica(right);

    if (mode === 'editor') {
      if (left && right) groups.push({ kind: 'pair', left, right, background: pairDef.background });
      continue;
    }

    if (leftOk && rightOk) {
      groups.push({ kind: 'pair', left: left!, right: right!, background: pairDef.background });
    } else if (leftOk) {
      groups.push({ kind: 'pair-fallback', secao: left!, background: pairDef.background });
    } else if (rightOk) {
      groups.push({ kind: 'pair-fallback', secao: right!, background: pairDef.background });
    }
  }

  return groups;
}

export function PortfolioRenderer({
  viewModel,
  layout,
  mode,
  renderEditorSlot,
  selectedSection = null,
  viewport,
}: PortfolioRendererProps) {
  const secoesOrdenadas = [...layout].sort((a, b) => a.ordem - b.ordem);
  const grupos = buildRenderGroups(secoesOrdenadas, mode, viewModel);

  const renderSlot = (secao: PageLayoutSection) => {
    const conteudo = <PortfolioSectionRenderer tipo={secao.tipo} viewModel={viewModel} viewport={viewport} />;
    if (mode === 'public' || !renderEditorSlot) return conteudo;
    return renderEditorSlot({
      tipo: secao.tipo,
      temDado: sectionHasData(secao.tipo, viewModel),
      visivel: secao.visivel,
      selecionada: selectedSection === secao.tipo,
      children: conteudo,
    });
  };

  return (
    <Box sx={{ bgcolor: '#fff', minHeight: mode === 'public' ? '100vh' : 'auto' }}>
      <PublicHeader
        nome={viewModel.nomeTenant}
        contatos={viewModel.contatos}
        botoesCta={viewModel.botoesCta}
        temPortfolio={viewModel.imagensCarrossel.length > 0}
        temDepoimentos={viewModel.feedbacks.length > 0}
        temFaq={viewModel.faqs.length > 0}
        temContato={viewModel.contatos.length > 0}
        sticky={mode === 'public'}
        viewport={viewport}
      />

      {grupos.map((grupo) => {
        if (grupo.kind === 'solo') {
          return <div key={grupo.secao.tipo}>{renderSlot(grupo.secao)}</div>;
        }

        if (grupo.kind === 'pair-fallback') {
          return (
            <Box
              key={grupo.secao.tipo}
              component="section"
              sx={{ bgcolor: grupo.background === 'grey' ? colors.background.default : '#fff', px: 3, py: { xs: 6, md: 9 } }}
            >
              <Box sx={{ maxWidth: CONTAINER_MAX_WIDTH, mx: 'auto', width: '100%' }}>{renderSlot(grupo.secao)}</Box>
            </Box>
          );
        }

        const key = `${grupo.left.tipo}-${grupo.right.tipo}`;
        const flexDirection = resp<'column' | 'row'>(viewport, { xs: 'column', md: 'row' });

        return (
          <Box
            key={key}
            component="section"
            sx={{ bgcolor: grupo.background === 'grey' ? colors.background.default : '#fff', px: 3, py: { xs: 6, md: 9 } }}
          >
            <Box
              sx={{
                maxWidth: CONTAINER_MAX_WIDTH,
                mx: 'auto',
                width: '100%',
                display: 'flex',
                flexDirection,
                gap: { xs: 5, md: 5 },
                alignItems: 'flex-start',
              }}
            >
              <Box sx={{ flex: flexDirection === 'row' ? '1 1 60%' : '1 1 auto', minWidth: 0, width: '100%' }}>
                {renderSlot(grupo.left)}
              </Box>
              <Box sx={{ flex: flexDirection === 'row' ? '1 1 40%' : '1 1 auto', minWidth: 0, width: '100%' }}>
                {renderSlot(grupo.right)}
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}