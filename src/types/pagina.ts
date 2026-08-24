export interface Pagina {
  id: number;
  tenantId: number;
  urlPublica: string;
  tituloPagina: string;
  dataCriacao: string;
}

export interface CreatePaginaRequest {
  tenantId: number;
  urlPublica: string;
  tituloPagina: string;
}
