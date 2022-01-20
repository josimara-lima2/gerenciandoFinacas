import React from 'react';
import { TextField as MuiTextField, styled } from '@mui/material';

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

type Props = {
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  value: string;
  label: string;
};

// componente para telas de login e cadastro de usuário
const TextField = ({ onChange, value, label }: Props) => {
  return (
    <TextFieldStyle
      variant="outlined"
      required
      label={label}
      id={label.toLowerCase()}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextField;
