import { useContext } from 'react';
import { AuthContext } from '../contexts/loginContext';

export default function useAuth() {
  const authContext = useContext(AuthContext);
  return authContext;
}
