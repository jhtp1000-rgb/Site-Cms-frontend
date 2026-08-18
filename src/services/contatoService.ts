import apiService from './api';
import type { ApiResponse } from './api';
import type { Contato, CreateContatoRequest } from '../types/contato';

class ContatoService {
  create(payload: CreateContatoRequest): Promise<ApiResponse<Contato>> {
    return apiService.post<Contato>('/api/contatos', payload);
  }

  getByPagina(paginaId: number): Promise<ApiResponse<Contato[]>> {
    return apiService.get<Contato[]>(`/api/contatos/pagina/${paginaId}`);
  }

  delete(id: number): Promise<ApiResponse<void>> {
    return apiService.delete<void>(`/api/contatos/${id}`);
  }
}

export default new ContatoService();
