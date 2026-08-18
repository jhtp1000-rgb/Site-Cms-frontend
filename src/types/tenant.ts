export interface Tenant {
  id: number;
  nome: string;
  email: string;
}

export interface CreateTenantRequest {
  nome: string;
  email: string;
  senha: string;
}

export interface UpdateTenantRequest {
  nome: string;
  email: string;
  senha: string;
}
