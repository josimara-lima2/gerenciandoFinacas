import {
  styled,
  TextField as MuiTextField,
  Button as MuiButton,
  Box as MuiBox,
  Typography,
  Divider,
  IconButton,
  InputAdornment,
  FormControl as MuiFormControl,
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
import imgLogin from '../assets/images/login.png';

const FormControl = styled(MuiFormControl)(({ theme }) => ({
  m: 1,
  width: '60%',
  [theme.breakpoints.down('xs')]: {
    width: '100%',
  },
  [theme.breakpoints.down('md')]: {
    width: '80%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '40%',
  },
}));

const TextField = styled(MuiTextField)(({ theme }) => ({
  margin: '5px',
  width: '60%',
  borderRadius: '20px',
  color: theme.palette.mode === 'dark' ? '#000000' : '#fafafa',
  [theme.breakpoints.down('xs')]: {
    width: '100%',
  },
  [theme.breakpoints.down('md')]: {
    width: '80%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '40%',
  },
}));

const Box = styled(MuiBox)(({ theme }) => ({
  display: 'flex',
  padding: 0,
  margin: 0,
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
    height: '80%',
    marginTop: theme.spacing(35),
  },
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
  },
}));

const BoxImagem = styled(MuiBox)(({ theme }) => ({
  width: '50%',
  height: '80%',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const Button = styled(MuiButton)(({ theme }) => ({
  margin: '15px',
  border: '0.5px solid #1C86EE',
  borderRadius: '5px',
  backgroundColor: '#1C86EE',
  width: '60%',
  color: '#fafafa',
  padding: '8px 0',
  [theme.breakpoints.down('xs')]: {
    width: '100%',
  },
  [theme.breakpoints.down('md')]: {
    width: '80%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '40%',
  },
}));
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
    <Box>
      <BoxImagem>
        <img width="80%" src={imgLogin} alt="loginImg" />
      </BoxImagem>
      <Divider
        orientation="vertical"
        sx={{
          height: '70%',
        }}
      />
      {/* box de form */}
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
        <Alerta open={open} setOpen={setOpen} message={message} />

        <LockOutlinedIcon />
        <Typography variant="h6" sx={{ marginBottom: '16px' }}>
          Sign in
        </Typography>
        <TextField
          variant="outlined"
          label="Email"
          required
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
        <MuiButton
          sx={{ textDecoration: 'underline' }}
          onClick={() => linkCadastro()}
        >
          Cadastre-se
        </MuiButton>
      </MuiBox>
    </Box>
  );
}
