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
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { logout } from '../../../store/reducers/user';

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color:
    theme.palette.mode === 'dark'
      ? theme.palette.grey[100]
      : theme.palette.grey[900],
}));

export default function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { palette } = useTheme();
  const changeTheme = useChangeTheme();
  const { mode } = palette;

  const toggleTheme = () => {
    const nextPaletteType = mode === 'dark' ? 'light' : 'dark';
    changeTheme({ type: 'CHANGE', payload: { paletteType: nextPaletteType } });
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar elevation={0} position="relative">
      <Toolbar>
        <Box flexGrow={1}>Finanças</Box>
        <IconButton onClick={toggleTheme}>
          {mode === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        <IconButton onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
