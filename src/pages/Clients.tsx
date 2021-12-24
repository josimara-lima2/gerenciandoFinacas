import Cadastro from 'components/Cadastro/Cadastro';
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  TableBody,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  List,
  TextField,
} from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from 'store';
import { fetchApiList, UserSelector } from 'store/reducers/user';
import { useState, useEffect } from 'react';
import {
  ClientSelector,
  deleteClient,
  fetchApi,
  fetchApiDelete,
  ClientInterface,
} from 'store/reducers/clients';
import Modal from 'components/Modal/Modal';
import ListSearch from '../components/ListSeacrh/ListSearch';

export default function Clients() {
  const dispatch = useAppDispatch();
  const clients = useAppSelector(ClientSelector);

  const tokenString = localStorage.getItem('token');
  const token = tokenString?.replace(/^"(.*)"$/, '$1');
  const [clientsSearch, setClientsSearch] = useState<ClientInterface[]>([]);
  const [nameSearch, setNameSearch] = useState('');
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
