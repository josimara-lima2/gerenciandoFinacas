import { Box, TextField as MuiTextField } from '@mui/material';
import Modal from 'components/Modal/Modal';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import {
  PageSelector,
  fetchApiPage,
  addClient,
  fetchApiPost,
} from 'store/reducers/pageClient';
import { maskCpf } from 'utils/masks';
import InputAdornment from '@mui/material/InputAdornment';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CallIcon from '@mui/icons-material/Call';
import TextField from 'components/TextField/TextField';

export default function Cadastro() {
  const dispatch = useAppDispatch();
  const { pageCliente } = useAppSelector(PageSelector);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [cpf, setCpf] = useState('');

  const handleClick = () => {
    dispatch(fetchApiPost({ name, email, telephone, cpf }))
      .unwrap()
      .then(response => {
        const { statusCode } = response;
        if (statusCode === 200) {
          dispatch(
            addClient({ id: 'idTemporario', name, email, telephone, cpf }),
          );
          setName('');
          setEmail('');
          setTelephone('');
          setCpf('');
        }
        dispatch(fetchApiPage(pageCliente.page));
      })
      .catch(e => e.message);
  };
  const styleTextField = {
    margin: '8px',
    width: '100%',
    borderRadius: '20px',
  };
  return (
    <Modal title="Cadastre-se" cadastrar={handleClick} tamanho="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <MuiTextField
          id="nome"
          label="Nome"
          variant="outlined"
          required
          value={name}
          onChange={e => {
            setName(e.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PermIdentityIcon />
              </InputAdornment>
            ),
          }}
          sx={styleTextField}
        />
        <MuiTextField
          id="email"
          label="Email"
          variant="outlined"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          sx={styleTextField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineIcon />
              </InputAdornment>
            ),
          }}
        />
        <MuiTextField
          id="telephone"
          label="Telephone"
          variant="outlined"
          required
          value={telephone}
          onChange={e => setTelephone(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CallIcon />
              </InputAdornment>
            ),
          }}
          sx={styleTextField}
        />
        <TextField
          id="cpf"
          label="Cpf"
          variant="outlined"
          required
          value={cpf}
          onChange={e => setCpf(maskCpf(e))}
          sx={styleTextField}
        />
      </Box>
    </Modal>
  );
}
