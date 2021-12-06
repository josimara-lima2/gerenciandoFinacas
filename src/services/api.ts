import axios, { AxiosError } from 'axios';

export const apiEXAMPLE = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

function onResponseOnError(error: AxiosError): Promise<AxiosError> {
  if (error.response) {
    const { status } = error.response;
    if (status === 401) {
      // ...
    }
  }

  return Promise.reject(error);
}

axios.interceptors.response.use(undefined, onResponseOnError);
