import { Typography } from '@mui/material';
import { useState } from 'react';
import { useAppDispatch } from 'store';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from 'components/TextField/TextField';
import Alerta from 'components/Alerta/Alerta';
import { fetchApiCadastroUser } from '../store/reducers/user';
import imgLogin from '../assets/images/login.png';
import {
  BoxContainer,
  BoxForm,
  BoxImagem,
  Divider,
  Button,
  ButtonLink,
} from './styledRegister_Login';

export default function TelaCadastro() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleCadastroUser = () => {
    setOpen(!open);
    dispatch(
      fetchApiCadastroUser({ name, email, password, passwordConfirmation }),
    )
      .unwrap()
      .then(response => {
        navigate('/login');
      })
      .catch(e => {
        setOpen(true);
        setMessage(e.message);
      });
  };

  function linkLogin() {
    navigate('/login');
  }

  return (
    <BoxContainer>
      <BoxImagem>
        <img width="80%" src={imgLogin} alt="loginImg" />
      </BoxImagem>
      <Divider orientation="vertical" />
      <BoxForm>
        <Alerta open={open} setOpen={setOpen} message={message} />
        <LockOutlinedIcon />
        <Typography variant="h6" sx={{ marginBottom: '16px' }}>
          Register
        </Typography>
        <TextField
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <TextField
          label="Password_Confirmation"
          value={passwordConfirmation}
          onChange={e => setPasswordConfirmation(e.target.value)}
        />

        <Button variant="contained" onClick={() => handleCadastroUser()}>
          Cadastrar
        </Button>
        <ButtonLink
          sx={{ textDecoration: 'underline' }}
          onClick={() => linkLogin()}
        >
          Login
        </ButtonLink>
      </BoxForm>
    </BoxContainer>
  );
}
