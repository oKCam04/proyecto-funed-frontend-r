import axios from 'axios';

const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:3000';

export const axiosClient = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

// Request: adjunta token si existe
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // o desde AuthContext si lo prefieres
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response: manejo básico de errores y 401
axiosClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error?.response?.status;

    // ejemplo: si llega 401 podrías desloguear o intentar refresh
    if (status === 401) {
      // opcional: disparar logout global, limpiar storage, navegar a login, etc.
      // window.dispatchEvent(new Event('auth-changed'));
    }

    // Propaga el error para que el caller lo maneje
    return Promise.reject(error);
  }
);

export default axiosClient;
