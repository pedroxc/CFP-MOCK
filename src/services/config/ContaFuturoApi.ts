import axios from 'axios';

const ContaFuturoApi = axios.create({
  baseURL: process.env.REACT_APP_CONTAFUTURO_API,
});

ContaFuturoApi.interceptors.request.use((config) => {
  const isLoggedToken = localStorage.getItem('@Contafuturo.token');
  const configRequest = config;

  if (isLoggedToken) {
    configRequest.headers = {
      authorization: `Bearer ${isLoggedToken}`,
    };
  }

  return configRequest;
});

export default ContaFuturoApi;
