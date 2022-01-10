import {
  Avatar,
  Box,
  Typography,
  Collapse,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { UserLogadoSelector, fetchApiAuthMe } from 'store/reducers/userLogado';
import FeedIcon from '@mui/icons-material/Feed';
import avatarImg from '../assets/images/avatar.png';

export default function Settings() {
  const dispatch = useAppDispatch();

  const { userLogado } = useAppSelector(UserLogadoSelector);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchApiAuthMe());
  }, []);

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          sx={{
            width: 36,
            height: 36,
            padding: '5px',
            border: '1px solid #000000',
            backgroundColor: '#fafafa',
            marginTop: '15px',
          }}
          alt={userLogado.name}
          src={userLogado.avatarUrl !== null ? userLogado.avatarUrl : avatarImg}
        />
        <Typography variant="h5" sx={{ marginTop: '10px', marginLeft: '5px' }}>
          Olá, {userLogado.name}!
        </Typography>
      </Box>
      <Tooltip title={open ? 'esconder dados ' : 'ver dados'} placement="right">
        <IconButton onClick={() => setOpen(!open)} sx={{ marginTop: '30px' }}>
          <FeedIcon />
        </IconButton>
      </Tooltip>
      <Collapse in={open} sx={{ marginTop: '30px' }}>
        <Typography>Name: {userLogado.name}</Typography>
        <Typography>Email: {userLogado.email}</Typography>
        <Typography>AvatarURL: {userLogado.avatarUrl}</Typography>
        <Typography>ID: {userLogado.id}</Typography>
      </Collapse>
    </Box>
  );
}
