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
import {
  CardSelector,
  CardInterface,
  ListCardInterface,
} from 'store/reducers/cards';

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
        title="Lista de Cartões"
        buttonIcon={<SearchIcon />}
        list={() => teste()}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Flag</TableCell>
              <TableCell>Titular</TableCell>
              <TableCell>Limite</TableCell>
              <TableCell>Limite disponivel</TableCell>
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
      </Modal>
    </MuiBox>
  );
}
