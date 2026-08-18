export interface Contato {
  id: number;
  paginaId: number;
  tipoContato: string;
  valorContato: string;
}

export interface CreateContatoRequest {
  paginaId: number;
  tipoContato: string;
  valorContato: string;
}
