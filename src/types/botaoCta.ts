export interface BotaoCta {
  id: number;
  paginaId: number;
  textoExibicao: string;
  linkDestino: string;
}

export interface CreateBotaoCtaRequest {
  paginaId: number;
  textoExibicao: string;
  linkDestino: string;
}
