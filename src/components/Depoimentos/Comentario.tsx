import { Box, Avatar, Typography, Paper } from '@mui/material';
import { colors, shadows } from '../../theme/colors';
import type { FeedbackItem } from '../../types/portfolio-view-model';

interface ComentarioProps {
  feedback: FeedbackItem;
}

function iniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/);
  return partes.slice(0, 2).map((p) => p.charAt(0).toUpperCase()).join('') || '?';
}

export function Comentario({ feedback }: ComentarioProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: '14px',
        border: `1px solid ${colors.border}`,
        boxShadow: shadows.card,
        transition: 'transform 160ms ease, box-shadow 160ms ease',
        '&:hover': { transform: 'translateY(-2px)', boxShadow: shadows.cardHover },
      }}
    >
      <Typography
        sx={{ color: colors.text.primary, fontSize: 14.5, lineHeight: 1.7, mb: 2.5, overflowWrap: 'anywhere' }}
      >
        "{feedback.textoAvaliacao}"
      </Typography>

      <Box sx={{ borderTop: `1px solid ${colors.border}`, pt: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Avatar sx={{ width: 36, height: 36, bgcolor: colors.accent.light, color: colors.secondaryDark, fontWeight: 700, fontSize: 13 }}>
          {iniciais(feedback.nomeCliente)}
        </Avatar>
        <Typography sx={{ fontWeight: 600, color: colors.text.primary, fontSize: 14 }}>
          {feedback.nomeCliente}
        </Typography>
      </Box>
    </Paper>
  );
}
