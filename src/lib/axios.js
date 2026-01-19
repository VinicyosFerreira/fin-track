import axios from 'axios';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constant/local-storage';

const publicApi = axios.create({
  baseURL: 'https://fullstackclub-finance-dashboard-api.onrender.com',
});

const protectedApi = axios.create({
  baseURL: 'https://fullstackclub-finance-dashboard-api.onrender.com',
});

protectedApi.interceptors.request.use((request) => {
  // buscar o token no localstorage
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

  // verificar se existe o access token
  if (!accessToken) return request;

  // adicionar as requisições da aplicação o token com autorização
  request.headers.Authorization = `Bearer ${accessToken}`;
  return request;
});

protectedApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    // verificar se o refresh token existe
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

    // se ele nao existir retornar o erro
    if (!refreshToken) return Promise.reject(error);

    const request = error.config;

    if (
      error.response.status === 401 &&
      !request._retry &&
      !request.url.includes('api/users/refresh-token')
    ) {
      request._retry = true;
      try {
        const response = await protectedApi.post('/api/users/refresh-token', {
          refreshToken,
        });

        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;

        localStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken);

        return protectedApi(request);
      } catch (error) {
        console.log(error);
      }
    }

    return Promise.reject(error);
  }
);

export { protectedApi, publicApi };
