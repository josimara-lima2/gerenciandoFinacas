import Home from 'pages/Home';
import Settings from 'pages/Settings';
import TelaCadastro from 'pages/TelaCadastro';
import { Route, Routes } from 'react-router-dom';
import PrivateRouter from 'PrivateRoutes';
import Login from 'pages/Login';
import Cadastro from 'components/Cadastro/Cadastro';

export default function CustomRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/settings"
        element={
          <PrivateRouter>
            <Settings />
          </PrivateRouter>
        }
      />
      <Route
        path="/cadastro"
        element={
          <PrivateRouter>
            <TelaCadastro />
          </PrivateRouter>
        }
      />
      <Route path="*" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
