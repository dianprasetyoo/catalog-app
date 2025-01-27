import axios from 'axios';

const API_URL = 'https://my-json-server.typicode.com/dianprasetyoo/catalog-api';

export const httpService = {
  get: async (endpoint: string) => {
    const response = await axios.get(`${API_URL}${endpoint}`);
    return response.data;
  },
  post: async (endpoint: string, data: unknown) => {
    const response = await axios.post(`${API_URL}${endpoint}`, data);
    return response.data;
  },
  put: async (endpoint: string, data: unknown) => {
    const response = await axios.put(`${API_URL}${endpoint}`, data);
    return response.data;
  },
  delete: async (endpoint: string) => {
    const response = await axios.delete(`${API_URL}${endpoint}`);
    return response.data;
  },
};
