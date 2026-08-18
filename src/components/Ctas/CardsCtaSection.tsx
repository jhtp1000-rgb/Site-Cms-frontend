import { Box, Typography } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { colors, shadows } from '../../theme/colors';
import type { CardCtaItem } from '../../types/portfolio-view-model';

interface CardsCtaSectionProps {
  cards: CardCtaItem[];
}

export function CardsCtaSection({ cards }: CardsCtaSectionProps) {
  if (cards.length === 0) return null;

  return (
    <Box component="section" sx={{ width: '100%' }}>
      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{ textTransform: 'uppercase', letterSpacing: 0.8, fontSize: 12, fontWeight: 700, color: colors.secondary, mb: 0.75 }}
        >
          Recursos
        </Typography>
        <Typography sx={{ fontWeight: 700, color: colors.text.primary, fontSize: { xs: 22, md: 26 } }}>
          Conteúdo para você
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {cards.map((card) => (
          <Box
            key={card.id}
            component="a"
            href={card.linkDestino}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'block',
              textDecoration: 'none',
              borderRadius: '14px',
              overflow: 'hidden',
              border: `1px solid ${colors.border}`,
              bgcolor: '#fff',
              boxShadow: shadows.card,
              transition: 'transform 160ms ease, box-shadow 160ms ease',
              '&:hover': { transform: 'translateY(-2px)', boxShadow: shadows.cardHover },
            }}
          >
            {card.urlImagem && (
              <Box sx={{ aspectRatio: '16/9', overflow: 'hidden', bgcolor: colors.background.default }}>
                <Box component="img" src={card.urlImagem} alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
            )}
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1.5 }}>
              <Typography sx={{ fontWeight: 600, color: colors.text.primary, fontSize: 14.5, overflowWrap: 'anywhere' }}>
                {card.textoDestaque}
              </Typography>
              <ArrowOutwardIcon sx={{ fontSize: 16, color: colors.secondary, flexShrink: 0 }} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
