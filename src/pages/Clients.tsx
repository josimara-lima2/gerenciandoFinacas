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
import {
  ClientSelector,
  deleteClient,
  fetchApi,
  fetchApiDelete,
  ListClientInterface,
  ClientInterface,
} from 'store/reducers/clients';
import { fetchApiPage, PageCliente, PageSelector } from 'store/reducers/pages';
import Editar from 'components/Editar/Editar';
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ListSearch from '../components/ListSearch/ListSearch';

export default function Clients() {
  const dispatch = useAppDispatch();
  const { clients, isLoading } = useAppSelector(
    ClientSelector,
  ) as ListClientInterface;
  const [page, setPage] = React.useState(1);
  const [list, setList] = React.useState<ClientInterface[]>([]);
  const { pageCliente, isLoadingg } = useAppSelector(PageSelector);

  const handleDelete = (id: string) => {
    dispatch(fetchApiDelete(id));
    dispatch(fetchApiPage(String(page)));
    dispatch(deleteClient({ id }));
  };
  const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
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

        <ListSearch />
      </Box>
      <Box sx={{ marginTop: '4%', maxHeight: '100vh', overflow: 'auto' }}>
        <title>Lista de Cadastrados</title>

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
          <Pagination count={pageCliente.totalPage} onChange={handleChange} />
        </Stack>
      </Box>
    </Box>
  );
}
