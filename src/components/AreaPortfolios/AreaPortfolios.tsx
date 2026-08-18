import { Box, Typography } from '@mui/material';
import { colors, CONTAINER_MAX_WIDTH } from '../../theme/colors';
import type { ImagemItem } from '../../types/portfolio-view-model';
import { Card } from './Card';

interface AreaPortfoliosProps {
  imagens: ImagemItem[];
}

export function AreaPortfolios({ imagens }: AreaPortfoliosProps) {
  if (imagens.length === 0) return null;

  return (
    <Box
      component="section"
      id="portfolio"
      sx={{ bgcolor: colors.background.default, px: 3, py: { xs: 6, md: 9 } }}
    >
      <Box sx={{ maxWidth: CONTAINER_MAX_WIDTH, mx: 'auto', width: '100%' }}>
        <Box sx={{ mb: 4 }}>
          <Typography
            sx={{
              textTransform: 'uppercase',
              letterSpacing: 0.8,
              fontSize: 12,
              fontWeight: 700,
              color: colors.secondary,
              mb: 0.75,
            }}
          >
            Portfólio
          </Typography>
          <Typography
            sx={{ fontWeight: 700, color: colors.text.primary, fontSize: { xs: 24, md: 30 } }}
          >
            Projetos em Destaque
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: { xs: 2.5, md: 3 },
          }}
        >
          {imagens.map((imagem) => (
            <Card key={imagem.id} imagem={imagem} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
