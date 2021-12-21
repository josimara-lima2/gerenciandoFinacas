import Home from 'pages/Home';
import Settings from 'pages/Settings';
import Cadastro from 'pages/Cadastro';
import { Route, Routes } from 'react-router-dom';

export default function CustomRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
