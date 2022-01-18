import {
  Box as MuiBox,
  Tooltip,
  IconButton,
  Typography,
  styled,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'store';
import { useEffect, useState } from 'react';
import {
  fetchApiPageCard,
  PageCardSelector,
  fetchApiSearch,
} from 'store/reducers/pageCard';
import CreateIcon from '@mui/icons-material/Create';
import CadastroCard from 'components/Register/CadastroCard/CadastroCard';
import Search from 'components/Search/Search';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import InfoCard from 'components/InfoCard/InfoCard';
import DeleteCard from 'components/Delete/DeleteCard/DeleteCard';
import BoxTable from 'components/BoxTable/BoxTable';
import ItemTable from 'components/ItemTable/ItemTable';

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
export default function Cartao() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const { pageCard, loadingCard } = useAppSelector(PageCardSelector);

  useEffect(() => {
    dispatch(fetchApiPageCard(page));
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
      dispatch(fetchApiPageCard(1));
    } else {
      dispatch(fetchApiSearch(value));
    }
  };
  return (
    <BoxContainer>
      <BoxFuncionalidades>
        <CadastroCard />

        <Search onChange={handleChange} />
      </BoxFuncionalidades>

      <Stack spacing={1}>
        {!loadingCard &&
          pageCard.data.map(item => {
            return (
              <BoxTable key={item.number}>
                <ItemTable title="Nome" item={item.name} xs={6} sm={4} md={1} />
                <ItemTable
                  title="Bandeira"
                  item={item.flag}
                  xs={12}
                  sm={4}
                  md={2}
                />
                <ItemTable
                  title="Titular do cartão"
                  item={item.cardHolderName}
                  xs={12}
                  sm={4}
                  md={2}
                />
                <ItemTable
                  title="Limite"
                  item={item.limit}
                  xs={12}
                  sm={2}
                  md={1}
                />

                <ItemTable
                  title="Limite Disponível"
                  item={item.availableLimit}
                  xs={12}
                  sm={2}
                  md={1}
                />
                <ItemTable
                  title="Numero do cartão"
                  item={item.number}
                  xs={12}
                  sm={8}
                  md={3}
                />

                <ItemTable title="Ações" xs={12} sm={12} md={2}>
                  <Typography
                    component="div"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'start',
                      padding: 0,
                      marginRight: '50px',
                    }}
                  >
                    <Tooltip title="Edit">
                      <IconButton color="primary">
                        <CreateIcon />
                      </IconButton>
                    </Tooltip>
                    <DeleteCard card={item} />
                    <InfoCard
                      flag={item.flag}
                      number={item.number}
                      code={item.code}
                      dueDate={item.dueDate}
                      cardHolderName={item.cardHolderName}
                    />
                  </Typography>
                </ItemTable>
              </BoxTable>
            );
          })}

        <Pagination
          count={pageCard.totalPage || 1}
          onChange={handleChangePagination}
          color="primary"
        />
      </Stack>
    </BoxContainer>
  );
}
