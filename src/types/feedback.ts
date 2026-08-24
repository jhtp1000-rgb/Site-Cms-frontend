export interface Feedback {
  id: number;
  paginaId: number;
  nomeCliente: string;
  textoAvaliacao: string;
  dataFeedback: string;
}

export interface CreateFeedbackRequest {
  paginaId: number;
  nomeCliente: string;
  textoAvaliacao: string;
  dataFeedback?: string;
}
