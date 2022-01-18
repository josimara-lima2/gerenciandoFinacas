import Home from 'pages/Home';
import Settings from 'pages/Settings';
import Clients from 'pages/Clients';
import { Route, Routes } from 'react-router-dom';
import PrivateRouter from 'PrivateRoutes';
import LoginRegister from 'pages/Login_Register';
import Compra from 'pages/Compras';
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
      <Route path="*" element={<Home />} />
      <Route path="/login" element={<LoginRegister />} />
    </Routes>
  );
}
