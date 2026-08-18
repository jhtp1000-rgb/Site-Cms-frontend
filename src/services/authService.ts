import apiService from './api';
import type { ApiResponse } from './api';
import type { LoginRequest, LoginResponse } from '../types/auth';

class AuthService {
  login(payload: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return apiService.post<LoginResponse>('/api/auth/login', payload);
  }
}

export default new AuthService();
