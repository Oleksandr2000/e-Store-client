import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://deviceshop.herokuapp.com/',
});

instance.interceptors.request.use((config: any) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export default instance;
