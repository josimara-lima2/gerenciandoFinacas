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

import ModalAdd from 'components/ModalAdd/ModalAdd';
import TextFieldCadastro from '../TextFieldCadastro';
import SelectParceleOut from './SelectParceleOut';
import Select from './Select';

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

  const dispatch = useAppDispatch();
  const { pageCliente, isLoadingg } = useAppSelector(PageSelector);
  const { pageCard, loadingCard } = useAppSelector(PageCardSelector);
  const [message, setMessage] = useState('');

  const [inputValue, setInputValue] = useState('');

  const clientSelect = pageCliente
    ? pageCliente.data.find(item => item.id === clientId)
    : { id: 'teste', name: 'teste' };

  const cardSelect = pageCard
    ? pageCard.data.find(item => item.id === creditCardId)
    : { id: 'teste', name: 'teste' };

  const newCompra = {
    id: 'idTemp',
    description,
    value,
    parceleOut,
    numberOfInstallments,
    formOfPayment,
    status,
    paidInstallments,
    creditCardId,
    client: {
      id: clientId,
      name: clientSelect ? clientSelect.name : '',
    },
    creditCard: {
      id: creditCardId,
      name: cardSelect ? cardSelect.name : '',
    },
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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

  const handleChangeCard = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCreditCardId(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchApiPage(null));
    dispatch(fetchApiPageCard(null));
  }, [dispatch]);

  const cadastrar = () => {
    dispatch(fetchApiPurchasesPost(newCompra))
      .unwrap()
      .then(response => {
        const { statusCode } = response;
        if (statusCode === 201) {
          dispatch(addPurchase(newCompra));
        }
        dispatch(fetchApiPurchases(1));
      })
      .catch(error => setMessage(error.message));
  };
  return (
    <ModalAdd
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
          sx={{ marginRight: '5%' }}
        />

        <SelectParceleOut
          value={inputValue}
          onChange={e => handleChangeSelect(e)}
        />
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
        <Select
          value={clientId}
          onChange={e => handleChange(e)}
          label="Cliente"
          loading={isLoadingg}
          dados={pageCliente.data}
          sx={{ marginRight: '5%' }}
        />
        <Select
          value={creditCardId}
          onChange={e => handleChangeCard(e)}
          label="Cartao"
          loading={loadingCard}
          dados={pageCard.data}
        />
      </Box>
    </ModalAdd>
  );
};

export default CadastroPurchase;
