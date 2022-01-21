import { Box as MuiBox, styled } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { fetchApiAuthMe } from 'store/reducers/userLogado';
import { fetchApiPageCard, PageCardSelector } from 'store/reducers/cartoes';
import { fetchApiPage, PageSelector } from 'store/reducers/clientes';
import { fetchApiPurchases, purchasesSelector } from 'store/reducers/compras';
import CardPersonalizado from 'components/Card';
import clientsImg from '../assets/images/clients.png';
import comprasImg from '../assets/images/compras.png';
import cardImg from '../assets/images/card.png';

const BoxCard = styled(MuiBox)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: theme.spacing(2),
  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
  },
}));

export default function Settings() {
  const dispatch = useAppDispatch();
  const { pageCard } = useAppSelector(PageCardSelector);
  const { pageCliente } = useAppSelector(PageSelector);
  const { pagePurchases } = useAppSelector(purchasesSelector);

  const totalCard = pageCard.totalCount;
  const totalCliente = pageCliente.totalCount;
  const totalCompras = pagePurchases.totalCount;
  useEffect(() => {
    dispatch(fetchApiAuthMe());
    dispatch(fetchApiPage(null));
    dispatch(fetchApiPageCard(null));
    dispatch(fetchApiPurchases(null));
  }, [dispatch]);

  return (
    <BoxCard>
      <CardPersonalizado
        title="Total de Clientes"
        toLink="/clients"
        img={clientsImg}
      >
        O sistema possui um total de {totalCliente} clientes. Para acessar mais
        informações click no link abaixo.
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
  );
}
