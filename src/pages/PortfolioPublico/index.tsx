import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { PortfolioRenderer } from '../../components/portfolio/PortfolioRenderer';
import { buildDefaultLayout } from '../../types/portfolio-layout';
import type { PortfolioViewModel } from '../../types/portfolio-view-model';
import paginaService from '../../services/paginaService';
import tenantService from '../../services/tenantService';
import biografiaService from '../../services/biografiaService';
import contatoService from '../../services/contatoService';
import botaoCtaService from '../../services/botaoCtaService';
import cardCtaService from '../../services/cardCtaService';
import carrosselService from '../../services/carrosselService';
import feedbackService from '../../services/feedbackService';
import accordionService from '../../services/accordionService';

export default function PortfolioPublico() {
  const { paginaId } = useParams<{ paginaId: string }>();
  const idNumerico = paginaId ? Number(paginaId) : null;

  const [data, setData] = useState<PortfolioViewModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const fetchData = useCallback(async () => {
    if (idNumerico == null || Number.isNaN(idNumerico)) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    setNotFound(false);

    const resPagina = await paginaService.getById(idNumerico);
    if (!resPagina.success || !resPagina.data) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    const pagina = resPagina.data;

    const resTenant = await tenantService.getById(pagina.tenantId);
    const nomeTenant = resTenant.success && resTenant.data ? resTenant.data.nome : pagina.tituloPagina;

    const [biografia, contatos, botoesCta, cardsCta, carrosseis, feedbacks, accordions] = await Promise.all([
      biografiaService.getByPagina(idNumerico),
      contatoService.getByPagina(idNumerico),
      botaoCtaService.getByPagina(idNumerico),
      cardCtaService.getByPagina(idNumerico),
      carrosselService.getByPagina(idNumerico),
      feedbackService.getByPagina(idNumerico),
      accordionService.getByPagina(idNumerico),
    ]);

    const imagensCarrossel = (carrosseis.data ?? []).flatMap((c) => c.imagens ?? []);

    setData({
      paginaId: idNumerico,
      tituloPagina: pagina.tituloPagina,
      nomeTenant,
      bio: biografia.data?.conteudoTexto ?? null,
      contatos: contatos.data ?? [],
      botoesCta: botoesCta.data ?? [],
      cardsCta: cardsCta.data ?? [],
      imagensCarrossel,
      feedbacks: feedbacks.data ?? [],
      faqs: accordions.data ?? [],
    });
    setLoading(false);
  }, [idNumerico]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress sx={{ color: '#059669' }} />
      </Box>
    );
  }

  if (notFound || !data) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          textAlign: 'center',
          px: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Página não encontrada
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          Esse portfólio não existe ou não está mais disponível.
        </Typography>
      </Box>
    );
  }

  const layout = buildDefaultLayout(data.paginaId);
  const layoutCustomizado = tentarLerLayoutLocal(data.paginaId) ?? layout.secoes;

  return <PortfolioRenderer viewModel={data} layout={layoutCustomizado} mode="public" />;
}

function tentarLerLayoutLocal(paginaId: number) {
  try {
    const raw = localStorage.getItem(`@App:layout:${paginaId}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { secoes: ReturnType<typeof buildDefaultLayout>['secoes'] };
    return parsed.secoes ?? null;
  } catch {
    return null;
  }
}
