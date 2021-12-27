import Home from 'pages/Home';
import Settings from 'pages/Settings';
import Clients from 'pages/Clients';
import TelaCadastro from 'pages/TelaCadastro';
import { Route, Routes } from 'react-router-dom';
import PrivateRouter from 'PrivateRoutes';
import Login from 'pages/Login';
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
        path="/cartoes"
        element={
          <PrivateRouter>
            <Cartao />
          </PrivateRouter>
        }
      />
      <Route path="/cadastro" element={<TelaCadastro />} />
      <Route path="*" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
