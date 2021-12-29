import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { useState } from 'react';
import { useAppSelector } from 'store';
import { ClientSelector, ClientInterface } from 'store/reducers/clients';
import Search from 'components/Search/Search';

export default function ListSearch() {
  const clients = useAppSelector(ClientSelector);
  const [nameSearch, setNameSearch] = useState('');
  const [clientsSearch, setClientsSearch] = useState<ClientInterface[]>([]);

  const searchNameClient = () => {
    const list = clients.clients.filter(item => item.name === nameSearch);
    setClientsSearch(list);
  };
  const onChange = (e: any) => {
    setNameSearch(e.target.value);
  };

  return (
    <Search listar={searchNameClient} onChange={onChange}>
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
    </Search>
  );
}
