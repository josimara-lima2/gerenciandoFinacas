import {
  styled,
  TextField as MuiTextField,
  Button as MuiButton,
  Box as MuiBox,
} from '@mui/material';
import { useState } from 'react';
import { useAppDispatch } from 'store';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { fetchApiCadastroUser } from '../store/reducers/user';
import imgLogin from '../assets/images/login.png';

const Box = styled(MuiBox)(() => ({
  width: '100%',
  height: '70%',
  marginTop: '20px',
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

const Button = styled(MuiButton)(() => ({
  margin: '15px',
  border: 'none',
  backgroundColor: '#1E90FF',
  width: '13%',
  color: '#fafafa',
  height: '5%px',
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

  return (
    <Box>
      <img src={imgLogin} alt="login" width="30%" />
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          marginRight: '6%',
        }}
      >
        <RouterLink to="/login">Login</RouterLink>

        <Button
          variant="contained"
          onClick={handleClick}
          sx={{ marginLeft: '5%' }}
        >
          Cadastrar-se
        </Button>
      </Box>
    </Box>
  );
}
