import CustomRoutes from 'routes';
import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const App = () => {
  return (
    <BrowserRouter>
      <CustomRoutes />
    </BrowserRouter>
  );
};

export default App;
