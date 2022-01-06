import Cadastro from 'components/Cadastro/Cadastro';
import {
  Box as MuiBox,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  styled,
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
import Search from '../components/Search/Search';

const BoxContainer = styled(MuiBox)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'space-between',
  justifyContent: 'center',
}));

const BoxTable = styled(MuiBox)(() => ({
  marginTop: '4%',
  maxHeight: '100vh',
  overflow: 'auto',
}));

const BoxFuncionalidades = styled(MuiBox)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
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

  const handleAtualiza = () => {
    dispatch(fetchApiPage(1));
  };

  const handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string,
  ) => {
    dispatch(fetchApiSearch(value));
  };

  return (
    <BoxContainer>
      <BoxFuncionalidades>
        <Cadastro />

        <Search atualiza={handleAtualiza} onChange={handleChange} />
      </BoxFuncionalidades>
      <BoxTable>
        <Stack spacing={2}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell>Cpf</TableCell>

                <TableCell>Ações</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoadingg &&
                pageCliente.data.map(item => {
                  const id = Math.random();
                  return (
                    <TableRow key={id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.telephone}</TableCell>
                      <TableCell>{item.cpf}</TableCell>

                      <TableCell
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'start',
                          padding: 0,
                        }}
                      >
                        <Editar client={item} />
                        <DeleteClient client={item} />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <Pagination
            count={pageCliente.totalPage}
            onChange={handleChangePagination}
          />
        </Stack>
      </BoxTable>
    </BoxContainer>
  );
}
