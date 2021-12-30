import {
  Box as MuiBox,
  styled,
  Typography,
  ListItemIcon as MuiListItemIcon,
} from '@mui/material';
import { Link as MuiLink, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Box = styled(MuiBox)(({ theme }) => ({
  // spacing de 1 corresponde a 8px
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  height: `calc(100vh - 65px)`,
}));

const Link = styled(MuiLink)(({ theme }) => ({
  width: '100%',
  textDecoration: 'none',
  fontSize: theme.spacing(2),
  borderRadius: 0,
  color:
    theme.palette.mode === 'dark'
      ? theme.palette.grey[100]
      : theme.palette.grey[900],
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  marginBottom: '8px',
  padding: '3px',
  height: '50px',
}));

const ListItemIcon = styled(MuiListItemIcon)(() => ({
  margin: '5px 20px',
}));

export default function Sidebar() {
  const rota = useLocation();

  return (
    <Box>
      <Link
        to="/"
        sx={{ backgroundColor: rota.pathname === '/' ? '#1C86EE' : '' }}
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <Typography>Inicio</Typography>
      </Link>

      <Link
        to="/clients"
        sx={{ backgroundColor: rota.pathname === '/clients' ? '#1C86EE' : '' }}
      >
        <ListItemIcon>
          <HowToRegIcon />
        </ListItemIcon>
        <Typography>Clientes</Typography>
      </Link>

      <Link
        to="/credit-card"
        sx={{
          backgroundColor: rota.pathname === '/credit-card' ? '#1C86EE' : '',
        }}
      >
        <ListItemIcon>
          <CreditCardIcon />
        </ListItemIcon>
        <Typography>Cartões</Typography>
      </Link>

      <Link
        to="/compra"
        sx={{
          backgroundColor: rota.pathname === '/compra' ? '#1C86EE' : '',
        }}
      >
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <Typography>Compras</Typography>
      </Link>

      <Link
        to="/settings"
        sx={{
          backgroundColor: rota.pathname === '/settings' ? '#1C86EE' : '',
        }}
      >
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <Typography>Configurações</Typography>
      </Link>
    </Box>
  );
}
