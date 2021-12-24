import {
  Box as MuiBox,
  FormControl,
  InputLabel,
  Input,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import Modal from 'components/Modal/Modal';
import { useState } from 'react';
import { useAppSelector } from 'store';
import SearchIcon from '@mui/icons-material/Search';
import { ClientSelector, ClientInterface } from 'store/reducers/clients';

export default function ListSearch() {
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
      sx={{ marginTop: '15px', display: 'flex' }}
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
