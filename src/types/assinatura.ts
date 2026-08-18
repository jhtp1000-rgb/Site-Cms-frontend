export interface Assinatura {
  id: number;
  tenantId: number;
  tenantNome: string;
  planoId: number;
  planoNome: string;
  dataInicio: string;
  statusPagamento: string;
}

export interface CreateAssinaturaRequest {
  tenantId: number;
  planoId: number;
  dataInicio: string;
  statusPagamento: string;
}
