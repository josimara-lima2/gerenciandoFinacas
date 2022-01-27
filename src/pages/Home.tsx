import { Box, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'store';
import { fetchApiAuthMe, UserLogadoSelector } from 'store/reducers/userLogado';
import React from 'react';
import avatar from '../assets/images/avatarHome.png';
import welcome from '../assets/images/welcome.png';

export default function Home() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(UserLogadoSelector);
  const data = new Date();
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
  const dia = days[data.getDay()];
  const dd = data.getDate();
  const mm = months[data.getMonth()];
  const aa = data.getFullYear();

  React.useEffect(() => {
    dispatch(fetchApiAuthMe());
  }, []);

  return (
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
  );
}
