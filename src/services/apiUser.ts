import axios from 'axios';

export const apiUser = axios.create({
  baseURL: 'http://192.168.200.202:3003/',
  headers: {
    'Content-type': 'application/json',
  },
});

const tokenLocal = localStorage.getItem('token') as string;
apiUser.defaults.headers.common.Authorization = `Bearer ${tokenLocal}`;
