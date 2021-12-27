import Cadastro from 'components/Cadastro/Cadastro';
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  TableBody,
} from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from 'store';
import { useEffect } from 'react';
import {
  ClientSelector,
  deleteClient,
  fetchApi,
  fetchApiDelete,
  ClientInterface,
  editClient,
} from 'store/reducers/clients';
import CreateIcon from '@mui/icons-material/Create';
import ListSearch from '../components/ListSearch/ListSearch';

export default function Cartao() {
  const dispatch = useAppDispatch();
  const clients = useAppSelector(ClientSelector);

  const tokenString = localStorage.getItem('token');
  const token = tokenString?.replace(/^"(.*)"$/, '$1');

  const handleDelete = (id: string) => {
    dispatch(fetchApiDelete(id));
    dispatch(deleteClient({ id }));
  };
  const EditarClient = (id: string) => {
    dispatch(
      editClient({ id, name: 'f', email: 'f', telephone: 'f', cpf: 'f' }),
    );
  };
  useEffect(() => {
    dispatch(fetchApi());
  }, [dispatch]);

  const list: ClientInterface[] = [];
  clients.clients.map(item => list.push(item));

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
      <Box sx={{ marginTop: '4%' }}>
        <title>Lista de Cartões</title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Cpf</TableCell>

              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!clients.isLoading &&
              list.map(item => {
                const id = Math.random();
                return (
                  <TableRow key={id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.telephone}</TableCell>
                    <TableCell>{item.cpf}</TableCell>

                    <TableCell>
                      <IconButton onClick={() => handleDelete(item.id)}>
                        <DeleteOutline />
                      </IconButton>
                      <IconButton onClick={() => EditarClient(item.id)}>
                        <CreateIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}
