import CustomRoutes from 'routes';
import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const App = () => {
  useEffect(() => {
    let token = '';
    const tokenLocal = localStorage.getItem('token') as string;
    if (tokenLocal) {
      token = tokenLocal.replace(/^"(.*)"$/, '$1');
    }
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }, []);

  return (
    <BrowserRouter>
      <CustomRoutes />
    </BrowserRouter>
  );
};

export default App;
