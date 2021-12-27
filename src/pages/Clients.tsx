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
  ClientInterface,
  editClient,
  fetchApiPut,
} from 'store/reducers/clients';
import CreateIcon from '@mui/icons-material/Create';
import Editar from 'components/Editar/Editar';
import ListSearch from '../components/ListSearch/ListSearch';

export default function Clients() {
  const dispatch = useAppDispatch();
  const clients = useAppSelector(ClientSelector);

  const tokenString = localStorage.getItem('token');
  const token = tokenString?.replace(/^"(.*)"$/, '$1');

  const handleDelete = (id: string) => {
    dispatch(fetchApiDelete(id));
    dispatch(deleteClient({ id }));
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
        <title>Lista de Cadastrados</title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Cpf</TableCell>

              <TableCell align="center">Ações</TableCell>
              <TableCell />
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
                    </TableCell>
                    <TableCell>
                      <Editar client={item} />
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
