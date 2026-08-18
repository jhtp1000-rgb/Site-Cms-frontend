export interface Plano {
  id: number;
  nomePlano: string;
  valorMensal: number;
  descricao: string;
}

export interface CreatePlanoRequest {
  nomePlano: string;
  valorMensal: number;
  descricao: string;
}
