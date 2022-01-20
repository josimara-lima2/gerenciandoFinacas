import { useTheme } from '@mui/material';
import React from 'react';

const useColorBlue = () => {
  const theme = useTheme();
  const [color, setColor] = React.useState('');

  React.useEffect(() => {
    setColor(theme.palette.primary.main);
  }, [theme]);
  return { color };
};

export default useColorBlue;
