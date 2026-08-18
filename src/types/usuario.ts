export interface Usuario {
  id: number;
  nomeCompleto: string;
  email: string;
  isAdmin: boolean;
  tenantId: number | null;
}

export interface CreateUsuarioRequest {
  tenantId: number | null;
  nomeCompleto: string;
  email: string;
  senha: string;
  isAdmin: boolean;
}
