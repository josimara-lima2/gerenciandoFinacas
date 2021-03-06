import Home from 'pages/Home';
import Settings from 'pages/Settings';
import Clients from 'pages/Clients';
import { Route, Routes } from 'react-router-dom';
import PrivateRouter from 'PrivateRoutes';
import LoginRegister from 'pages/Login/Login_Register';
import Compra from 'pages/Compras';
import Error from 'pages/Error';

import Cartao from './pages/Cartoes';

export default function CustomRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRouter>
            <Home />
          </PrivateRouter>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRouter>
            <Settings />
          </PrivateRouter>
        }
      />
      <Route
        path="/clients"
        element={
          <PrivateRouter>
            <Clients />
          </PrivateRouter>
        }
      />
      <Route
        path="/credit-card"
        element={
          <PrivateRouter>
            <Cartao />
          </PrivateRouter>
        }
      />
      <Route
        path="/purchases"
        element={
          <PrivateRouter>
            <Compra />
          </PrivateRouter>
        }
      />
      <Route path="/cadastro" element={<LoginRegister />} />
      <Route
        path="*"
        element={
          <PrivateRouter>
            <Error />
          </PrivateRouter>
        }
      />
      <Route path="/login" element={<LoginRegister />} />

      <Route path="/login/*" element={<Error />} />
    </Routes>
  );
}
