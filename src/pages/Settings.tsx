import {
  Avatar,
  Box as MuiBox,
  Typography,
  Collapse,
  IconButton,
  Tooltip,
  styled,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { UserLogadoSelector, fetchApiAuthMe } from 'store/reducers/userLogado';
import FeedIcon from '@mui/icons-material/Feed';
import { fetchApiPageCard, PageCardSelector } from 'store/reducers/pageCard';
import { fetchApiPage, PageSelector } from 'store/reducers/pageClient';
import { fetchApiPurchases, purchasesSelector } from 'store/reducers/compras';

import CardPersonalizado from 'components/Card/Card';
import avatarImg from '../assets/images/avatar.png';
import clientsImg from '../assets/images/clients.png';
import comprasImg from '../assets/images/compras.png';
import cardImg from '../assets/images/card.png';

const BoxCard = styled(MuiBox)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));
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
    <MuiBox>
      <MuiBox sx={{ display: 'flex', alignItems: 'center' }}>
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
      </MuiBox>
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
      <BoxCard>
        <CardPersonalizado
          title="Total de Clientes"
          toLink="/clients"
          img={clientsImg}
        >
          O sistema possui um total de {totalCliente} clientes. Para acessar
          mais informações click no link abaixo.
        </CardPersonalizado>

        <CardPersonalizado
          title="Total de Compras"
          toLink="/purchases"
          img={comprasImg}
        >
          O sistema possui um total de {totalCompras} Compras. Para acessar mais
          informações click no link abaixo.
        </CardPersonalizado>

        <CardPersonalizado
          title="Total de Cartões"
          toLink="/credit-card"
          img={cardImg}
        >
          O sistema possui um total de {totalCard} Cartões. Para acessar mais
          informações click no link abaixo.
        </CardPersonalizado>
      </BoxCard>
    </MuiBox>
  );
}
