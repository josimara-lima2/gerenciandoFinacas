import Cadastro from 'components/cadastros/CadastroCliente/CadastroCliente';
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
} from 'store/reducers/pageClient';
import Editar from 'components/Editar/Editar';
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import DeleteClient from 'components/DeleteClient/DeleteClient';
import BoxTable from 'components/BoxTable/BoxTable';

import ItemTable from '../components/ItemTable/ItemTable';
import Search from '../components/Search/Search';

const BoxContainer = styled(MuiBox)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'space-between',
  justifyContent: 'center',
  zIndex: 0,
}));

const BoxFuncionalidades = styled(MuiBox)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '3%',
}));

const TypographyAcoes = styled(MuiTypography)(() => ({
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
    <BoxContainer>
      <BoxFuncionalidades>
        <Cadastro />
        <Search onChange={handleChange} />
      </BoxFuncionalidades>

      <Stack spacing={1}>
        {!isLoadingg &&
          pageCliente.data.map(item => {
            return (
              <BoxTable key={item.cpf}>
                <ItemTable
                  title="Nome"
                  item={item.name}
                  xs={12}
                  sm={6}
                  md={2}
                />
                <ItemTable
                  title="Email"
                  item={item.email}
                  xs={12}
                  sm={6}
                  md={4}
                />
                <ItemTable title="Cpf" item={item.cpf} xs={12} sm={6} md={3} />
                <ItemTable
                  title="Telefone"
                  item={item.telephone}
                  xs={12}
                  sm={6}
                  md={2}
                />

                <ItemTable title="Ações" xs={12} sm={12} md={1}>
                  <TypographyAcoes>
                    <Editar client={item} />
                    <DeleteClient client={item} />
                  </TypographyAcoes>
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
    </BoxContainer>
  );
}
