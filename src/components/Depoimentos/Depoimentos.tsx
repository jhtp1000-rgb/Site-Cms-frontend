// src/components/Depoimentos/Depoimentos.tsx
import { Box, Typography } from '@mui/material';
import { colors } from '../../theme/colors';
import type { FeedbackItem } from '../../types/portfolio-view-model';
import { resp, type SimViewport } from '../../utils/responsive';
import { Comentario } from './Comentario';

interface DepoimentosProps {
  feedbacks: FeedbackItem[];
  viewport?: SimViewport;
}

export function Depoimentos({ feedbacks, viewport }: DepoimentosProps) {
  if (feedbacks.length === 0) return null;

  const columns = resp<string>(viewport, { xs: '1fr', sm: '1fr', md: '1fr' });

  return (
    <Box component="section" id="depoimentos" sx={{ width: '100%' }}>
      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{ textTransform: 'uppercase', letterSpacing: 0.8, fontSize: 12, fontWeight: 700, color: colors.secondary, mb: 0.75 }}
        >
          Depoimentos
        </Typography>
        <Typography sx={{ fontWeight: 700, color: colors.text.primary, fontSize: { xs: 22, md: 26 } }}>
          O que dizem os clientes
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: columns, gap: 2.5 }}>
        {feedbacks.map((feedback) => (
          <Comentario key={feedback.id} feedback={feedback} />
        ))}
      </Box>
    </Box>
  );
}