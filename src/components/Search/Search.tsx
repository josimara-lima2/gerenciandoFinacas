import React, { useEffect, useState } from 'react';
import { Box as MuiBox, FormControl, InputLabel, Input } from '@mui/material';
import Modal from 'components/Modal/Modal';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from 'store';
import { ClientSelector, ClientInterface } from 'store/reducers/clients';
import {
  fetchApiPage,
  fetchApiSearch,
  PageSelector,
} from 'store/reducers/pages';

type Props = {
  atualiza: () => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string,
  ) => void;
};
export default function Search({ atualiza, handleChange }: Props) {
  const { pageCliente } = useAppSelector(PageSelector);
  const [v, setV] = useState('0');
  const dispatch = useAppDispatch();

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
        <InputLabel>Search</InputLabel>

        <Input
          id="search"
          sx={{ borderRadius: '10px' }}
          onChange={e => handleChange(e, e.target.value)}
        />
      </FormControl>
    </MuiBox>
  );
}
