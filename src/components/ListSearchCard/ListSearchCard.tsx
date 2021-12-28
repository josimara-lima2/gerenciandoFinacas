import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { useState } from 'react';
import { useAppSelector } from 'store';
import {
  CardSelector,
  CardInterface,
  ListCardInterface,
} from 'store/reducers/cards';
import Search from 'components/Search/Search';

export default function ListSearchCard() {
  const { cards } = useAppSelector(CardSelector) as ListCardInterface;
  const [nameSearch, setNameSearch] = useState('');

  const [cardsSearch, setCardsSearch] = useState<CardInterface[]>([]);

  const handleSearch = (list: CardInterface[]) => {
    setCardsSearch(list);
  };

  const teste = () => {
    const list = cards.filter(item => item.name === nameSearch);
    handleSearch(list);
  };

  const onChange = (e: any) => {
    setNameSearch(e.target.value);
  };

  return (
    <Search onChange={onChange} listar={teste}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Flag</TableCell>
            <TableCell>Titular</TableCell>
            <TableCell>Limite</TableCell>
            <TableCell>Limite disponível</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cardsSearch.map(item => {
            const id = Math.random();
            return (
              <TableRow key={id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.flag}</TableCell>
                <TableCell>{item.cardHolderName}</TableCell>
                <TableCell>{item.limit}</TableCell>
                <TableCell>{item.availableLimit}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Search>
  );
}
