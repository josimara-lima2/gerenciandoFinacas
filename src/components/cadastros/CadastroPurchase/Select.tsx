import React from 'react';
import { TextField, MenuItem } from '@mui/material';
import { ClientInterface } from 'store/reducers/pageClient';
import { CardInterface } from 'store/reducers/pageCard';

const styleTextField = {
  margin: '8px 0',
  width: '100%',
};
type Props = {
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  value: string | number;
  label?: string;
  sx?: any;
  loading?: boolean;
  dados: ClientInterface[] | CardInterface[];
};

const Select = ({ value, onChange, label, sx, loading, dados }: Props) => {
  return (
    <TextField
      id={label}
      select
      label={label}
      value={value}
      onChange={onChange}
      helperText={`Selecione o seu ${label}`}
      sx={{ ...styleTextField, ...sx }}
    >
      {!loading &&
        dados.map(item => {
          return (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          );
        })}
    </TextField>
  );
};

export default Select;
