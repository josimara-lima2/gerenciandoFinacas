import { Box as MuiBox } from '@mui/material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import {
  fetchApiPost,
  PageCardSelector,
  fetchApiPageCard,
} from 'store/reducers/cartoes';
import AddCardIcon from '@mui/icons-material/AddCard';
import { maskCode, maskNumber, maskValue, maskFatura } from 'utils/masks';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import ModalAdd from './ModalAdd';
import TextFieldCadastro from './TextFieldCadastro';

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
    <ModalAdd
      title="cartão"
      cadastrar={cadastrar}
      buttonIcon={<AddCardIcon />}
      tamanho="sm"
    >
      <TextFieldCadastro
        onChange={e => setName(e.target.value)}
        label="Nome"
        value={name}
      />
      <TextFieldCadastro
        label="Bandeira"
        onChange={e => setFlag(e.target.value)}
        value={flag}
      />

      <TextFieldCadastro
        label="Titular"
        onChange={e => setCardHolderName(e.target.value)}
        value={cardHolderName}
      />

      <MuiBox sx={{ display: 'flex', width: '100%' }}>
        <TextFieldCadastro
          label="Limite"
          onChange={e => setLimit(maskValue(e))}
          value={limit}
          sx={{ marginRight: '5%' }}
        />
        <TextFieldCadastro
          label="Limite_Disponivel"
          onChange={e => setAvailableLimit(maskValue(e))}
          value={availableLimit}
        />
      </MuiBox>

      <TextFieldCadastro
        label="Vencimento"
        placeholder="00/00/0000"
        onChange={e => setDueDate(e.target.value)}
        icon={<DateRangeOutlinedIcon />}
        value={dueDate}
      />

      <TextFieldCadastro
        label="Fatura"
        onChange={e => setInvoiceClosing(maskFatura(e))}
        value={invoiceClosing}
      />

      <TextFieldCadastro
        label="numero"
        placeholder="9999 9999 9999 9999"
        onChange={e => setNumber(maskNumber(e))}
        icon={<CreditCardOutlinedIcon />}
        value={number}
      />

      <TextFieldCadastro
        label="codigo"
        placeholder="000"
        onChange={e => setCode(maskCode(e))}
        value={code}
      />
    </ModalAdd>
  );
};

export default CadastroCard;
