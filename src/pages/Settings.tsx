import {
  Avatar,
  Box,
  Typography,
  Collapse,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { UserLogadoSelector, fetchApiAuthMe } from 'store/reducers/userLogado';
import FeedIcon from '@mui/icons-material/Feed';
import { fetchApiPageCard, PageCardSelector } from 'store/reducers/pageCard';
import { fetchApiPage, PageSelector } from 'store/reducers/pageClient';
import { fetchApiPurchases, purchasesSelector } from 'store/reducers/compras';
import { Link } from 'react-router-dom';
import avatarImg from '../assets/images/avatar.png';

export default function Settings() {
  const dispatch = useAppDispatch();
  const { pageCard } = useAppSelector(PageCardSelector);
  const { pageCliente } = useAppSelector(PageSelector);
  const { pagePurchases } = useAppSelector(purchasesSelector);
  const { userLogado } = useAppSelector(UserLogadoSelector);
  const [open, setOpen] = useState(false);

  const totalCard = pageCard.totalCount;
  const totalCliente = pageCliente.totalCount;
  const totalCompras = pagePurchases.totalCount;
  useEffect(() => {
    dispatch(fetchApiAuthMe());
    dispatch(fetchApiPage(null));
    dispatch(fetchApiPageCard(null));
    dispatch(fetchApiPurchases(null));
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
      <Box
        sx={{
          display: 'flex',

          justifyContent: 'space-between',
        }}
      >
        <Card sx={{ width: '300px' }}>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography>Cartões</Typography>
            {totalCard}
          </CardContent>
          <CardActions>
            <Link
              style={{ textDecoration: 'none', color: '#1c83ff' }}
              to="/credit-card"
            >
              Ver mais
            </Link>
          </CardActions>
        </Card>
        <Card sx={{ width: '300px' }}>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography>Compras</Typography>
            {totalCompras}
          </CardContent>
          <CardActions>
            <Link
              style={{ textDecoration: 'none', color: '#1c83ff' }}
              to="/purchases"
            >
              Ver mais
            </Link>
          </CardActions>
        </Card>
        <Card sx={{ width: '300px' }}>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography>Clientes</Typography>
            {totalCliente}
          </CardContent>
          <CardActions>
            <Link
              style={{ textDecoration: 'none', color: '#1c83ff' }}
              to="/clients"
            >
              Ver mais
            </Link>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
}
