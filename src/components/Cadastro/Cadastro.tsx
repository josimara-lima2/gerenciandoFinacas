import {
  Box as MuiBox,
  TextField as MuiTextField,
  styled,
} from '@mui/material';
import Modal from 'components/Modal/Modal';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';

import { PageSelector, fetchApiPage } from 'store/reducers/pages';
import { fetchApiPost } from 'store/reducers/clients';

const Box = styled(MuiBox)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

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
          dispatch(fetchApiPage(pageCliente.page));
          setName('');
          setEmail('');
          setTelephone('');
          setCpf('');
        }
      })
      .catch(e => e.message);
  };
  const styleTextField = {
    margin: '5px',
    width: '80%',
    borderRadius: '20px',
  };
  return (
    <MuiBox
      component="form"
      className="container"
      noValidate
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Modal title="Cadastre-se" cadastrar={handleClick}>
        <Box>
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
            onChange={e => setCpf(e.target.value)}
            sx={styleTextField}
          />
        </Box>
      </Modal>
    </MuiBox>
  );
}
