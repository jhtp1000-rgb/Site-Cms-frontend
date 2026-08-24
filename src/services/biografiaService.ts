import apiService from './api';
import type { ApiResponse } from './api';
import type { Biografia, SalvarBiografiaRequest } from '../types/biografia';

class BiografiaService {
  salvar(payload: SalvarBiografiaRequest): Promise<ApiResponse<Biografia>> {
    return apiService.post<Biografia>('/api/biografias', payload);
  }

  getByPagina(paginaId: number): Promise<ApiResponse<Biografia>> {
    return apiService.get<Biografia>(`/api/biografias/pagina/${paginaId}`);
  }
}

export default new BiografiaService();
