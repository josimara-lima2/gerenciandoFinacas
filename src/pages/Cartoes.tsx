import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  IconButton,
} from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from 'store';
import { useEffect, useState } from 'react';
import {
  CardSelector,
  fetchApi,
  CardInterface,
  ListCardInterface,
  deleteCard,
  fetchApiDelete,
} from 'store/reducers/cards';
import {
  fetchApiPageCard,
  PageCardSelector,
  fetchApiSearch,
} from 'store/reducers/pageCard';
import CreateIcon from '@mui/icons-material/Create';
import CadastroCard from 'components/CadastroCard/CadastroCard';
import Search from 'components/Search/Search';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function Cartao() {
  const dispatch = useAppDispatch();
  const { cards, isLoading } = useAppSelector(
    CardSelector,
  ) as ListCardInterface;
  const [page, setPage] = useState(1);
  const { pageCliente } = useAppSelector(PageCardSelector);
  useEffect(() => {
    dispatch(fetchApiPageCard(String(page)));
  }, [dispatch, page]);
  const handleAtualiza = () => {
    dispatch(fetchApiPageCard('1'));
  };
  const deleteCardId = (code: string) => {
    const idr = cards.filter(card => card.code === code);
    if (idr[0].id) {
      dispatch(fetchApiDelete(idr[0].id));

      dispatch(deleteCard({ code }));
    }
  };
  const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const teste = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string,
  ) => {
    dispatch(fetchApiSearch(value));
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

        <Search atualiza={handleAtualiza} handleChange={teste} />
      </Box>
      <Box sx={{ marginTop: '4%' }}>
        <Stack>
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
                pageCliente.data.map(item => {
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
          <Pagination count={pageCliente.totalPage} onChange={handleChange} />
        </Stack>
      </Box>
    </Box>
  );
}
