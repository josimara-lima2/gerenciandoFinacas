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
import { fetchApiLogin } from '../store/reducers/user';
import imgLogin from '../assets/images/login.png';

const Box = styled(MuiBox)(() => ({
  width: '100%',

  marginTop: '300px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

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
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    dispatch(fetchApiLogin({ email, password }))
      .unwrap()
      .then(response => {
        const { token } = response;
        if (token) navigate('/');
      });
  }
  function linkCadastro() {
    navigate('/cadastro');
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
          Login
        </Typography>
        <TextField
          variant="outlined"
          label="Email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="Password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={() => handleLogin()}>
          Login
        </Button>
        <MuiButton onClick={() => linkCadastro()}>Cadastre-se</MuiButton>
      </MuiBox>
    </MuiBox>
  );
}
