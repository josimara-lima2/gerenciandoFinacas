import {
  Box as MuiBox,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  IconButton,
  Stack,
  Pagination,
  styled,
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

const BoxContainer = styled(MuiBox)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'space-between',
  justifyContent: 'center',
}));

const BoxTable = styled(MuiBox)(() => ({
  marginTop: '4%',
  maxHeight: '100vh',
  overflow: 'auto',
}));

const BoxFuncionalidades = styled(MuiBox)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));
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
    <BoxContainer>
      <BoxFuncionalidades>
        <CadastroPurchase />
        <Search atualiza={handleAtualiza} onChange={handleChange} />
      </BoxFuncionalidades>

      <BoxTable>
        <Stack>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Descrição</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Forma de pagamento</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loadingPurchases &&
                pagePurchases.data.map(item => {
                  const id = Math.random();
                  return (
                    <TableRow key={id} sx={{ padding: 0 }}>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.value}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell>{item.formOfPayment}</TableCell>
                      <TableCell
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'start',
                        }}
                      >
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
      </BoxTable>
    </BoxContainer>
  );
}
