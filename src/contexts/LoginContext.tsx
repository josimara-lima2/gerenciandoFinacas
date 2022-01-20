import { createContext, ReactNode, useCallback, useEffect } from 'react';
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

export const AuthContext = createContext({} as AuthContextInterface);

export default function AuthProvider({ children }: AuthProviderProps) {
  const addTokenInApi = useCallback((token: string) => {
    apiUser.defaults.headers.common.Authorization = `Bearer ${token}`;
  }, []);

  useEffect(() => {
    const tokenLocal = localStorage.getItem('token') as string;
    if (tokenLocal) {
      addTokenInApi(tokenLocal);
    }
  }, [addTokenInApi]);

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
