import { Box, TextField as MuiTextField } from '@mui/material';
import Modal from 'components/Modal/Modal';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';

import { PageSelector, fetchApiPage, addClient } from 'store/reducers/pages';
import { fetchApiPost } from 'store/reducers/clients';
import { maskCpf } from 'utils/masks';

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
    margin: '5px',
    width: '100%',
    borderRadius: '20px',
  };
  return (
    <Box
      component="form"
      noValidate
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Modal title="Cadastre-se" cadastrar={handleClick} tamanho="sm">
        <MuiTextField
          id="nome"
          label="Nome"
          variant="outlined"
          required
          value={name}
          onChange={e => {
            setName(e.target.value);
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
        />
        <MuiTextField
          id="telephone"
          label="Telephone"
          variant="outlined"
          required
          value={telephone}
          onChange={e => setTelephone(e.target.value)}
          sx={styleTextField}
        />
        <MuiTextField
          id="cpf"
          label="Cpf"
          variant="outlined"
          required
          value={cpf}
          onChange={e => setCpf(maskCpf(e))}
          sx={styleTextField}
        />
      </Modal>
    </Box>
  );
}
