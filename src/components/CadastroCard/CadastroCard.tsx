import { Box as MuiBox, TextField, styled } from '@mui/material';
import Modal from 'components/Modal/Modal';
import { useState, ChangeEventHandler } from 'react';
import { useAppDispatch } from 'store';
import { addCard, fetchApiPost, fetchApi } from 'store/reducers/cards';
import InputMask from 'react-input-mask';
import AddCardIcon from '@mui/icons-material/AddCard';
import MaterialInput from '@material-ui/core/Input';

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
type Props = {
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
};

const Input2 = ({ value, onChange }: Props) => {
  return (
    <InputMask
      mask="9999 9999 9999 9999"
      value={value}
      maskPlaceholder="0"
      onChange={onChange}
    />
  );
};

// Will work fine
function Input3({ value, onChange }: Props) {
  return (
    <InputMask mask="99/99/9999" value={value} onChange={onChange}>
      <MaterialInput />
    </InputMask>
  );
}

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
          dispatch(fetchApi());
          dispatch(
            addCard({
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
          );
        }
      })
      .catch(e => e.message);
  };
  function mcc(v: string) {
    v = v.replace(/\D/g, '');
    v = v.replace(/^(\d{4})(\d)/g, '$1 $2');
    v = v.replace(/^(\d{4})\s(\d{4})(\d)/g, '$1 $2 $3');
    v = v.replace(/^(\d{4})\s(\d{4})\s(\d{4})(\d)/g, '$1 $2 $3 $4');
    return v;
  }
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
              onChange={e => setLimit(+e.target.value)}
              value={limit}
              required
              sx={styleTextField}
            />
            <TextField
              id="limitDisponivel"
              label="Limite Disponivel"
              variant="outlined"
              onChange={e => setAvailableLimit(+e.target.value)}
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
            onChange={e => setInvoiceClosing(+e.target.value)}
            value={invoiceClosing}
            sx={styleTextField}
          />

          <TextField
            id="teste"
            label="numero"
            variant="outlined"
            required
            onChange={e => setNumber(mcc(e.target.value))}
            value={number}
            sx={styleTextField}
          />
          <TextField
            id="code"
            label="código"
            variant="outlined"
            required
            onChange={e => setCode(e.target.value)}
            value={code}
            sx={styleTextField}
          />
        </Box>
      </Modal>
    </MuiBox>
  );
};

export default CadastroCard;
