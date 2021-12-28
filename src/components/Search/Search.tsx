import React from 'react';
import { Box as MuiBox, FormControl, InputLabel, Input } from '@mui/material';
import Modal from 'components/Modal/Modal';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
  children: React.ReactNode;
  onChange: (e: any) => void;

  listar: () => void;
};
export default function Search({ onChange, children, listar }: Props) {
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
        <InputLabel>Search</InputLabel>

        <Input
          id="search"
          onChange={e => onChange(e)}
          sx={{ borderRadius: '10px' }}
        />
      </FormControl>
      <Modal
        title="Lista de Cartões"
        buttonIcon={<SearchIcon />}
        list={() => listar()}
      >
        {children}
      </Modal>
    </MuiBox>
  );
}
