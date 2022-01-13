import {
  Typography,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import Alerta from 'components/Alerta/Alerta';
import useAuth from 'hooks/useAuth';
import TextField from 'components/TextField/TextField';
import imgLogin from '../assets/images/login.png';
import {
  BoxContainer,
  BoxForm,
  BoxImagem,
  Divider,
  Button,
  ButtonLink,
  FormControl,
} from './styledRegister_Login';

export default function Login() {
  const navigate = useNavigate();
  const { signin } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleClickShowPassword = () => {
    setPassword(password);
    setShowPassword(!showPassword);
  };

  function handleLogin() {
    signin({ email, password })
      .then(res => {
        navigate('/');
      })
      .catch(error => {
        setOpen(true);
        setMessage(error.message);
      });
  }
  function linkCadastro() {
    navigate('/cadastro');
  }

  return (
    <BoxContainer>
      <BoxImagem>
        <img width="80%" src={imgLogin} alt="loginImg" />
      </BoxImagem>
      <Divider orientation="vertical" sx={{}} />

      <BoxForm>
        <Alerta open={open} setOpen={setOpen} message={message} />
        <LockOutlinedIcon />
        <Typography variant="h6" sx={{ marginBottom: '16px' }}>
          Sign in
        </Typography>
        <TextField
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <FormControl sx={{ m: 1, width: '60%' }} variant="outlined">
          <InputLabel required htmlFor="password">
            Password
          </InputLabel>
          <OutlinedInput
            required
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? (
                    <VisibilityOffOutlinedIcon />
                  ) : (
                    <VisibilityOutlinedIcon />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button variant="contained" onClick={() => handleLogin()}>
          Login
        </Button>
        <ButtonLink onClick={() => linkCadastro()}>Cadastre-se</ButtonLink>
      </BoxForm>
    </BoxContainer>
  );
}
