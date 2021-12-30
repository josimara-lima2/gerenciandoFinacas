/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTheme } from '@mui/material';
import useChangeTheme from 'hooks/useChangeTheme';
import CustomRoutes from 'routes';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  const theme = useTheme();
  const changeTheme = useChangeTheme();

  const toggleTheme = () => {
    const nextPaletteType = theme.palette.mode === 'dark' ? 'light' : 'dark';
    changeTheme({ type: 'CHANGE', payload: { paletteType: nextPaletteType } });
  };

  // eslint-disable-next-line no-console

  return (
    <BrowserRouter>
      <CustomRoutes />
    </BrowserRouter>
  );
};

export default App;
