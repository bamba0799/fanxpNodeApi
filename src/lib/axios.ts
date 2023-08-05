import axios from 'axios';

export const axiosSMSInstance = axios.create({
  baseURL: 'https://api.orange.com',
});
