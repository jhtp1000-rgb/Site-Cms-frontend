export interface CardCta {
  id: number;
  paginaId: number;
  urlImagem: string;
  textoDestaque: string;
  linkDestino: string;
}

export interface CreateCardCtaRequest {
  paginaId: number;
  urlImagem: string;
  textoDestaque: string;
  linkDestino: string;
}
