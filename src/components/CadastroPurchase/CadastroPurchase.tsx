import { TextField, Autocomplete, MenuItem } from '@mui/material';
import Modal from 'components/Modal/Modal';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState, useEffect } from 'react';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { fetchApiPage, PageSelector } from 'store/reducers/pages';
import { fetchApiPageCard, PageCardSelector } from 'store/reducers/pageCard';
import {
  addPurchase,
  fetchApiPurchases,
  fetchApiPurchasesPost,
} from 'store/reducers/compras';

const styleTextField = {
  margin: '5px 0',
  width: '100%',
  borderRadius: '20px',
};

const optionsParceleOut = ['sim', 'não'];

const CadastroPurchase = () => {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState(0);
  const [parceleOut, setParceleOut] = useState(false);
  const [valueAutoComplete, setValueAutoComplete] = useState<string | null>(
    optionsParceleOut[1],
  );
  const [inputValue, setInputValue] = useState('');
  const [numberOfInstallments, setNumberOfInstallments] = useState(0);
  const [formOfPayment, setFormOfPayment] = useState('');
  const [status, setStatus] = useState('');
  const [paidInstallments, setPaidInstallments] = useState(0);

  const dispatch = useAppDispatch();
  const { pageCliente, isLoadingg } = useAppSelector(PageSelector);
  const { pageCard, loadingCard } = useAppSelector(PageCardSelector);

  const [clientId, setClientId] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClientId(event.target.value);
  };

  const [creditCardId, setCreditCardId] = useState('');
  const handleChangeCard = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreditCardId(event.target.value);
  };
  useEffect(() => {
    dispatch(fetchApiPage(''));
    dispatch(fetchApiPageCard(''));
  }, [dispatch]);

  const cadastrar = () => {
    dispatch(
      fetchApiPurchasesPost({
        description,
        value,
        parceleOut,
        numberOfInstallments,
        formOfPayment,
        status,
        paidInstallments,
        creditCardId,
        clientId,
      }),
    )
      .unwrap()
      .then(response => {
        const { statusCode } = response;
        if (statusCode === 201) {
          dispatch(
            addPurchase({
              description,
              value,
              parceleOut,
              numberOfInstallments,
              formOfPayment,
              status,
              paidInstallments,
              creditCardId,
              clientId,
            }),
          );
        }
        dispatch(fetchApiPurchases(1));
      });
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
      <TextField
        id="value"
        label="Valor"
        variant="outlined"
        required
        onChange={e => setValue(+e.target.value)}
        value={value}
        sx={styleTextField}
      />

      <Autocomplete
        value={valueAutoComplete}
        onChange={(event: React.SyntheticEvent, newValue: string | null) => {
          if (newValue === 'sim') {
            setParceleOut(true);
            setValueAutoComplete(optionsParceleOut[0]);
          } else {
            setValueAutoComplete(optionsParceleOut[1]);
            setParceleOut(false);
          }
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={optionsParceleOut}
        sx={{ width: 300 }}
        renderInput={params => (
          <TextField {...params} label="Parcelar valor?" sx={styleTextField} />
        )}
      />

      {parceleOut && (
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
        id="poidInstallments"
        label="Numero de parcelas pagas"
        variant="outlined"
        required
        onChange={e => setPaidInstallments(+e.target.value)}
        value={paidInstallments}
        sx={styleTextField}
      />
      <TextField
        id="clientId"
        select
        label="Cliente"
        value={clientId}
        onChange={handleChange}
        helperText="Selecione o nome do cliente"
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
    </Modal>
  );
};

export default CadastroPurchase;
