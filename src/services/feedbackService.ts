import apiService from './api';
import type { ApiResponse } from './api';
import type { Feedback, CreateFeedbackRequest } from '../types/feedback';

class FeedbackService {
  create(payload: CreateFeedbackRequest): Promise<ApiResponse<Feedback>> {
    return apiService.post<Feedback>('/api/feedbacks', payload);
  }

  getByPagina(paginaId: number): Promise<ApiResponse<Feedback[]>> {
    return apiService.get<Feedback[]>(`/api/feedbacks/pagina/${paginaId}`);
  }

  delete(id: number): Promise<ApiResponse<void>> {
    return apiService.delete<void>(`/api/feedbacks/${id}`);
  }
}

export default new FeedbackService();
