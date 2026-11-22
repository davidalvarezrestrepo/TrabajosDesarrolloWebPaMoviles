import axios, { type AxiosError } from 'axios';

const apiKey = import.meta.env.VITE_GIPHY_API_KEY as string | undefined;

if (!apiKey) {
  throw new Error('Falta VITE_GIPHY_API_KEY en el archivo .env');
}

// Una instancia por backend (diapositiva 28)
export const giphyApi = axios.create({
  baseURL: 'https://api.giphy.com/v1/gifs',
  timeout: 10000,
});

// Interceptor de petición: agrega la API key y los parámetros comunes a todas las llamadas
giphyApi.interceptors.request.use((config) => {
  config.params = { api_key: apiKey, lang: 'es', rating: 'g', ...config.params };
  return config;
});

// Interceptor de respuesta: convierte los errores HTTP en mensajes en español
giphyApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (axios.isCancel(error)) return Promise.reject(error);

    const status = error.response?.status;
    let mensaje: string;
    if (status === 429) mensaje = 'Se alcanzó el límite de 100 búsquedas por hora. Intenta más tarde.';
    else if (status === 401 || status === 403) mensaje = 'La API key de GIPHY no es válida. Revisa el archivo .env.';
    else if (error.code === 'ECONNABORTED') mensaje = 'GIPHY tardó demasiado en responder.';
    else if (!error.response) mensaje = 'Sin conexión a internet.';
    else mensaje = `Error ${status} al consultar GIPHY.`;

    return Promise.reject(new Error(mensaje));
  },
);