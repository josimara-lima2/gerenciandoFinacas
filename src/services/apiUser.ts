import axios from 'axios';

if (localStorage.token !== null) {
  const token = localStorage.getItem('token') as string;
  axios.defaults.headers.common.Authorization = `Bearer ${token.replace(
    /^"(.*)"$/,
    '$1',
  )}`;
}
axios.defaults.headers.get['Content-Type'] = 'application/json';

export const apiUser = axios.create({
  baseURL: 'http://192.168.200.202:3003/',
  headers: {
    Authorization: axios.defaults.headers.common.Authorization,
    'content-type': 'application/json',
  },
});
