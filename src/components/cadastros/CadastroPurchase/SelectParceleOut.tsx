import React from 'react';
import { TextField, MenuItem, FormControl, InputLabel } from '@mui/material';

type Props = {
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  value: string | number;
  label?: string;
  sx?: any;
};

const styleTextField = {
  marginTop: '8px',
  marginBottom: '8px',
  width: '100%',
};
const SelectParceleOut = ({ onChange, value, label, sx }: Props) => {
  return (
    <FormControl sx={{ ...styleTextField }}>
      <InputLabel htmlFor="select" id="parceleOut" />
      <TextField
        required
        select
        id="select"
        value={value}
        label={label || 'Parcelar valor?'}
        onChange={onChange}
        sx={{ ...styleTextField, ...sx }}
      >
        <MenuItem value={0}>nao</MenuItem>
        <MenuItem value={1}>sim</MenuItem>
      </TextField>
    </FormControl>
  );
};

export default SelectParceleOut;
