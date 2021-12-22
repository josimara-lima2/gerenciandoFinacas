import {
  Box as MuiBox,
  TextField as MuiTextField,
  styled,
  FormControl,
  InputLabel,
  InputAdornment,
  Input,
} from '@mui/material';
import Modal from 'components/Modal/Modal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import SearchIcon from '@mui/icons-material/Search';
import { fetchApi, UserSelector } from '../../store/reducers/user';

const Box = styled(MuiBox)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
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
  const TextField = styled(MuiTextField)(({ theme }) => ({
    margin: '5px',

    width: '80%',
    borderRadius: '20px',
    color: theme.palette.mode === 'dark' ? '#000' : '#fafafa',
  }));
  return (
    <MuiBox
      className="container"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Modal title="Cadastre-se" cadastrar={handleClick}>
        <Box>
          <TextField
            id="nome"
            label="Nome"
            variant="outlined"
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <TextField
            id="passwordConfirmation"
            label="Password"
            variant="outlined"
            required
            value={passwordConfirmation}
            onChange={e => setPasswordConfirmation(e.target.value)}
          />
        </Box>
      </Modal>

      <FormControl variant="outlined">
        <InputLabel variant="standard" htmlFor="search">
          Search user
        </InputLabel>
        <Input
          id="search"
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
          sx={{ borderRadius: '10px' }}
        />
      </FormControl>
    </MuiBox>
  );
}
