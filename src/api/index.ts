import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
});

api.defaults.headers.common['x-api-token'] = import.meta.env.VITE_SECRET_TOKEN;

export default api;
