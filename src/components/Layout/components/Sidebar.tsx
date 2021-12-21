import { Box as MuiBox, styled } from '@mui/material';
import { Link } from 'react-router-dom';

const Box = styled(MuiBox)(({ theme }) => ({
  width: theme.spacing(30), // spacing de 1 corresponde a 8px
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
}));

export default function Sidebar() {
  return (
    <Box>
      <Link to="/">Home</Link>
      <Link to="/settings">Settings</Link>
      <Link to="/cadastro">Cadastro</Link>
    </Box>
  );
}
