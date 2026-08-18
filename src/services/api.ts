import axios from 'axios';
import type { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import { API_URL } from '../config';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

const TOKEN_KEY = '@App:token';
const USER_KEY = '@App:user';
const TENANT_ID_KEY = '@App:tenantId';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        const isLoginRequest = config.url?.includes('/api/auth/login');
        const token = this.getToken();
        if (token && !isLoginRequest) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.handleAuthError();
        }
        return Promise.reject(error);
      }
    );
  }

  private handleAuthError(): void {
    this.clearToken();
    window.dispatchEvent(
      new CustomEvent('auth-token-expired', {
        detail: { message: 'Sessão expirada. Faça login novamente.' },
      })
    );
  }

  public setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public clearToken(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TENANT_ID_KEY);
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private async request<T>(
    method: string,
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse = await this.axiosInstance.request({
        method,
        url: endpoint,
        data,
        ...config,
      });

      return { success: true, data: response.data as T };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const backendMessage =
          (error.response?.data as { error?: string; message?: string } | undefined)?.error ??
          (error.response?.data as { error?: string; message?: string } | undefined)?.message;

        if (!error.response) {
          return { success: false, error: 'Não foi possível conectar ao servidor.' };
        }

        return {
          success: false,
          error: backendMessage ?? `Erro ${error.response.status}`,
        };
      }

      return { success: false, error: 'Erro inesperado.' };
    }
  }

  get<T>(endpoint: string, config?: AxiosRequestConfig) {
    return this.request<T>('GET', endpoint, undefined, config);
  }

  post<T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.request<T>('POST', endpoint, data, config);
  }

  put<T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.request<T>('PUT', endpoint, data, config);
  }

  delete<T>(endpoint: string, config?: AxiosRequestConfig) {
    return this.request<T>('DELETE', endpoint, undefined, config);
  }
}

const apiService = new ApiService();
export default apiService;
