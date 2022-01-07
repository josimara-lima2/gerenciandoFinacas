import { Box as MuiBox, TextField, styled } from '@mui/material';
import Modal from 'components/Modal/Modal';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import {
  fetchApiPost,
  PageCardSelector,
  fetchApiPageCard,
} from 'store/reducers/pageCard';
import AddCardIcon from '@mui/icons-material/AddCard';
import { maskCode, maskNumber, maskValue, maskFatura } from 'utils/masks';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';

const styleTextField = {
  margin: '8px 0',
  width: '100%',
};
const Box = styled(MuiBox)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const CadastroCard = () => {
  const dispatch = useAppDispatch();
  const { pageCard } = useAppSelector(PageCardSelector);

  const [name, setName] = useState('');
  const [flag, setFlag] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [limit, setLimit] = useState(0);
  const [availableLimit, setAvailableLimit] = useState(0);
  const [dueDate, setDueDate] = useState('');
  const [invoiceClosing, setInvoiceClosing] = useState(0);
  const [number, setNumber] = useState('');
  const [code, setCode] = useState('');

  const newCard = {
    id: 'teste',
    name,
    flag,
    cardHolderName,
    limit,
    availableLimit,
    dueDate,
    invoiceClosing,
    code,
    number,
  };
  const limpaState = () => {
    setName('');
    setFlag('');
    setCardHolderName('');
    setLimit(0);
    setAvailableLimit(0);
    setDueDate('');
    setInvoiceClosing(0);
    setCode('');
    setNumber('');
  };
  const cadastrar = () => {
    dispatch(fetchApiPost(newCard))
      .unwrap()
      .then(response => {
        const { statusCode } = response;
        if (statusCode === 200) {
          dispatch(fetchApiPageCard(pageCard.page));
          limpaState();
        }
      })
      .catch(e => e.message);
  };

  return (
    <MuiBox component="form">
      <Modal
        title="Cadastre o cartão"
        cadastrar={cadastrar}
        buttonIcon={<AddCardIcon />}
        tamanho="sm"
      >
        <Box>
          <TextField
            id="nome"
            label="Nome"
            variant="outlined"
            required
            onChange={e => setName(e.target.value)}
            value={name}
            sx={styleTextField}
          />

          <TextField
            id="flag"
            label="Bandeira"
            variant="outlined"
            required
            onChange={e => setFlag(e.target.value)}
            value={flag}
            sx={styleTextField}
          />

          <TextField
            id="titular"
            label="Nome do titular"
            variant="outlined"
            required
            onChange={e => setCardHolderName(e.target.value)}
            value={cardHolderName}
            sx={styleTextField}
          />

          <MuiBox sx={{ display: 'flex', width: '100%' }}>
            <TextField
              id="limite"
              label="Limite"
              variant="outlined"
              onChange={e => setLimit(maskValue(e))}
              value={limit}
              required
              sx={{ ...styleTextField, marginRight: '5px' }}
            />
            <TextField
              id="limitDisponivel"
              label="Limite Disponivel"
              variant="outlined"
              onChange={e => setAvailableLimit(maskValue(e))}
              value={availableLimit}
              required
              sx={{ ...styleTextField, marginLeft: '5px' }}
            />
          </MuiBox>

          <TextField
            id="vencimento"
            label="Vencimento"
            variant="outlined"
            placeholder="00/00/0000"
            required
            onChange={e => setDueDate(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DateRangeOutlinedIcon />
                </InputAdornment>
              ),
            }}
            value={dueDate}
            sx={styleTextField}
          />

          <TextField
            id="fatura"
            label="Dia da fatura"
            variant="outlined"
            required
            onChange={e => setInvoiceClosing(maskFatura(e))}
            value={invoiceClosing}
            sx={styleTextField}
          />

          <TextField
            id="teste"
            label="numero"
            variant="outlined"
            placeholder="9999 9999 9999 9999"
            required
            onChange={e => setNumber(maskNumber(e))}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CreditCardOutlinedIcon />
                </InputAdornment>
              ),
            }}
            value={number}
            sx={styleTextField}
          />

          <TextField
            id="code"
            label="código"
            placeholder="000"
            variant="outlined"
            required
            onChange={e => setCode(maskCode(e))}
            value={code}
            sx={styleTextField}
          />
        </Box>
      </Modal>
    </MuiBox>
  );
};

export default CadastroCard;
