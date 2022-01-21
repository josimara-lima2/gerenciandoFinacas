import Cadastro from 'components/CadastroCliente';
import {
  Box as MuiBox,
  styled,
  Typography as MuiTypography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'store';
import { useEffect } from 'react';
import {
  fetchApiPage,
  PageSelector,
  fetchApiSearch,
} from 'store/reducers/clientes';

import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import DeleteClient from 'components/DeleteClient';
import BoxTable from 'components/BoxTable';

import EditarClient from 'components/EditarClient';
import ItemTable from '../components/ItemTable';
import Search from '../components/Search';

const StyledBoxContainer = styled(MuiBox)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'space-between',
  justifyContent: 'center',
  zIndex: 0,
}));

const StyledBoxFuncionalidades = styled(MuiBox)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '3%',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    padding: '10px 0px',
  },
}));

const StyledTypographyAcoes = styled(MuiTypography)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  padding: 0,
  marginRight: '20px',
}));

export default function Clients() {
  const dispatch = useAppDispatch();
  const [page, setPage] = React.useState(1);
  const { pageCliente, isLoadingg } = useAppSelector(PageSelector);

  useEffect(() => {
    dispatch(fetchApiPage(page));
  }, [dispatch, page]);

  const handleChangePagination = (
    e: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string,
  ) => {
    if (value === '') {
      dispatch(fetchApiPage(1));
    } else {
      dispatch(fetchApiSearch(value));
    }
  };

  return (
    <StyledBoxContainer>
      <StyledBoxFuncionalidades>
        <Cadastro />
        <Search onChange={handleChange} />
      </StyledBoxFuncionalidades>

      <Stack spacing={1}>
        {!isLoadingg &&
          pageCliente.data.map(item => {
            return (
              <BoxTable key={item.cpf}>
                <ItemTable title="Nome" item={item.name} md={2} />
                <ItemTable title="Email" item={item.email} md={4} />
                <ItemTable title="Cpf" item={item.cpf} md={3} />
                <ItemTable title="Telefone" item={item.telephone} md={2} />

                <ItemTable title="Ações" md={1}>
                  <StyledTypographyAcoes>
                    <EditarClient client={item} />
                    <DeleteClient client={item} />
                  </StyledTypographyAcoes>
                </ItemTable>
              </BoxTable>
            );
          })}
        <Pagination
          count={pageCliente.totalPage || 1}
          onChange={handleChangePagination}
          color="primary"
        />
      </Stack>
    </StyledBoxContainer>
  );
}
