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
import Alerta from 'components/Alerta/Alerta';

const styleTextField = {
  margin: '8px 0',
  width: '100%',
  borderRadius: '20px',
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
      <TextField
        id="description"
        label="Descrição"
        variant="outlined"
        required
        onChange={e => setDescription(e.target.value)}
        value={description}
        sx={styleTextField}
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
        <TextField
          id="value"
          label="Valor"
          variant="outlined"
          required
          onChange={e => setValue(+e.target.value)}
          value={value}
          sx={{ ...styleTextField, marginRight: '5%' }}
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
        <TextField
          id="numberOfInstallments"
          label="Número de parcelas"
          variant="outlined"
          required
          onChange={e => setNumberOfInstallments(+e.target.value)}
          value={numberOfInstallments}
          sx={styleTextField}
        />
      )}
      <TextField
        id="formOfPayment"
        label="Forma de Pagamento"
        variant="outlined"
        required
        onChange={e => setFormOfPayment(e.target.value)}
        value={formOfPayment}
        sx={styleTextField}
      />
      <TextField
        id="status"
        label="Status"
        variant="outlined"
        required
        onChange={e => setStatus(e.target.value)}
        value={status}
        sx={styleTextField}
      />
      <TextField
        id="paidInstallments"
        label="Numero de parcelas pagas"
        variant="outlined"
        required
        onChange={e => setPaidInstallments(+e.target.value)}
        value={paidInstallments}
        sx={styleTextField}
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
