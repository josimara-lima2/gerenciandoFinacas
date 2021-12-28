import axios from 'axios';

export const apiUser = axios.create({
  baseURL: 'http://192.168.200.202:3003/',
});

if (localStorage.token) {
  const token = localStorage.getItem('token') as string;
  const auth = token.replace(/^"(.*)"$/, '$1');
  apiUser.defaults.headers.common = { Authorization: 'Bearer '.concat(auth) };
}
