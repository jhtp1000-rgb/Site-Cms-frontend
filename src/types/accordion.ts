export interface Accordion {
  id: number;
  paginaId: number;
  perguntaTitulo: string;
  respostaConteudo: string;
}

export interface CreateAccordionRequest {
  paginaId: number;
  perguntaTitulo: string;
  respostaConteudo: string;
}
