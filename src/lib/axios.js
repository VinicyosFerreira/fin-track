import axios from 'axios';

import { ACCESS_TOKEN_KEY } from '@/constant/local-storage';

const api = axios.create({
  baseURL: 'https://fullstackclub-finance-dashboard-api.onrender.com',
});

api.interceptors.request.use((request) => {
  // buscar o token no localstorage
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

  // verificar se existe o access token
  if (!accessToken) return request;

  // adicionar as requisições da aplicação o token com autorização
  request.headers.Authorization = `Bearer ${accessToken}`;
  return request;
});

export default api;
