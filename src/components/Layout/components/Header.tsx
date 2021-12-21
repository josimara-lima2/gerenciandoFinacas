import {
  AppBar as MuiAppBar,
  Box,
  IconButton,
  styled,
  Toolbar,
  useTheme,
} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import useChangeTheme from 'hooks/useChangeTheme';

const AppBar = styled(MuiAppBar)(({ theme: { palette } }) => ({
  backgroundColor: palette.background.paper,
}));

export default function Header() {
  const { palette } = useTheme();
  const changeTheme = useChangeTheme();
  const { mode } = palette;

  const toggleTheme = () => {
    const nextPaletteType = mode === 'dark' ? 'light' : 'dark';
    changeTheme({ type: 'CHANGE', payload: { paletteType: nextPaletteType } });
  };

  return (
    <AppBar elevation={0} position="relative">
      <Toolbar>
        <Box flexGrow={1}>Header</Box>
        <IconButton onClick={toggleTheme}>
          {mode === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
