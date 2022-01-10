// AuthContext.tsx

import { createContext, ReactNode, useEffect } from 'react';
import { apiUser } from '../services/apiUser';

type AuthProviderProps = {
  children: ReactNode;
};
type Login = {
  email: string;
  password: string;
};
interface AuthContextInterface {
  signin: ({ email, password }: Login) => Promise<void>;
}

const addTokenInApi = (token: string) => {
  apiUser.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const AuthContext = createContext({} as AuthContextInterface);

export default function AuthProvider({ children }: AuthProviderProps) {
  useEffect(() => {
    const tokenLocal = localStorage.getItem('token') as string;
    const token = tokenLocal ? tokenLocal.replace(/^"(.*)"$/, '$1') : '';
    addTokenInApi(token);
  }, []);

  const signin = async (login: Login) => {
    const response = await apiUser.post('auth/signin', login);
    localStorage.setItem('token', response.data.token);
    addTokenInApi(response.data.token);
    return response.data;
  };

  return (
    <AuthContext.Provider value={{ signin }}>{children}</AuthContext.Provider>
  );
}
