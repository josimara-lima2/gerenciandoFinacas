import {
  Box,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  IconButton,
} from '@mui/material';
import CadastroPurchase from 'components/CadastroPurchase/CadastroPurchase';
import Search from 'components/Search/Search';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { fetchApiPurchases, purchasesSelector } from 'store/reducers/compras';
import { DeleteOutline } from '@mui/icons-material';

export default function Compra() {
  const dispatch = useAppDispatch();

  const { pagePurchases, loadingPurchases } = useAppSelector(purchasesSelector);

  useEffect(() => {
    dispatch(fetchApiPurchases());
  }, [dispatch]);

  return (
    <Box>
      <CadastroPurchase />
      {/* <Search atualiza={handleAtualiza} onChange={handleChange} /> */}

      <Box sx={{ marginTop: '4%' }}>
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
      </Box>
    </Box>
  );
}
