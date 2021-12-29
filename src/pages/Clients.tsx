import Cadastro from 'components/Cadastro/Cadastro';
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  TableBody,
  Tooltip,
} from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from 'store';
import { useEffect } from 'react';
import { fetchApiDelete, ClientInterface } from 'store/reducers/clients';
import {
  fetchApiPage,
  PageSelector,
  fetchApiSearch,
} from 'store/reducers/pages';
import Editar from 'components/Editar/Editar';
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Search from '../components/Search/Search';

export default function Clients() {
  const dispatch = useAppDispatch();
  const [page, setPage] = React.useState(1);
  const { pageCliente, isLoadingg } = useAppSelector(PageSelector);

  const handleDelete = (id: string) => {
    dispatch(fetchApiDelete(id))
      .unwrap()
      .then(response => {
        const { statusCode } = response;
        if (statusCode === 201) {
          dispatch(fetchApiPage(String(page)));
        }
      });
  };
  const handleChangePagination = (
    e: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const handleAtualiza = () => {
    dispatch(fetchApiPage('1'));
  };

  const handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string,
  ) => {
    dispatch(fetchApiSearch(value));
  };

  useEffect(() => {
    dispatch(fetchApiPage(String(page)));
  }, [dispatch, page]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'space-between',
        justifyContent: 'center',
      }}
    >
      <Box
        className="container"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Cadastro />

        <Search atualiza={handleAtualiza} onChange={handleChange} />
      </Box>
      <Box sx={{ marginTop: '4%', maxHeight: '100vh', overflow: 'auto' }}>
        <Stack spacing={2}>
          <Table size="small">
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

                      <TableCell>
                        <Tooltip title="Delete">
                          <IconButton onClick={() => handleDelete(item.id)}>
                            <DeleteOutline />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <Tooltip title="Edit">
                        <TableCell>
                          <Editar client={item} />
                        </TableCell>
                      </Tooltip>
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
      </Box>
    </Box>
  );
}
