import axios from 'axios';

const CepApi = axios.create({
  baseURL: process.env.REACT_APP_CONTAFUTURO_API_CEP,
});

export default CepApi;
