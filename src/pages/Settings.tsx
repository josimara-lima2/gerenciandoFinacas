import {
  Avatar,
  Box,
  Typography,
  styled,
  Collapse,
  IconButton,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { logout } from 'store/reducers/user';
import { UserLogadoSelector, fetchApiAuthMe } from 'store/reducers/userLogado';
import { useNavigate } from 'react-router-dom';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import avatarImg from '../assets/images/avatar.png';

const ButtonLink = styled(Button)(({ theme }) => ({
  width: '100%',
  textDecoration: 'none',
  fontSize: theme.spacing(2),
  borderRadius: 0,
  backgroundColor: '#1C86EE',
  color: theme.palette.mode === 'dark' ? '#fafafa' : '#000000',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '8px',
  padding: '3px',
  height: '50px',

  '&:hover': {
    opacity: 0.8,
  },
}));

export default function Settings() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userLogado } = useAppSelector(UserLogadoSelector);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    dispatch(fetchApiAuthMe());
  }, []);

  const logoutUser = () => {
    dispatch(logout());
    navigate('/login');
  };
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'space-between',
        justifyContent: 'space-between',
        marginTop: '20px',
        borderRadius: '10px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'space-between',
          marginTop: '20px',
          borderRadius: '10px',
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: '10px' }}>
          Olá, {userLogado.name}!
        </Typography>
        <Collapse in={open}>
          <Typography>Name: {userLogado.name}</Typography>
          <Typography>Email: {userLogado.email}</Typography>
          <Typography>AvatarURL: {userLogado.avatarUrl}</Typography>
          <Typography>ID: {userLogado.id}</Typography>
        </Collapse>
      </Box>
      <Box
        sx={{
          width: 360,
          padding: '5px 10px',
          zIndex: 1,
          backgroundColor: '#F5F6FA',
          border: '1px solid #F5F6FA',
          color: '#000000',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '500px',
        }}
      >
        <Avatar
          sx={{
            width: 36,
            height: 36,
            padding: '5px',
            border: '1px solid #000000',
            marginBottom: '10px',
            marginTop: '15px',
          }}
          alt={userLogado.name}
          src={userLogado.avatarUrl !== null ? userLogado.avatarUrl : avatarImg}
        />
        <Typography>{userLogado.name}</Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            justifyContent: 'start',
            marginTop: '20px',
            borderRadius: '10px',
            width: '80%',
          }}
        >
          <ButtonLink onClick={() => setOpen(!open)}>
            <IconButton>
              <PersonOutlineOutlinedIcon />
            </IconButton>
            <Typography>Meus dados</Typography>
          </ButtonLink>
          <ButtonLink onClick={logoutUser}>
            <IconButton>
              <LogoutIcon />
            </IconButton>
            <Typography>Logout</Typography>
          </ButtonLink>
        </Box>
      </Box>
    </Box>
  );
}
