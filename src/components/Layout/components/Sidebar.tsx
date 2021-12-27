import {
  Box as MuiBox,
  styled,
  Typography,
  ListItem,
  ListItemIcon,
} from '@mui/material';
import { Link as MuiLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CreditCardIcon from '@mui/icons-material/CreditCard';

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
  alignItems: 'space-between',
  padding: '3px',
}));

export default function Sidebar() {
  return (
    <Box>
      <ListItem button>
        <Link to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <Typography>Home</Typography>
        </Link>
      </ListItem>

      <ListItem button>
        <Link to="/clients">
          <ListItemIcon>
            <HowToRegIcon />
          </ListItemIcon>
          <Typography>Clients</Typography>
        </Link>
      </ListItem>

      <ListItem button>
        <Link to="/credit-card">
          <ListItemIcon>
            <CreditCardIcon />
          </ListItemIcon>
          <Typography>Cartoes</Typography>
        </Link>
      </ListItem>
      <ListItem button>
        <Link to="/settings">
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <Typography>Settings</Typography>
        </Link>
      </ListItem>
    </Box>
  );
}
