import apiService from './api';
import type { ApiResponse } from './api';
import type { Assinatura, CreateAssinaturaRequest } from '../types/assinatura';

class AssinaturaService {
  create(payload: CreateAssinaturaRequest): Promise<ApiResponse<Assinatura>> {
    return apiService.post<Assinatura>('/api/assinaturas', payload);
  }

  getByTenant(tenantId: number): Promise<ApiResponse<Assinatura[]>> {
    return apiService.get<Assinatura[]>(`/api/assinaturas/tenant/${tenantId}`);
  }
}

export default new AssinaturaService();
