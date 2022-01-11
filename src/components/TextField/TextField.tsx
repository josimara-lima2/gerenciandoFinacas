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
  id: string;
  label: string;
  variant: 'filled' | 'outlined' | 'standard' | undefined;
  value: string;
  required: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

// componente para telas de login e cadastro de usuário
const TextField = ({
  id,
  label,
  variant,
  value,
  required,
  onChange,
}: Props) => {
  return (
    <TextFieldStyle
      id={id}
      label={label}
      variant={variant}
      required={required}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextField;
