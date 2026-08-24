import apiService from './api';
import type { ApiResponse } from './api';
import type { Plano, CreatePlanoRequest } from '../types/plano';

class PlanoService {
  create(payload: CreatePlanoRequest): Promise<ApiResponse<Plano>> {
    return apiService.post<Plano>('/api/planos', payload);
  }

  getAll(): Promise<ApiResponse<Plano[]>> {
    return apiService.get<Plano[]>('/api/planos');
  }
}

export default new PlanoService();
