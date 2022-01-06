import {
  styled,
  TextField as MuiTextField,
  Button as MuiButton,
  Box as MuiBox,
  Typography,
  Divider,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  Alert,
  Collapse,
} from '@mui/material';
import { useState } from 'react';
import { useAppDispatch } from 'store';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { fetchApiLogin } from '../store/reducers/user';
import imgLogin from '../assets/images/login.png';

const TextField = styled(MuiTextField)(({ theme }) => ({
  margin: '5px',
  width: '60%',
  borderRadius: '20px',
  color: theme.palette.mode === 'dark' ? '#000000' : '#fafafa',
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
  },
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
  },
  [theme.breakpoints.up('lg')]: {
    width: '100%',
    height: '100vh',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
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
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleClickShowPassword = () => {
    setPassword(password);
    setShowPassword(!showPassword);
  };
  function handleLogin() {
    setOpen(!open);
    dispatch(fetchApiLogin({ email, password }))
      .unwrap()
      .then(response => {
        const { token } = response;
        if (token) {
          setMessage(response.statusText);
          navigate('/');
        }
      })
      .catch(e => {
        setMessage(e.message);
      });
  }
  function linkCadastro() {
    navigate('/cadastro');
  }

  return (
    <Box>
      <MuiBox
        sx={{
          width: '50%',
          height: '80%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img width="80%" src={imgLogin} alt="loginImg" />
        <Divider
          orientation="vertical"
          sx={{
            height: '90%',
            marginLeft: '15%',
          }}
        />
      </MuiBox>

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
        {' '}
        <Collapse in={open}>
          <Alert
            severity="error"
            color="error"
            action={
              <IconButton
                aria-label="close"
                size="small"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mt: 10 }}
          >
            {message}
          </Alert>
        </Collapse>
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
