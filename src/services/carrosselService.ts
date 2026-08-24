import apiService from './api';
import type { ApiResponse } from './api';
import type {
  Carrossel,
  ImagemCarrossel,
  CreateCarrosselRequest,
  CreateImagemCarrosselRequest,
} from '../types/carrossel';

class CarrosselService {
  create(payload: CreateCarrosselRequest): Promise<ApiResponse<Carrossel>> {
    return apiService.post<Carrossel>('/api/carrosseis', payload);
  }

  getByPagina(paginaId: number): Promise<ApiResponse<Carrossel[]>> {
    return apiService.get<Carrossel[]>(`/api/carrosseis/pagina/${paginaId}`);
  }

  addImagem(payload: CreateImagemCarrosselRequest): Promise<ApiResponse<ImagemCarrossel>> {
    return apiService.post<ImagemCarrossel>('/api/imagens-carrossel', payload);
  }

  deleteImagem(id: number): Promise<ApiResponse<void>> {
    return apiService.delete<void>(`/api/imagens-carrossel/${id}`);
  }
}

export default new CarrosselService();
