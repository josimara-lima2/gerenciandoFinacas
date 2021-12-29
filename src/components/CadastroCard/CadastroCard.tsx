import { Box as MuiBox, TextField, styled } from '@mui/material';
import Modal from 'components/Modal/Modal';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { addCard, fetchApiPost, fetchApi } from 'store/reducers/cards';
import AddCardIcon from '@mui/icons-material/AddCard';
import * as React from 'react';
import { maskCode, maskNumber, maskValue, maskFatura } from 'utils/masks';

import { PageCardSelector, fetchApiPageCard } from 'store/reducers/pageCard';

const styleTextField = {
  margin: '5px',
  width: '84%',
  borderRadius: '20px',
};
const Box = styled(MuiBox)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const CadastroCard = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [flag, setFlag] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [limit, setLimit] = useState(0);
  const [availableLimit, setAvailableLimit] = useState(0);
  const [dueDate, setDueDate] = useState('');
  const [invoiceClosing, setInvoiceClosing] = useState(0);
  const [number, setNumber] = useState('');
  const [code, setCode] = useState('');
  const { pageCliente } = useAppSelector(PageCardSelector);

  const cadastrar = () => {
    dispatch(
      fetchApiPost({
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
      }),
    )
      .unwrap()
      .then(response => {
        const { statusCode } = response;

        if (statusCode === 200) {
          dispatch(fetchApiPageCard(pageCliente.page));
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
          <MuiBox sx={{ display: 'flex' }}>
            <TextField
              id="limite"
              label="Limite"
              variant="outlined"
              onChange={e => setLimit(maskValue(e))}
              value={limit}
              required
              sx={styleTextField}
            />
            <TextField
              id="limitDisponivel"
              label="Limite Disponivel"
              variant="outlined"
              onChange={e => setAvailableLimit(maskValue(e))}
              value={availableLimit}
              required
              sx={styleTextField}
            />
          </MuiBox>
          <TextField
            id="vencimento"
            label="Vencimento"
            variant="outlined"
            required
            onChange={e => setDueDate(e.target.value)}
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
            value={number}
            sx={styleTextField}
          />
          <TextField
            id="code"
            label="código"
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
