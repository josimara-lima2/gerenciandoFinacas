import React from 'react';
import {
  TextField as MuiTextField,
  styled,
  TextFieldProps,
} from '@mui/material';

const TextFieldStyle = styled(MuiTextField)(({ theme }) => ({
  margin: '5px',
  width: '60%',
  borderRadius: '20px',
  color: theme.palette.mode === 'dark' ? '#000000' : '#fafafa',
  [theme.breakpoints.down('xs')]: {
    width: '100%',
  },
  [theme.breakpoints.down('md')]: {
    width: '80%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '40%',
  },
}));

// componente para telas de login e cadastro de usuário
const TextField = (props: TextFieldProps) => {
  return <TextFieldStyle {...props} />;
};

export default TextField;
