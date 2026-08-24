export interface ImagemCarrossel {
  id: number;
  carrosselId: number;
  ordemExibicao: number;
  urlMidia: string;
  titulo: string;
  descricao: string;
  linkExterno: string;
}

export interface Carrossel {
  id: number;
  paginaId: number;
  imagens: ImagemCarrossel[];
}

export interface CreateCarrosselRequest {
  paginaId: number;
}

export interface CreateImagemCarrosselRequest {
  carrosselId: number;
  ordemExibicao: number;
  urlMidia: string;
  titulo: string;
  descricao: string;
  linkExterno: string;
}
