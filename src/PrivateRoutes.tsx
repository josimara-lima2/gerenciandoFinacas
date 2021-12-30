import Layout from 'components/Layout';
import React from 'react';
import { Navigate } from 'react-router-dom';

type PrivateRoute = {
  children: React.ReactNode;
};

const PrivateRouter = ({ children }: PrivateRoute) => {
  const tokenString = localStorage.getItem('token');
  const token = tokenString?.replace(/^"(.*)"$/, '$1');

  return token ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};

export default PrivateRouter;
