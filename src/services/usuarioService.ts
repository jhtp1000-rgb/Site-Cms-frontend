import apiService from './api';
import type { ApiResponse } from './api';
import type { Usuario, CreateUsuarioRequest } from '../types/usuario';

class UsuarioService {
  create(payload: CreateUsuarioRequest): Promise<ApiResponse<Usuario>> {
    return apiService.post<Usuario>('/api/usuarios', payload);
  }

  getAll(): Promise<ApiResponse<Usuario[]>> {
    return apiService.get<Usuario[]>('/api/usuarios');
  }
}

export default new UsuarioService();
