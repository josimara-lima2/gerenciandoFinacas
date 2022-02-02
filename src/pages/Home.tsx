import { Box, Typography, useTheme } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'store';
import { fetchApiAuthMe, UserLogadoSelector } from 'store/reducers/userLogado';
import React from 'react';
import { fetchApiPageCard, PageCardSelector } from 'store/reducers/cartoes';
import { fetchApiPage, PageSelector } from 'store/reducers/clientes';
import { fetchApiPurchases, purchasesSelector } from 'store/reducers/compras';
import Cadastro from 'components/CadastroCliente';

import Graph from 'components/Graph';
import avatar from '../assets/images/avatarHome.png';
import poseCliente from '../assets/images/poseCliente.png';

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday ',
];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function Home() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { pageCard } = useAppSelector(PageCardSelector);
  const { pageCliente } = useAppSelector(PageSelector);
  const { pagePurchases } = useAppSelector(purchasesSelector);

  const totalCard = pageCard.totalCount;
  const totalCliente = pageCliente.totalCount;
  const totalCompras = pagePurchases.totalCount;
  const data = [{ x: 'name', y: 0 }];
  if (totalCard > 0) {
    // pageCard.data.map(card => {
    //   if(card.availableLimit === 0){
    //     return;
    //   }else{
    //     data.push({ x: card.name, y: card.availableLimit })

    //   }

    // };
    let i = 0;
    pageCard.data.map(card => {
      if (card.availableLimit !== 0) {
        i += 1;
        return data.push({
          x: `${card.name}+${i}`,
          y: card.availableLimit,
        });
      }
      return null;
    });
  }

  React.useEffect(() => {
    dispatch(fetchApiPage(null));
    dispatch(fetchApiPageCard(null));
    dispatch(fetchApiPurchases(null));
  }, [dispatch]);

  // console.log(pageCard.data);
  // console.log(data);
  const user = useAppSelector(UserLogadoSelector);

  const date = new Date();
  // nova forma de tratar as datas
  console.log(
    date.toLocaleDateString('pt-br', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  );

  const dia = days[date.getDay()];
  const dd = date.getDate();
  const mm = months[date.getMonth()];
  const aa = date.getFullYear();

  React.useEffect(() => {
    dispatch(fetchApiAuthMe());
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',

        margin: '10px 50px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: '10px 50px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <img src={avatar} alt="avatar" />
          <Typography
            sx={{
              margin: '0px 20px',
              fontSize: '23px',
              fontFamily: 'Poppins, sans-serif',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: '34px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Hi, {user.userLogado.name}, <br />
            Bem vindo(a), ao sistema de finanças.
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: '20px',
              fontFamily: 'Poppins, sans-serif',
              lineHeight: '30px',
              display: 'flex',
              alignItems: 'center',
              textAlign: 'center',
              fontStyle: 'normal',
              fontWeight: 500,
            }}
          >
            {dd} {mm} {aa}
          </Typography>
          <Typography
            sx={{
              fontSize: '20px',
              fontFamily: 'Poppins, sans-serif',
              lineHeight: '30px',
              display: 'flex',
              alignItems: 'center',
              textAlign: 'center',
              fontStyle: 'normal',
              fontWeight: 300,
            }}
          >
            {dia}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',

          justifyContent: 'space-between',
        }}
      >
        <Box
          boxShadow={2}
          sx={{
            width: '335px',
            height: '165px',
            marginLeft: '40px',
            marginTop: '5rem',
            boxSizing: 'border-box',
            display: 'flex',

            alignItems: 'center',
            justifyContent: 'space-around',
            padding: '8px 16px',
          }}
        >
          <img style={{ width: '40px' }} src={poseCliente} alt="cliente" />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 500,
                fontStyle: 'normal',
                fontSize: '20px',
                lineHeight: '30px',
                display: 'flex',

                alignItems: 'center',

                letterSpacing: '0.02em',
              }}
            >
              Total de clientes
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 'normal',
                fontStyle: 'normal',
                fontSize: '20px',
                lineHeight: '30px',
                display: 'flex',

                alignItems: 'center',

                letterSpacing: '0.02em',
              }}
            >
              {totalCliente || 0}
            </Typography>
            <Cadastro />
          </Box>
        </Box>

        <Graph />
      </Box>
    </Box>
  );
}
