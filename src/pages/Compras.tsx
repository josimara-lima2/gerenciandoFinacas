import {
  Box,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  IconButton,
  Stack,
  Pagination,
} from '@mui/material';
import CadastroPurchase from 'components/CadastroPurchase/CadastroPurchase';
import Search from 'components/Search/Search';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import {
  fetchApiPurchases,
  purchasesSelector,
  fetchApiSearch,
} from 'store/reducers/compras';
import { DeleteOutline } from '@mui/icons-material';

export default function Compra() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const { pagePurchases, loadingPurchases } = useAppSelector(purchasesSelector);

  const handleChangePagination = (
    e: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const handleAtualiza = () => {
    dispatch(fetchApiPurchases(1));
  };

  const handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string,
  ) => {
    dispatch(fetchApiSearch(value));
  };
  useEffect(() => {
    dispatch(fetchApiPurchases(page));
  }, [dispatch, page]);

  return (
    <Box>
      <CadastroPurchase />
      <Search atualiza={handleAtualiza} onChange={handleChange} />

      <Box sx={{ marginTop: '4%' }}>
        <Stack>
          <Table sx={{ maxHeight: '100vh', overflow: 'auto' }} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Descrição</TableCell>
                <TableCell>Valor</TableCell>

                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loadingPurchases &&
                pagePurchases.data.map(item => {
                  const id = Math.random();
                  return (
                    <TableRow key={id}>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.value}</TableCell>
                      <TableCell sx={{ display: 'flex' }}>
                        <IconButton>
                          <DeleteOutline />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </Stack>
        <Pagination
          count={pagePurchases.totalPage}
          onChange={handleChangePagination}
        />
      </Box>
    </Box>
  );
}
