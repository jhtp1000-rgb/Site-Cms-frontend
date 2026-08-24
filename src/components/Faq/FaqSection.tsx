import { useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { colors } from '../../theme/colors';
import type { AccordionItem } from '../../types/portfolio-view-model';

interface FaqSectionProps {
  faqs: AccordionItem[];
}

function ToggleIcon({ expanded }: { expanded: boolean }) {
  return (
    <Box
      sx={{
        width: 22, height: 22, borderRadius: '50%', border: `1px solid ${colors.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: colors.text.secondary, fontSize: 15, flexShrink: 0, transition: 'all 160ms ease',
      }}
    >
      {expanded ? '−' : '+'}
    </Box>
  );
}

export function FaqSection({ faqs }: FaqSectionProps) {
  const [aberto, setAberto] = useState<number | null>(null);

  if (faqs.length === 0) return null;

  return (
    <Box component="section" id="faq" sx={{ width: '100%' }}>
      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{ textTransform: 'uppercase', letterSpacing: 0.8, fontSize: 12, fontWeight: 700, color: colors.secondary, mb: 0.75 }}
        >
          Dúvidas
        </Typography>
        <Typography sx={{ fontWeight: 700, color: colors.text.primary, fontSize: { xs: 22, md: 26 } }}>
          Perguntas Frequentes
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {faqs.map((faq) => {
          const expanded = aberto === faq.id;
          return (
            <Accordion
              key={faq.id}
              disableGutters
              elevation={0}
              expanded={expanded}
              onChange={() => setAberto(expanded ? null : faq.id)}
              sx={{
                border: `1px solid ${colors.border}`,
                borderRadius: '10px !important',
                bgcolor: '#fff',
                '&:before': { display: 'none' },
                overflow: 'hidden',
              }}
            >
              <AccordionSummary expandIcon={<ToggleIcon expanded={expanded} />} sx={{ px: 2.5, py: 0.5 }}>
                <Typography sx={{ fontWeight: 600, fontSize: 14.5, color: colors.text.primary, overflowWrap: 'anywhere' }}>
                  {faq.perguntaTitulo}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 2.5, pt: 0, pb: 2.5 }}>
                <Typography sx={{ color: colors.text.secondary, fontSize: 13.5, lineHeight: 1.65, overflowWrap: 'anywhere' }}>
                  {faq.respostaConteudo}
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    </Box>
  );
}
