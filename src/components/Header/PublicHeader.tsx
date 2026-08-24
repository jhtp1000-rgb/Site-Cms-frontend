// src/components/Header/PublicHeader.tsx
import { Box, Typography, Button } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { colors, CONTAINER_MAX_WIDTH } from '../../theme/colors';
import type { ContatoItem, BotaoCtaItem } from '../../types/portfolio-view-model';
import { iniciais, resolveContato } from '../../utils/portfolioHelpers';
import { resp, type SimViewport } from '../../utils/responsive';

interface PublicHeaderProps {
  nome: string;
  contatos: ContatoItem[];
  botoesCta: BotaoCtaItem[];
  temPortfolio: boolean;
  temDepoimentos: boolean;
  temFaq: boolean;
  temContato: boolean;
  sticky?: boolean;
  viewport?: SimViewport;
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function PublicHeader({
  nome,
  contatos,
  botoesCta,
  temPortfolio,
  temDepoimentos,
  temFaq,
  temContato,
  sticky = true,
  viewport,
}: PublicHeaderProps) {
  const navItems = [
    temPortfolio && { label: 'Portfólio', id: 'portfolio' },
    temDepoimentos && { label: 'Depoimentos', id: 'depoimentos' },
    temFaq && { label: 'FAQ', id: 'faq' },
    temContato && { label: 'Contato', id: 'contato' },
  ].filter((item): item is { label: string; id: string } => Boolean(item));

  const whatsapp = contatos.find((c) => c.tipoContato.toLowerCase().includes('whatsapp'));
  const ctaRapido = whatsapp
    ? { texto: 'WhatsApp', href: resolveContato(whatsapp.tipoContato, whatsapp.valorContato).href }
    : botoesCta[0]
      ? { texto: botoesCta[0].textoExibicao, href: botoesCta[0].linkDestino }
      : null;

  const mostrarNav = resp<'none' | 'flex'>(viewport, { xs: 'none', md: 'flex' }) !== 'none';

  return (
    <Box
      component="header"
      sx={{
        position: sticky ? 'sticky' : 'static',
        top: 0,
        zIndex: 10,
        bgcolor: '#FFFFFF',
        borderBottom: `1px solid ${colors.border}`,
        boxShadow: '0 1px 2px rgba(15,23,42,0.02)',
      }}
    >
      <Box
        sx={{
          maxWidth: CONTAINER_MAX_WIDTH,
          mx: 'auto',
          px: 3,
          height: { xs: 60, md: 68 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, minWidth: 0 }}>
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: '8px',
              bgcolor: colors.secondary,
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: 13,
              flexShrink: 0,
            }}
          >
            {iniciais(nome).charAt(0)}
          </Box>
          <Typography sx={{ fontWeight: 700, color: colors.text.primary, fontSize: 15 }} noWrap>
            {nome}
          </Typography>
        </Box>

        {navItems.length > 0 && mostrarNav && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {navItems.map((item) => (
              <Typography
                key={item.id}
                component="button"
                onClick={() => scrollTo(item.id)}
                sx={{
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 500,
                  color: colors.text.secondary,
                  p: 0,
                  transition: 'color 160ms ease',
                  '&:hover': { color: colors.secondary },
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Box>
        )}

        {ctaRapido && (
          <Button
            component="a"
            href={ctaRapido.href}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            size="small"
            startIcon={whatsapp ? <WhatsAppIcon sx={{ fontSize: 16 }} /> : undefined}
            sx={{
              bgcolor: colors.secondary,
              flexShrink: 0,
              px: 2,
              py: 0.75,
              fontSize: 13,
              fontWeight: 600,
              borderRadius: '8px',
              textTransform: 'none',
              boxShadow: 'none',
              transition: 'filter 160ms ease',
              '&:hover': { bgcolor: colors.secondary, filter: 'brightness(0.93)', boxShadow: 'none' },
            }}
          >
            {ctaRapido.texto}
          </Button>
        )}
      </Box>
    </Box>
  );
}