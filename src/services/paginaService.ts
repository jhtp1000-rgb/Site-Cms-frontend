import apiService from './api';
import type { ApiResponse } from './api';
import type { Pagina, CreatePaginaRequest } from '../types/pagina';

class PaginaService {
  create(payload: CreatePaginaRequest): Promise<ApiResponse<Pagina>> {
    return apiService.post<Pagina>('/api/paginas', payload);
  }

  getById(id: number): Promise<ApiResponse<Pagina>> {
    return apiService.get<Pagina>(`/api/paginas/${id}`);
  }

  getByTenant(tenantId: number): Promise<ApiResponse<Pagina[]>> {
    return apiService.get<Pagina[]>(`/api/paginas/tenant/${tenantId}`);
  }

  delete(id: number): Promise<ApiResponse<void>> {
    return apiService.delete<void>(`/api/paginas/${id}`);
  }
}

export default new PaginaService();
