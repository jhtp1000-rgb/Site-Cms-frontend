export interface Biografia {
  id: number;
  paginaId: number;
  conteudoTexto: string;
}

export interface SalvarBiografiaRequest {
  paginaId: number;
  conteudoTexto: string;
}
