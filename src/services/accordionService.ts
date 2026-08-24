import apiService from './api';
import type { ApiResponse } from './api';
import type { Accordion, CreateAccordionRequest } from '../types/accordion';

class AccordionService {
  create(payload: CreateAccordionRequest): Promise<ApiResponse<Accordion>> {
    return apiService.post<Accordion>('/api/accordions', payload);
  }

  getByPagina(paginaId: number): Promise<ApiResponse<Accordion[]>> {
    return apiService.get<Accordion[]>(`/api/accordions/pagina/${paginaId}`);
  }

  delete(id: number): Promise<ApiResponse<void>> {
    return apiService.delete<void>(`/api/accordions/${id}`);
  }
}

export default new AccordionService();
