import React from 'react';
import { Box as MuiBox, FormControl, Input } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
  onChange: (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string,
  ) => void;
};
export default function Search({ onChange }: Props) {
  const changeInput = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onChange(e, e.currentTarget.value);
  };

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
            <InputAdornment position="start" sx={{ color: '#1c86ee' }}>
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
    </MuiBox>
  );
}
