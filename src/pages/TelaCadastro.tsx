import {
  styled,
  TextField as MuiTextField,
  Button as MuiButton,
  Box as MuiBox,
  Typography,
  Divider,
  Link,
} from '@mui/material';
import { useState } from 'react';
import { useAppDispatch } from 'store';
import { useNavigate } from 'react-router-dom';
import { fetchApiCadastroUser } from '../store/reducers/user';
import imgLogin from '../assets/images/login.png';

const TextField = styled(MuiTextField)(({ theme }) => ({
  margin: '5px',
  width: '60%',
  borderRadius: '20px',
  color: theme.palette.mode === 'dark' ? '#000000' : '#fafafa',
}));

const Button = styled(MuiButton)(() => ({
  margin: '15px',
  border: '0.5px solid #1C86EE',
  borderRadius: '5px',
  backgroundColor: '#1C86EE',
  width: '60%',
  color: '#fafafa',
  padding: '8px 0',
}));
export default function TelaCadastro() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const handleClick = () => {
    dispatch(
      fetchApiCadastroUser({ name, email, password, passwordConfirmation }),
    );
    navigate('/login');
  };

  function linkLogin() {
    navigate('/login');
  }

  return (
    <MuiBox
      sx={{
        width: '100%',
        height: '100vh',

        display: 'flex',
        alignItems: 'center',
      }}
    >
      <MuiBox
        sx={{
          width: '50%',
          height: '80%',

          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img width="80%" src={imgLogin} alt="loginImg" />
      </MuiBox>
      <Divider
        orientation="vertical"
        sx={{
          height: '50%',
        }}
      />
      <MuiBox
        sx={{
          width: '50%',
          height: '80%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: '16px' }}>
          Cadastro
        </Typography>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          value={name}
          required
          onChange={e => setName(e.target.value)}
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
        />
        <TextField
          id="passwordConfirmation"
          label="Password_Confirmation"
          variant="outlined"
          value={passwordConfirmation}
          required
          onChange={e => setPasswordConfirmation(e.target.value)}
        />
        <Button variant="contained" onClick={() => handleClick()}>
          Cadastrar
        </Button>
        <MuiButton onClick={() => linkLogin()}>Login</MuiButton>
      </MuiBox>
    </MuiBox>
  );
}
