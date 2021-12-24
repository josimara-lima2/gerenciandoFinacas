import {
  Box as MuiBox,
  TextField as MuiTextField,
  styled,
  Typography,
  FormControl,
  InputLabel,
  Input,
  List,
  ListItemText,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import Modal from 'components/Modal/Modal';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import SearchIcon from '@mui/icons-material/Search';
import { UserSelector } from 'store/reducers/user';
import {
  ClientSelector,
  deleteClient,
  fetchApi,
  fetchApiDelete,
  ClientInterface,
  fetchApiPost,
  addClient,
} from 'store/reducers/clients';

const Box = styled(MuiBox)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export default function ListSearch() {
  const dispatch = useAppDispatch();
  const clients = useAppSelector(ClientSelector);
  const [nameSearch, setNameSearch] = useState('');

  const [clientsSearch, setClientsSearch] = useState<ClientInterface[]>([]);

  const handleSearch = (list: ClientInterface[]) => {
    setClientsSearch(list);
  };

  const teste = () => {
    const list = clients.clients.filter(item => item.name === nameSearch);
    handleSearch(list);
  };

  return (
    <MuiBox
      component="form"
      className="container"
      noValidate
      sx={{ marginTop: '15px' }}
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
          onChange={e => setNameSearch(e.target.value)}
          sx={{ borderRadius: '10px' }}
        />
      </FormControl>
      <Modal
        title="Lista de Clientes"
        buttonIcon={<SearchIcon />}
        cadastrar={() => teste()}
        list={() => teste()}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Cpf</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientsSearch.map(item => {
              const id = Math.random();
              return (
                <TableRow key={id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.telephone}</TableCell>
                  <TableCell>{item.cpf}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Modal>
    </MuiBox>
  );
}
