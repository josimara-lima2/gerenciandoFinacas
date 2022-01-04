import axios from 'axios';

const token = localStorage.getItem('token');
export const apiUser = axios.create({
  baseURL: 'http://192.168.200.202:3003/',
  headers: {
    Authorization: `Bearer ${token ? token.replace(/^"(.*)"$/, '$1') : ''}`,
    'content-type': 'application/json',
  },
});
