import { useContext } from 'react';
import { AuthContext } from '../contexts/LoginContext';

export default function useAuth() {
  const authContext = useContext(AuthContext);
  return authContext;
}
