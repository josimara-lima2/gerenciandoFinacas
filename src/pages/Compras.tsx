import { Typography, Box } from '@mui/material';
import CadastroPurchase from 'components/CadastroPurchase/CadastroPurchase';
import Search from 'components/Search/Search';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { fetchApiPurchases, purchasesSelector } from 'store/reducers/compras';

export default function Compra() {
  const dispatch = useAppDispatch();
  const { pagePurchases, loadingPurchases } = useAppSelector(purchasesSelector);
  useEffect(() => {
    dispatch(fetchApiPurchases(+pagePurchases.page));
  }, [dispatch, pagePurchases.page]);

  return (
    <Box>
      <CadastroPurchase />
      {/* <Search /> */}
      <Typography>Teste</Typography>
      {!loadingPurchases &&
        pagePurchases.data.map(item => {
          return <Typography>{item.description}</Typography>;
        })}
    </Box>
  );
}
