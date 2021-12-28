import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  IconButton,
  List,
  ListItem,
} from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from 'store';
import { useEffect } from 'react';
import {
  CardSelector,
  fetchApi,
  CardInterface,
  ListCardInterface,
  deleteCard,
  fetchApiDelete,
} from 'store/reducers/cards';
import CreateIcon from '@mui/icons-material/Create';
import CadastroCard from 'components/CadastroCard/CadastroCard';
import ListSearchCard from 'components/ListSearchCard/ListSearchCard';
import ListSearch from '../components/ListSearch/ListSearch';

export default function Cartao() {
  const dispatch = useAppDispatch();
  const { cards, isLoading } = useAppSelector(
    CardSelector,
  ) as ListCardInterface;

  useEffect(() => {
    dispatch(fetchApi());
  }, [dispatch]);

  const deleteCardId = (code: string) => {
    const idr = cards.filter(card => card.code === code);
    if (idr[0].id) {
      dispatch(fetchApiDelete(idr[0].id));

      dispatch(deleteCard({ code }));
    }
  };
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
        <CadastroCard />

        <ListSearchCard />
      </Box>
      <Box sx={{ marginTop: '4%' }}>
        <Table sx={{ maxHeight: '100vh', overflow: 'auto' }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Flag</TableCell>
              <TableCell>Titular</TableCell>
              <TableCell>Limite</TableCell>
              <TableCell>Limite Disponível</TableCell>
              <TableCell>Numero</TableCell>

              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              cards.map(item => {
                const id = Math.random();
                return (
                  <TableRow key={id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.flag}</TableCell>
                    <TableCell>{item.cardHolderName}</TableCell>
                    <TableCell>{item.limit}</TableCell>
                    <TableCell>{item.availableLimit}</TableCell>
                    <TableCell>{item.number}</TableCell>
                    <TableCell>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => deleteCardId(item.code)}>
                          <DeleteOutline />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton>
                          <CreateIcon />
                        </IconButton>
                      </Tooltip>
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
