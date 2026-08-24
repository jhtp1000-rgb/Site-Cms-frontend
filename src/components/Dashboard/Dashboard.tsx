// src/components/Dashboard/Dashboard.tsx
import { Box, Avatar, Typography, Button, Stack, Paper } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkIcon from '@mui/icons-material/Link';
import { colors, shadows, CONTAINER_MAX_WIDTH } from '../../theme/colors';
import type { ContatoItem, BotaoCtaItem } from '../../types/portfolio-view-model';
import { iniciais, resolveContato, type ContatoKind } from '../../utils/portfolioHelpers';
import { resp, type SimViewport } from '../../utils/responsive';

interface DashboardProps {
  nome: string;
  subtitulo?: string;
  bio?: string | null;
  contatos: ContatoItem[];
  botoesCta: BotaoCtaItem[];
  viewport?: SimViewport;
}

const ICONS: Record<ContatoKind, React.ReactNode> = {
  whatsapp: <WhatsAppIcon />,
  email: <EmailIcon />,
  phone: <PhoneIcon />,
  instagram: <InstagramIcon />,
  other: <LinkIcon />,
};

export function Dashboard({ nome, subtitulo, bio, contatos, botoesCta, viewport }: DashboardProps) {
  const acoes = [
    ...contatos.map((c) => ({ tipo: 'contato' as const, item: c })),
    ...botoesCta.map((b) => ({ tipo: 'botao' as const, item: b })),
  ];
  const temAcoes = acoes.length > 0;

  const colDirection = resp<'column' | 'row'>(viewport, { xs: 'column', md: 'row' });
  const heroAlign = resp<'center' | 'flex-start'>(viewport, { xs: 'center', sm: 'flex-start' });
  const heroTextAlign = resp<'center' | 'left'>(viewport, { xs: 'center', sm: 'left' });
  const avatarSize = resp<number>(viewport, { xs: 100, md: 132 });
  const nameSize = resp<number>(viewport, { xs: 30, md: 38 });
  const bodyFontSize = resp<number>(viewport, { xs: 15, md: 16 });
  const paperWidth = resp<string | number>(viewport, { xs: '100%', md: 340 });

  // Antes: derivados comparando colDirection === 'row' (quebra na vitrine
  // pública, onde colDirection pode ser o objeto de breakpoints, nunca
  // estritamente igual à string 'row'). Agora cada um resolve seu próprio
  // valor final direto via resp(), sem depender de comparar outro resp().
  const paperPosition = resp<'sticky' | 'static'>(viewport, { xs: 'static', md: 'sticky' });
  const paperTop = resp<number | undefined>(viewport, { xs: undefined, md: 88 });
  const heroPt = resp<number | undefined>(viewport, { xs: undefined, md: 0 });
  const bioMx = resp<string | number>(viewport, { xs: 'auto', sm: 0 });

  return (
    <Box component="section" sx={{ bgcolor: '#fff', px: 3, py: { xs: 6, md: 10 } }}>
      <Box sx={{ maxWidth: CONTAINER_MAX_WIDTH, mx: 'auto', width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: colDirection,
            gap: { xs: 5, md: 6 },
            alignItems: 'flex-start',
          }}
        >
          <Box sx={{ flex: temAcoes ? '1 1 62%' : '1 1 100%', minWidth: 0, width: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: resp<'column' | 'row'>(viewport, { xs: 'column', sm: 'row' }),
                alignItems: heroAlign,
                gap: 3,
                mb: 3.5,
                textAlign: heroTextAlign,
              }}
            >
              <Box sx={{ position: 'relative', flexShrink: 0 }}>
                <Avatar
                  sx={{
                    width: avatarSize,
                    height: avatarSize,
                    border: `3px solid ${colors.accent.ring}`,
                    bgcolor: colors.secondary,
                    fontSize: resp<number>(viewport, { xs: 34, md: 44 }),
                    fontWeight: 700,
                  }}
                >
                  {iniciais(nome)}
                </Avatar>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 6,
                    right: 6,
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    bgcolor: colors.secondaryBright,
                    border: '3px solid #fff',
                  }}
                />
              </Box>

              <Box sx={{ pt: heroPt }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: colors.text.primary,
                    fontSize: nameSize,
                    lineHeight: 1.15,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {nome}
                </Typography>
                {subtitulo && (
                  <Typography
                    sx={{ color: colors.secondary, fontWeight: 600, fontSize: resp<number>(viewport, { xs: 15, md: 17 }), mt: 0.5 }}
                  >
                    {subtitulo}
                  </Typography>
                )}
              </Box>
            </Box>

            {bio && (
              <Typography
                sx={{
                  color: colors.text.secondary,
                  fontSize: bodyFontSize,
                  lineHeight: 1.75,
                  maxWidth: 620,
                  mx: bioMx,
                  whiteSpace: 'pre-wrap',
                  overflowWrap: 'anywhere',
                }}
              >
                {bio}
              </Typography>
            )}
          </Box>

          {temAcoes && (
            <Paper
              elevation={0}
              sx={{
                width: paperWidth,
                flexShrink: 0,
                p: 3.5,
                borderRadius: '16px',
                border: `1px solid ${colors.border}`,
                boxShadow: shadows.card,
                position: paperPosition,
                top: paperTop,
              }}
            >
              <Typography
                sx={{
                  textTransform: 'uppercase',
                  letterSpacing: 0.8,
                  fontSize: 11,
                  fontWeight: 700,
                  color: colors.text.muted,
                  mb: 2,
                }}
              >
                Próximos passos
              </Typography>

              <Stack spacing={1.25}>
                {acoes.map((acao, idx) => {
                  const variantIndex = Math.min(idx, 2);

                  if (acao.tipo === 'contato') {
                    const { href, kind } = resolveContato(acao.item.tipoContato, acao.item.valorContato);
                    return (
                      <Button
                        key={`c-${acao.item.id}`}
                        component="a"
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant={variantIndex === 2 ? 'outlined' : 'contained'}
                        fullWidth
                        startIcon={ICONS[kind]}
                        sx={{
                          py: 1.25,
                          fontSize: 14,
                          fontWeight: 600,
                          textTransform: 'none',
                          justifyContent: 'flex-start',
                          borderRadius: '8px',
                          boxShadow: 'none',
                          ...(variantIndex === 0 && {
                            bgcolor: colors.secondaryBright,
                            '&:hover': { bgcolor: colors.secondaryBright, filter: 'brightness(0.94)', boxShadow: 'none' },
                          }),
                          ...(variantIndex === 1 && {
                            bgcolor: colors.secondaryDark,
                            '&:hover': { bgcolor: colors.secondaryDark, filter: 'brightness(0.94)', boxShadow: 'none' },
                          }),
                          ...(variantIndex === 2 && {
                            borderColor: colors.border,
                            color: colors.text.primary,
                            '&:hover': { borderColor: colors.secondary, bgcolor: colors.accent.light },
                          }),
                        }}
                      >
                        {acao.item.valorContato}
                      </Button>
                    );
                  }

                  return (
                    <Button
                      key={`b-${acao.item.id}`}
                      component="a"
                      href={acao.item.linkDestino}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant={variantIndex === 2 ? 'outlined' : 'contained'}
                      fullWidth
                      sx={{
                        py: 1.25,
                        fontSize: 14,
                        fontWeight: 600,
                        textTransform: 'none',
                        borderRadius: '8px',
                        boxShadow: 'none',
                        ...(variantIndex === 0 && { bgcolor: colors.secondaryBright }),
                        ...(variantIndex === 1 && { bgcolor: colors.secondaryDark }),
                        ...(variantIndex === 2 && { borderColor: colors.border, color: colors.text.primary }),
                      }}
                    >
                      {acao.item.textoExibicao}
                    </Button>
                  );
                })}
              </Stack>
            </Paper>
          )}
        </Box>
      </Box>
    </Box>
  );
}