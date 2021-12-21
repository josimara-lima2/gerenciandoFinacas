import { Box as MuiBox, TextField, styled, Button } from '@mui/material';
import Modal from 'components/Modal/Modal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { fetchApi, UserSelector } from '../store/reducers/user';

const Box = styled(MuiBox)(({ theme: { spacing, palette } }) => ({
  backgroundColor: palette.background.paper,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
}));

export default function Cadastro() {
  const dispatch = useAppDispatch();
  const user = useSelector(UserSelector);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleClick = () => {
    dispatch(fetchApi({ name, email, password, passwordConfirmation }));
  };

  return (
    <div>
      <Modal title="Cadastre-se" cadastrar={handleClick}>
        <Box>
          <TextField
            id="nome"
            label="Nome"
            variant="filled"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <TextField
            id="email"
            label="Email"
            variant="filled"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            id="password"
            label="Password"
            variant="filled"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <TextField
            id="passwordConfirmation"
            label="Password"
            variant="filled"
            value={passwordConfirmation}
            onChange={e => setPasswordConfirmation(e.target.value)}
          />
        </Box>
      </Modal>
    </div>
  );
}
