import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  TableBody,
  Tooltip,
  cardActionsClasses,
} from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from 'store';
import { useEffect } from 'react';
import { cardSelector, fetchApi, CardInterface } from 'store/reducers/cards';
import CreateIcon from '@mui/icons-material/Create';
import CadastroCard from 'components/CadastroCard/CadastroCard';
import AddCardIcon from '@mui/icons-material/AddCard';
import ListSearch from '../components/ListSearch/ListSearch';

export default function Cartao() {
  const dispatch = useAppDispatch();
  const { cards, isLoading } = useAppSelector(cardSelector);

  useEffect(() => {
    dispatch(fetchApi());
  }, [dispatch]);

  const list = cards;
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

        <ListSearch />
      </Box>
      <Box sx={{ marginTop: '4%' }}>
        <title>Lista de Cartões</title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Flag</TableCell>
              <TableCell>Titular</TableCell>
              <TableCell>Limite</TableCell>
              <TableCell>Limite Disponivel</TableCell>
              <TableCell>Number</TableCell>

              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              list.map(item => {
                const id = Math.random();
                return (
                  <TableRow key={id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.flag}</TableCell>
                    <TableCell>{item.cardHolderName}</TableCell>
                    <TableCell>{item.limit}</TableCell>
                    <TableCell>{item.availableLimit}</TableCell>
                    <TableCell>{item.number}</TableCell>
                    {/* <TableCell>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(item.id)}>
                          <DeleteOutline />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton onClick={() => EditarClient(item.id)}>
                          <CreateIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell> */}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}
