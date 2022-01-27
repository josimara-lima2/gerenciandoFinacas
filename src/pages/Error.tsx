import { Typography, Box, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import error from '../assets/images/error404.png';

const Error = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <img width="30%" src={error} alt="error 404" />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',

          justifyContent: 'center',
        }}
      >
        <Typography variant="h1" sx={{ fontWeight: 'bold' }}>
          Error 404
        </Typography>

        <Typography variant="subtitle1" sx={{ fontSize: '20px' }}>
          A página encontra-se indisponível ou não existe
        </Typography>
      </Box>
      <Button
        onClick={handleClick}
        sx={{
          marginTop: '32px',
          textTransform: 'none',
          fontSize: '20px',
          padding: '10px 32px',
        }}
        variant="outlined"
      >
        Voltar para home
      </Button>
    </Box>
  );
};

export default Error;
