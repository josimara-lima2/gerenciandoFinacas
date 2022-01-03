import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  IconButton,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'store';
import { useEffect, useState } from 'react';
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
import InfoCard from 'components/ModalCard/ModalCard';
import DeleteCard from 'components/DeleteCard/DeleteCard';

export default function Cartao() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const { pageCard, loadingCard } = useAppSelector(PageCardSelector);
  useEffect(() => {
    dispatch(fetchApiPageCard(String(page)));
  }, [dispatch, page]);
  const handleAtualiza = () => {
    dispatch(fetchApiPageCard('1'));
  };

  const handleChangePagination = (
    e: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };
  const handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
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

        <Search atualiza={handleAtualiza} onChange={handleChange} />
      </Box>
      <Box sx={{ marginTop: '4%' }}>
        <Stack>
          <Table sx={{ maxHeight: '100vh', overflow: 'auto' }} stickyHeader>
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
              {!loadingCard &&
                pageCard.data.map(item => {
                  const id = Math.random();
                  return (
                    <TableRow key={id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.flag}</TableCell>
                      <TableCell>{item.cardHolderName}</TableCell>
                      <TableCell>{item.limit}</TableCell>
                      <TableCell>{item.availableLimit}</TableCell>
                      <TableCell>{item.number}</TableCell>
                      <TableCell sx={{ display: 'flex' }}>
                        <DeleteCard card={item} />
                        <Tooltip title="Edit">
                          <IconButton>
                            <CreateIcon />
                          </IconButton>
                        </Tooltip>

                        <InfoCard>
                          <Typography align="right">{item.flag}</Typography>
                          <Table stickyHeader>
                            <TableHead>
                              <TableRow>
                                <TableCell>Vencimento</TableCell>
                                <TableCell>Fatura</TableCell>
                                <TableCell>Código</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell>{item.dueDate}</TableCell>
                                <TableCell>{item.invoiceClosing}</TableCell>
                                <TableCell>{item.code}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </InfoCard>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <Pagination
            count={pageCard.totalPage}
            onChange={handleChangePagination}
          />
        </Stack>
      </Box>
    </Box>
  );
}
