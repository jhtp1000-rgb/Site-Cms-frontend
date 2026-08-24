import apiService from './api';
import type { ApiResponse } from './api';
import type { Tenant, CreateTenantRequest, UpdateTenantRequest } from '../types/tenant';

class TenantService {
  create(payload: CreateTenantRequest): Promise<ApiResponse<Tenant>> {
    return apiService.post<Tenant>('/api/tenants', payload);
  }

  getAll(): Promise<ApiResponse<Tenant[]>> {
    return apiService.get<Tenant[]>('/api/tenants');
  }

  getById(id: number): Promise<ApiResponse<Tenant>> {
    return apiService.get<Tenant>(`/api/tenants/${id}`);
  }

  update(id: number, payload: UpdateTenantRequest): Promise<ApiResponse<Tenant>> {
    return apiService.put<Tenant>(`/api/tenants/${id}`, payload);
  }

  delete(id: number): Promise<ApiResponse<void>> {
    return apiService.delete<void>(`/api/tenants/${id}`);
  }
}

export default new TenantService();
