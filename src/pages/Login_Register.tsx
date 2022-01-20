import {
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  styled,
  Button as MuiButton,
  Box as MuiBox,
  Divider as MuiDivider,
  FormControl as MuiFormControl,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import Alerta from 'components/Alerta';
import useAuth from 'hooks/useAuth';
import TextField from 'components/TextField';
import { useAppDispatch } from 'store';
import imgLogin from '../assets/images/login.png';
import { fetchApiCadastroUser } from '../store/reducers/user';

export const FormControl = styled(MuiFormControl)(({ theme }) => ({
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

export const BoxContainer = styled(MuiBox)(({ theme }) => ({
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

export const BoxImagem = styled(MuiBox)(({ theme }) => ({
  width: '50%',
  height: '80%',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export const Button = styled(MuiButton)(({ theme }) => ({
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

export const BoxForm = styled(MuiBox)(() => ({
  width: '50%',
  height: '80%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const Divider = styled(MuiDivider)(() => ({
  height: '70%',
}));

export const ButtonLink = styled(MuiButton)(() => ({
  textDecoration: 'underline',
}));

export default function LoginRegister() {
  const navigate = useNavigate();
  const { signin } = useAuth();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [pageLoginSelect, setPageLoginSelect] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [openAlerta, setOpenAlerta] = useState(false);
  const [message, setMessage] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  useEffect(() => {
    if (location.pathname === '/cadastro') {
      setPageLoginSelect(false);
    }
  }, [location]);
  const handleClickShowPassword = () => {
    setPassword(password);
    setShowPassword(!showPassword);
  };

  const handleCadastroUser = () => {
    setOpenAlerta(!openAlerta);

    dispatch(
      fetchApiCadastroUser({ name, email, password, passwordConfirmation }),
    )
      .unwrap()
      .then(response => {
        setPageLoginSelect(true);
        setMessage(response.message);
        navigate('/login');
      })
      .catch(e => {
        setOpenAlerta(true);
        setMessage(e.message);
      });
  };

  function handleLogin() {
    signin({ email, password })
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        setOpenAlerta(true);
        setMessage(error.message);
      });
  }

  function linkCadastro() {
    setPageLoginSelect(false);
    setEmail('');
    setPassword('');
    navigate('/cadastro');
  }

  function linkLogin() {
    setPageLoginSelect(true);
    navigate('/login');
  }

  return (
    <BoxContainer>
      <BoxImagem>
        <img width="80%" src={imgLogin} alt="loginImg" />
      </BoxImagem>
      <Divider orientation="vertical" sx={{}} />

      {pageLoginSelect && (
        <BoxForm>
          <Alerta open={openAlerta} setOpen={setOpenAlerta} message={message} />
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
      )}
      {!pageLoginSelect && (
        <BoxForm>
          <Alerta open={openAlerta} setOpen={setOpenAlerta} message={message} />
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
      )}
    </BoxContainer>
  );
}
