import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRouter = ({ children }: any) => {
  const tokenString = localStorage.getItem('token');
  const token = tokenString?.replace(/^"(.*)"$/, '$1');

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRouter;
