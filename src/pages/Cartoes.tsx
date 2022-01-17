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
import CadastroCard from 'components/cadastros/CadastroCard/CadastroCard';
import Search from 'components/Search/Search';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import InfoCard from 'components/InfoCard/InfoCard';
import DeleteCard from 'components/DeleteCard/DeleteCard';
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

  const handleAtualiza = () => {
    dispatch(fetchApiPageCard(1));
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
    <BoxContainer>
      <BoxFuncionalidades>
        <CadastroCard />

        <Search atualiza={handleAtualiza} onChange={handleChange} />
      </BoxFuncionalidades>

      <Stack spacing={1}>
        {!loadingCard &&
          pageCard.data.map(item => {
            return (
              <BoxTable key={item.number}>
                <ItemTable title="Nome" item={item.name} />
                <ItemTable title="Bandeira" item={item.flag} />
                <ItemTable
                  title="Titular do cartão"
                  item={item.cardHolderName}
                />
                <ItemTable title="Limite" item={item.limit} />

                <ItemTable
                  title="Limite Disponível"
                  item={item.availableLimit}
                />
                <ItemTable title="Numero do cartão" item={item.number} />

                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start',
                    padding: 0,
                    marginLeft: '30px',
                    marginRight: '20px',
                  }}
                >
                  <DeleteCard card={item} />
                  <Tooltip title="Edit">
                    <IconButton>
                      <CreateIcon />
                    </IconButton>
                  </Tooltip>

                  <InfoCard
                    flag={item.flag}
                    number={item.number}
                    code={item.code}
                    dueDate={item.dueDate}
                    cardHolderName={item.cardHolderName}
                  />
                </Typography>
              </BoxTable>
            );
          })}

        <Pagination
          count={pageCard.totalPage || 1}
          onChange={handleChangePagination}
        />
      </Stack>
    </BoxContainer>
  );
}
