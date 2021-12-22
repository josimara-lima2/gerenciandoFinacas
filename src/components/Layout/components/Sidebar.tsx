import {
  Box as MuiBox,
  Button as MuiButton,
  styled,
  Typography,
} from '@mui/material';
import { Link as MuiLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import HowToRegIcon from '@mui/icons-material/HowToReg';

const Box = styled(MuiBox)(({ theme }) => ({
  width: theme.spacing(30), // spacing de 1 corresponde a 8px
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
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
  padding: '3px',
}));

const Button = styled(MuiButton)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));
export default function Sidebar() {
  return (
    <Box>
      <Button>
        <Link to="/">
          <HomeIcon color="action" sx={{ marginRight: '10px' }} />
          <Typography>Home</Typography>
        </Link>
      </Button>
      <Button>
        <Link to="/settings">
          <SettingsIcon color="action" sx={{ marginRight: '10px' }} />
          <Typography>Settings</Typography>
        </Link>
      </Button>
      <Button>
        <Link to="/cadastro">
          <HowToRegIcon color="action" sx={{ marginRight: '10px' }} />
          <Typography>Cadastro</Typography>
        </Link>
      </Button>
      <Button>
        <Link to="/login">
          <HowToRegIcon color="action" sx={{ marginRight: '10px' }} />
          <Typography>Login</Typography>
        </Link>
      </Button>
    </Box>
  );
}
