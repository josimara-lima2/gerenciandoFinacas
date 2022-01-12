import {
  TextField,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
} from '@mui/material';
import Modal from 'components/Modal/Modal';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState, useEffect } from 'react';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { fetchApiPage, PageSelector } from 'store/reducers/pageClient';
import { fetchApiPageCard, PageCardSelector } from 'store/reducers/pageCard';
import {
  addPurchase,
  fetchApiPurchases,
  fetchApiPurchasesPost,
} from 'store/reducers/compras';

import TextFieldCadastro from '../TextFieldCadastro';

const styleTextField = {
  margin: '8px 0',
  width: '100%',
};

const CadastroPurchase = () => {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState(0);
  const [parceleOut, setParceleOut] = useState(false);
  const [numberOfInstallments, setNumberOfInstallments] = useState(0);
  const [formOfPayment, setFormOfPayment] = useState('');
  const [status, setStatus] = useState('');
  const [paidInstallments, setPaidInstallments] = useState(0);
  const [clientId, setClientId] = useState('');
  const [creditCardId, setCreditCardId] = useState('');

  const newCard = {
    description,
    value,
    parceleOut,
    numberOfInstallments,
    formOfPayment,
    status,
    paidInstallments,
    creditCardId,
    clientId,
  };
  const dispatch = useAppDispatch();
  const { pageCliente, isLoadingg } = useAppSelector(PageSelector);
  const { pageCard, loadingCard } = useAppSelector(PageCardSelector);
  const [message, setMessage] = useState('');

  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClientId(event.target.value);
  };

  const handleChangeSelect = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setInputValue(event.target.value as string);

    switch (+event.target.value) {
      case 1:
        setParceleOut(true);
        break;
      case 0:
        setParceleOut(false);
        break;
      default:
        break;
    }
  };

  const handleChangeCard = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreditCardId(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchApiPage(null));
    dispatch(fetchApiPageCard(null));
  }, [dispatch]);

  const cadastrar = () => {
    dispatch(fetchApiPurchasesPost(newCard))
      .unwrap()
      .then(response => {
        const { statusCode } = response;
        if (statusCode === 201) {
          dispatch(addPurchase(newCard));
        }
        dispatch(fetchApiPurchases(1));
      })
      .catch(error => setMessage(error.message));
  };
  return (
    <Modal
      title="Purchase"
      buttonIcon={<AddShoppingCartIcon />}
      cadastrar={cadastrar}
    >
      <TextFieldCadastro
        label="Descricao"
        onChange={e => setDescription(e.target.value)}
        value={description}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <TextFieldCadastro
          label="Valor"
          onChange={e => setValue(+e.target.value)}
          value={value}
          sx={{ marginRight: '5px' }}
        />
        <FormControl sx={{ ...styleTextField }}>
          <InputLabel htmlFor="select" id="parceleOut" />
          <TextField
            required
            select
            id="select"
            value={inputValue}
            label="Parcelar valor?"
            onChange={e => handleChangeSelect(e)}
          >
            <MenuItem value={0}>nao</MenuItem>
            <MenuItem value={1}>sim</MenuItem>
          </TextField>
        </FormControl>
      </Box>

      {parceleOut === true && (
        <TextFieldCadastro
          label="Numero_de_parcelas"
          onChange={e => setNumberOfInstallments(+e.target.value)}
          value={numberOfInstallments}
        />
      )}
      <TextFieldCadastro
        label="Forma_de_Pagamento"
        onChange={e => setFormOfPayment(e.target.value)}
        value={formOfPayment}
      />
      <TextFieldCadastro
        label="Status"
        onChange={e => setStatus(e.target.value)}
        value={status}
      />
      <TextFieldCadastro
        label="parcelas_pagas"
        onChange={e => setPaidInstallments(+e.target.value)}
        value={paidInstallments}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',

          justifyContent: 'center',
        }}
      >
        <TextField
          id="clientId"
          select
          label="Cliente"
          value={clientId}
          onChange={handleChange}
          helperText="Selecione o nome do cliente"
          sx={{ ...styleTextField, marginRight: '5%' }}
        >
          {!isLoadingg &&
            pageCliente.data.map(item => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              );
            })}
        </TextField>
        <TextField
          id="creditCardId"
          select
          label="Cartão"
          value={creditCardId}
          onChange={handleChangeCard}
          helperText="Selecione o cartão de crédito"
          sx={styleTextField}
        >
          {!loadingCard &&
            pageCard.data.map(item => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              );
            })}
        </TextField>
      </Box>
    </Modal>
  );
};

export default CadastroPurchase;
