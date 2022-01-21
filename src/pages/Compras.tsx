import {
  Box as MuiBox,
  IconButton,
  Stack,
  Pagination,
  styled,
  Typography as MuiTypography,
} from '@mui/material';
import Search from 'components/Search';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import {
  fetchApiPurchases,
  purchasesSelector,
  fetchApiSearch,
} from 'store/reducers/compras';
import { DeleteOutline } from '@mui/icons-material';
import ItemTable from 'components/ItemTable';
import ModalCompra from 'components/ModalCompra';
import CadastroPurchase from '../components/CadastroPurchase/index';
import BoxTable from '../components/BoxTable';

const StyledBoxContainer = styled(MuiBox)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'space-between',
  justifyContent: 'center',
  zIndex: 0,
}));

const StyledBoxFuncionalidades = styled(MuiBox)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '3%',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    padding: '10px 0px',
  },
}));

const StyledBoxAcoes = styled(MuiBox)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  padding: 0,
  marginRight: '20px',
}));
export default function Compra() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const { pagePurchases, loadingPurchases } = useAppSelector(purchasesSelector);

  useEffect(() => {
    dispatch(fetchApiPurchases(page));
  }, [dispatch, page]);

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
    if (value === '') {
      dispatch(fetchApiPurchases(1));
    } else {
      dispatch(fetchApiSearch(value));
      console.log(pagePurchases);
    }
  };

  return (
    <StyledBoxContainer>
      <StyledBoxFuncionalidades>
        <CadastroPurchase />
        <Search onChange={handleChange} />
      </StyledBoxFuncionalidades>

      <Stack spacing={1}>
        {!loadingPurchases &&
          pagePurchases.data.map(item => (
            <BoxTable key={item.id}>
              <ItemTable title="Description" item={item.description} md={2} />
              <ItemTable title="value" item={item.value} md={4} />
              <ItemTable title="status" item={item.status} md={3} />
              <ItemTable
                title="Forma de pagamento"
                item={item.formOfPayment}
                md={2}
              />
              <ItemTable title="Ações" md={1}>
                <StyledBoxAcoes>
                  <IconButton color="error">
                    <DeleteOutline />
                  </IconButton>
                  <ModalCompra compra={item} />
                </StyledBoxAcoes>
              </ItemTable>
            </BoxTable>
          ))}
        <Pagination
          count={pagePurchases.totalPage || 1}
          onChange={handleChangePagination}
          color="primary"
        />
      </Stack>
    </StyledBoxContainer>
  );
}
