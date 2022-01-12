import React from 'react';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

type Props = {
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  value: string | number;
  label: string;
  sx?: any;
  placeholder?: string;
  icon?: React.ReactNode;
};

const TextFieldCadastro = ({
  onChange,
  value,
  sx,
  label,
  placeholder,
  icon,
}: Props) => {
  return (
    <TextField
      id={label.toLowerCase()}
      label={label}
      variant="outlined"
      required
      onChange={onChange}
      placeholder={placeholder || ''}
      value={value}
      sx={{ ...sx, marginTop: '8px', marginBottom: '8px', width: '100%' }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{icon}</InputAdornment>
        ),
      }}
    />
  );
};

export default TextFieldCadastro;
