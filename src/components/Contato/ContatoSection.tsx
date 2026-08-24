import { Box, Typography } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkIcon from '@mui/icons-material/Link';
import { colors } from '../../theme/colors';
import type { ContatoItem } from '../../types/portfolio-view-model';
import { resolveContato, type ContatoKind } from '../../utils/portfolioHelpers';

interface ContatoSectionProps {
  contatos: ContatoItem[];
}

const KIND_STYLE: Record<ContatoKind, { bg: string; fg: string; icon: React.ReactNode; label: string }> = {
  whatsapp: { bg: '#D1FAE5', fg: '#059669', icon: <WhatsAppIcon sx={{ fontSize: 20 }} />, label: 'WhatsApp' },
  email: { bg: '#CCFBF1', fg: '#0D9488', icon: <EmailIcon sx={{ fontSize: 20 }} />, label: 'E-mail' },
  phone: { bg: '#DBEAFE', fg: '#2563EB', icon: <PhoneIcon sx={{ fontSize: 20 }} />, label: 'Telefone' },
  instagram: { bg: '#FCE7F3', fg: '#DB2777', icon: <InstagramIcon sx={{ fontSize: 20 }} />, label: 'Instagram' },
  other: { bg: colors.background.default, fg: colors.text.secondary, icon: <LinkIcon sx={{ fontSize: 20 }} />, label: 'Contato' },
};

export function ContatoSection({ contatos }: ContatoSectionProps) {
  if (contatos.length === 0) return null;

  return (
    <Box component="section" id="contato" sx={{ width: '100%' }}>
      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{ textTransform: 'uppercase', letterSpacing: 0.8, fontSize: 12, fontWeight: 700, color: colors.secondary, mb: 0.75 }}
        >
          Contato
        </Typography>
        <Typography sx={{ fontWeight: 700, color: colors.text.primary, fontSize: { xs: 22, md: 26 }, mb: 0.75 }}>
          Vamos conversar?
        </Typography>
        <Typography sx={{ color: colors.text.secondary, fontSize: 14 }}>
          Escolha o canal de sua preferência para entrar em contato.
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1.5 }}>
        {contatos.map((contato) => {
          const { href, kind } = resolveContato(contato.tipoContato, contato.valorContato);
          const style = KIND_STYLE[kind];

          return (
            <Box
              key={contato.id}
              component="a"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'block',
                textDecoration: 'none',
                p: 2,
                borderRadius: '12px',
                border: `1px solid ${colors.border}`,
                bgcolor: '#fff',
                transition: 'transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease',
                '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 4px 14px rgba(15,23,42,0.06)', borderColor: colors.border },
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '10px',
                  bgcolor: style.bg,
                  color: style.fg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 1.5,
                }}
              >
                {style.icon}
              </Box>
              <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: colors.text.muted, textTransform: 'capitalize', mb: 0.25 }}>
                {contato.tipoContato}
              </Typography>
              <Typography sx={{ fontSize: 13.5, fontWeight: 600, color: colors.text.primary, overflowWrap: 'anywhere' }}>
                {contato.valorContato}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
