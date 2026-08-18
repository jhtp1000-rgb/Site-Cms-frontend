const isDevelopment = import.meta.env.MODE === 'development';

export const API_URL =
  import.meta.env.VITE_API_URL || (isDevelopment ? 'http://localhost:8080' : '/api');

export const APP_NAME = import.meta.env.VITE_CITY_NAME;

if (isDevelopment) {
  console.log('Configuração atual:', { API_URL, APP_NAME, mode: import.meta.env.MODE });
}
