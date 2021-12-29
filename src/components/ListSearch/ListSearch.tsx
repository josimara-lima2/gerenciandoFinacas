import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { ClientSelector, ClientInterface } from 'store/reducers/clients';
import Search from 'components/Search/Search';
import { fetchApiSearch, PageSelector } from 'store/reducers/pages';

export default function ListSearch() {
  const dispatch = useAppDispatch();
  const { pageCliente } = useAppSelector(PageSelector);
  const [nameSearch, setNameSearch] = useState('');
  const [clientsSearch, setClientsSearch] = useState<ClientInterface[]>([]);

  const searchNameClient = (e: any) => {
    dispatch(fetchApiSearch(e.target.value));
  };

  return <></>; // <Search />;
}
