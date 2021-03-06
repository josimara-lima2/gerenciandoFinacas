import React from 'react';
import { Link as MuiLink } from 'react-router-dom';
import {
  styled,
  Typography,
  ListItemIcon as MuiListItemIcon,
} from '@mui/material';
import useColorBlue from 'hooks/useColorBlue';

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

  '&:hover': {
    opacity: 0.6,
  },
}));

const ListItemIcon = styled(MuiListItemIcon)(() => ({
  margin: '5px 10px 5px 20px',
}));

type Props = {
  pathname: string;
  to: string;
  Icon: React.ReactNode;
  title: string;
};

const ItemMenuNavbar = ({ pathname, to, Icon, title }: Props) => {
  const { color } = useColorBlue();
  return (
    <Link to={to} sx={{ backgroundColor: pathname === to ? color : '' }}>
      <ListItemIcon>{Icon}</ListItemIcon>
      <Typography>{title}</Typography>
    </Link>
  );
};

export default ItemMenuNavbar;
