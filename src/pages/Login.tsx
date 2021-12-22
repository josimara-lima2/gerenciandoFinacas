import {
  styled,
  TextField as MuiTextField,
  Button as MuiButton,
  Box as MuiBox,
} from '@mui/material';
import { useState } from 'react';
import { useAppDispatch } from 'store';
import { useNavigate } from 'react-router-dom';
import { fetchApiLogin } from '../store/reducers/user';
import imgLogin from '../assets/images/login.png';

const Box = styled(MuiBox)(({ theme }) => ({
  width: '100%',
  height: '70%',
  marginTop: '40px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

const TextField = styled(MuiTextField)(({ theme }) => ({
  margin: '5px',
  width: '40%',
  borderRadius: '20px',
  color: theme.palette.mode === 'dark' ? '#000' : '#fafafa',
}));

const Button = styled(MuiButton)(({ theme }) => ({
  margin: '15px',
  border: 'none',
  backgroundColor: '#1E90FF',
  width: '10%',
  color: '#fafafa',
  height: '5%px',
}));
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    dispatch(fetchApiLogin({ email, password }));
    if (localStorage.token) {
      navigate('/cadastro');
    }
  }

  return (
    <Box>
      <img src={imgLogin} alt="login" width="30%" />
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
      <Button onClick={() => handleLogin()}>Login</Button>
    </Box>
  );
}
