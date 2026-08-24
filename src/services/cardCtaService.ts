import apiService from './api';
import type { ApiResponse } from './api';
import type { CardCta, CreateCardCtaRequest } from '../types/cardCta';

class CardCtaService {
  create(payload: CreateCardCtaRequest): Promise<ApiResponse<CardCta>> {
    return apiService.post<CardCta>('/api/cards-cta', payload);
  }

  getByPagina(paginaId: number): Promise<ApiResponse<CardCta[]>> {
    return apiService.get<CardCta[]>(`/api/cards-cta/pagina/${paginaId}`);
  }

  delete(id: number): Promise<ApiResponse<void>> {
    return apiService.delete<void>(`/api/cards-cta/${id}`);
  }
}

export default new CardCtaService();
