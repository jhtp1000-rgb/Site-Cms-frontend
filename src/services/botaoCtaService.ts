import apiService from './api';
import type { ApiResponse } from './api';
import type { BotaoCta, CreateBotaoCtaRequest } from '../types/botaoCta';

class BotaoCtaService {
  create(payload: CreateBotaoCtaRequest): Promise<ApiResponse<BotaoCta>> {
    return apiService.post<BotaoCta>('/api/botoes-cta', payload);
  }

  getByPagina(paginaId: number): Promise<ApiResponse<BotaoCta[]>> {
    return apiService.get<BotaoCta[]>(`/api/botoes-cta/pagina/${paginaId}`);
  }

  delete(id: number): Promise<ApiResponse<void>> {
    return apiService.delete<void>(`/api/botoes-cta/${id}`);
  }
}

export default new BotaoCtaService();
