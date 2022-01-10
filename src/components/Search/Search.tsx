import React, { useEffect, useState } from 'react';
import { Box as MuiBox, FormControl, Input } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
  atualiza: () => void;
  onChange: (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string,
  ) => void;
};
export default function Search({ atualiza, onChange }: Props) {
  const [v, setV] = useState('');

  const changeInput = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.currentTarget.value !== '') {
      setV(e.currentTarget.value);
      onChange(e, e.currentTarget.value);
    } else {
      setV('');
    }
  };

  useEffect(() => {
    atualiza();
  }, [v === '']);

  return (
    <MuiBox
      component="form"
      className="container"
      noValidate
      sx={{ marginTop: '15px', display: 'flex' }}
    >
      <FormControl
        sx={{
          display: 'flex',
          flexDirection: 'row',
          marginRight: '30px',
          marginTop: '10px',
        }}
      >
        <Input
          placeholder="Search"
          sx={{ borderRadius: '10px' }}
          onChange={e => changeInput(e)}
          endAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
    </MuiBox>
  );
}
