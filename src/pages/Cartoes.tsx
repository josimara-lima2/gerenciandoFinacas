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
} from 'store/reducers/cartoes';
import CreateIcon from '@mui/icons-material/Create';
import CadastroCard from 'components/CadastroCard';
import Search from 'components/Search';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import InfoCard from 'components/InfoCard';
import DeleteCard from 'components/DeleteCard';
import BoxTable from 'components/BoxTable';
import ItemTable from 'components/ItemTable';

const BoxContainer = styled(MuiBox)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'space-between',
  justifyContent: 'center',
  zIndex: 0,
}));

const BoxFuncionalidades = styled(MuiBox)(({ theme }) => ({
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
                <ItemTable title="Nome" item={item.name} md={2.5} />
                <ItemTable title="Bandeira" item={item.flag} md={2.5} />

                <ItemTable title="Limite" item={item.limit} md={1} />

                <ItemTable
                  title="Limite Disponível"
                  item={item.availableLimit}
                  md={1}
                />
                <ItemTable title="Numero do cartão" item={item.number} md={3} />

                <ItemTable title="" md={2}>
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
