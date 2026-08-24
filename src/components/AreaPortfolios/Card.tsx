import { Box, Typography } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { colors, shadows } from '../../theme/colors';
import type { ImagemItem } from '../../types/portfolio-view-model';

interface CardProps {
  imagem: ImagemItem;
}

export function Card({ imagem }: CardProps) {
  const conteudo = (
    <Box
      sx={{
        borderRadius: '14px',
        overflow: 'hidden',
        border: `1px solid ${colors.border}`,
        bgcolor: '#fff',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease',
        cursor: imagem.linkExterno ? 'pointer' : 'default',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: shadows.cardHover,
          borderColor: colors.border,
        },
      }}
    >
      <Box sx={{ position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden', bgcolor: colors.background.default }}>
        {imagem.urlMidia && (
          <Box
            component="img"
            src={imagem.urlMidia}
            alt={imagem.titulo || 'Projeto'}
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </Box>

      <Box sx={{ p: 2.25, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {imagem.titulo && (
          <Typography sx={{ fontWeight: 600, color: colors.text.primary, fontSize: 15.5, mb: 0.5, overflowWrap: 'anywhere' }}>
            {imagem.titulo}
          </Typography>
        )}
        {imagem.descricao && (
          <Typography sx={{ color: colors.text.secondary, fontSize: 13.5, lineHeight: 1.55, mb: 1.5, flex: 1, overflowWrap: 'anywhere' }}>
            {imagem.descricao}
          </Typography>
        )}
        {imagem.linkExterno && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: colors.secondary, fontWeight: 600, fontSize: 13.5, mt: 'auto' }}>
            Ver projeto
            <ArrowOutwardIcon sx={{ fontSize: 14 }} />
          </Box>
        )}
      </Box>
    </Box>
  );

  if (imagem.linkExterno) {
    return (
      <a href={imagem.linkExterno} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
        {conteudo}
      </a>
    );
  }

  return conteudo;
}
