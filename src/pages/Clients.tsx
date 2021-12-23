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
} from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from 'store';

import {
  ClientSelector,
  deleteClient,
  fetchApi,
  fetchApiDelete,
} from 'store/reducers/clients';
import { useEffect } from 'react';

export default function Clients() {
  const dispatch = useAppDispatch();
  const clients = useAppSelector(ClientSelector);

  const handleDelete = (id: string) => {
    dispatch(fetchApiDelete(id));
    dispatch(deleteClient({ id }));
  };
  useEffect(() => {
    dispatch(fetchApi());
  }, [dispatch]);

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
        <FormControl variant="outlined">
          <InputLabel variant="standard" htmlFor="search">
            Search user
          </InputLabel>
          <Input
            id="search"
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            }
            sx={{ borderRadius: '10px' }}
          />
        </FormControl>
      </Box>
      <Box sx={{ marginTop: '5%' }}>
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
              clients.clients.map(item => (
                <TableRow key={item.id}>
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
              ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}
