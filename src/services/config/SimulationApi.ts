import axios from 'axios';

const SimulationApi = axios.create({
  baseURL: process.env.REACT_APP_SIMULATION_API,
});

SimulationApi.interceptors.request.use((config) => {
  const isLoggedToken = localStorage.getItem('@Contafuturo.token');
  const configRequest = config;

  if (isLoggedToken) {
    configRequest.headers = {
      authorization: `Bearer ${isLoggedToken}`,
    };
  }

  return configRequest;
});

export default SimulationApi;
