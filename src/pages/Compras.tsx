import {
  Box as MuiBox,
  IconButton,
  Stack,
  Pagination,
  styled,
  Typography as MuiTypography,
} from '@mui/material';
import CadastroPurchase from 'components/cadastros/CadastroPurchase/CadastroPurchase';
import Search from 'components/Search/Search';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import {
  fetchApiPurchases,
  purchasesSelector,
  fetchApiSearch,
} from 'store/reducers/compras';
import { DeleteOutline } from '@mui/icons-material';
import ItemTable from 'components/ItemTable/ItemTable';
import InfoCompra from 'components/InfoCompra/InfoCompra';
import BoxTable from '../components/BoxTable/BoxTable';

const BoxContainer = styled(MuiBox)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'space-between',
  justifyContent: 'center',
  zIndex: 0,
}));

const BoxFuncionalidades = styled(MuiBox)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '3%',
}));

const TypographyAcoes = styled(MuiTypography)(() => ({
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

  const handleAtualiza = () => {
    dispatch(fetchApiPurchases(1));
  };

  const handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string,
  ) => {
    dispatch(fetchApiSearch(value));
  };

  return (
    <BoxContainer>
      <BoxFuncionalidades>
        <CadastroPurchase />
        <Search atualiza={handleAtualiza} onChange={handleChange} />
      </BoxFuncionalidades>

      <Stack spacing={1}>
        {!loadingPurchases &&
          pagePurchases.data.map(item => (
            <BoxTable key={item.description}>
              <ItemTable title="Description" item={item.description} />
              <ItemTable title="value" item={item.value} />
              <ItemTable title="cliente" item={item.client.name} />
              <ItemTable title="Cartao" item={item.creditCard.name} />
              <TypographyAcoes>
                <IconButton>
                  <DeleteOutline />
                </IconButton>
                <InfoCompra compra={item} />
              </TypographyAcoes>
            </BoxTable>
          ))}
        <Pagination
          count={pagePurchases.totalPage || 1}
          onChange={handleChangePagination}
        />
      </Stack>
    </BoxContainer>
  );
}
