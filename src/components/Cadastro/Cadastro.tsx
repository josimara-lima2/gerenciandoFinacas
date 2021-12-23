import {
  Box as MuiBox,
  TextField as MuiTextField,
  styled,
  FormControl,
  InputLabel,
  InputAdornment,
  Input,
} from '@mui/material';
import Modal from 'components/Modal/Modal';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import SearchIcon from '@mui/icons-material/Search';
import {
  fetchApiPost,
  ClientSelector,
  addClient,
} from '../../store/reducers/clients';

const Box = styled(MuiBox)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export default function Cadastro() {
  const dispatch = useAppDispatch();
  const user = useSelector(ClientSelector);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [cpf, setCpf] = useState('');
  useEffect(() => {
    dispatch(fetchApiPost({ name, email, telephone, cpf }));
  }, [dispatch]);

  const handleClick = () => {
    dispatch(fetchApiPost({ name, email, telephone, cpf }))
      .unwrap()
      .then(response => {
        const { statusCode } = response;
        if (statusCode === 200) {
          dispatch(addClient({ name, email, telephone, cpf }));
        }
      })
      .catch(e => e.message);
  };
  const TextField = styled(MuiTextField)(({ theme }) => ({
    margin: '5px',

    width: '80%',
    borderRadius: '20px',
    color: theme.palette.mode === 'dark' ? '#000' : '#fafafa',
  }));
  return (
    <MuiBox
      className="container"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Modal title="Cadastre-se" cadastrar={handleClick}>
        <Box>
          <TextField
            id="nome"
            label="Nome"
            variant="outlined"
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            id="telephone"
            label="Telephone"
            variant="outlined"
            required
            value={telephone}
            onChange={e => setTelephone(e.target.value)}
          />
          <TextField
            id="cpf"
            label="Cpf"
            variant="outlined"
            required
            value={cpf}
            onChange={e => setCpf(e.target.value)}
          />
        </Box>
      </Modal>
    </MuiBox>
  );
}
