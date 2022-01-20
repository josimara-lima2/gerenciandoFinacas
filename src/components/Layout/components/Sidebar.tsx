import { Box as MuiBox, styled } from '@mui/material';
import { useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ItemMenuSidebar from 'components/Layout/components/ItemMenuSidebar';

const Box = styled(MuiBox)(({ theme }) => ({
  // spacing de 1 corresponde a 8px
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  height: `calc(100vh - 65px)`,
}));

export default function Sidebar() {
  const rota = useLocation();

  return (
    <Box>
      <ItemMenuSidebar
        title="Inicio"
        Icon={<HomeIcon />}
        to="/"
        pathname={rota.pathname}
      />

      <ItemMenuSidebar
        title="Clientes"
        Icon={<HowToRegIcon />}
        to="/clients"
        pathname={rota.pathname}
      />

      <ItemMenuSidebar
        title="Cartões"
        Icon={<CreditCardIcon />}
        to="/credit-card"
        pathname={rota.pathname}
      />

      <ItemMenuSidebar
        title="Compras"
        Icon={<ShoppingCartIcon />}
        to="/purchases"
        pathname={rota.pathname}
      />
      <ItemMenuSidebar
        title="Configurações"
        Icon={<SettingsIcon />}
        to="/settings"
        pathname={rota.pathname}
      />
    </Box>
  );
}
