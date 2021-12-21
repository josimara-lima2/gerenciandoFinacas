import axios from 'axios';

export const apiUser = axios.create({
  baseURL: 'http://192.168.200.202:3003/',
});
