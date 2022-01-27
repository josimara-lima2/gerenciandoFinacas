import {
  Button as MuiButton,
  Box as MuiBox,
  Typography,
  styled,
  Checkbox,
  FormControlLabel,
  useTheme,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Alerta from 'components/Alerta';
import useAuth from 'hooks/useAuth';
import { useAppDispatch } from 'store';
import InputUnstyled, { InputUnstyledProps } from '@mui/base/InputUnstyled';
import { fetchApiCadastroUser } from '../../store/reducers/user';
import Footer from './components/Footer';

const StyledButton = styled(MuiButton)(() => ({
  backgroundColor: '#1664B8',
  color: '#fff',
  fontWeight: 'bold',
  width: '320px',
  height: '40px',
  borderRadius: '10px',
  marginTop: '12px',
  '&:hover': {
    backgroundColor: '#1664B8cc',
  },
}));

const StyledBoxForm = styled(MuiBox)(({ theme }) => ({
  marginTop: '10%',
  color: `${theme.palette.mode === 'dark' ? '#fff' : '#0D3A6B'}`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '347px',
  height: '408px',

  padding: '8px',
}));

const ButtonLink = styled(MuiButton)(() => ({
  textDecoration: 'underline',
  textTransform: 'none',
}));

const StyledInputElement = styled('input')(
  ({ theme }) => `
  width: 320px;
  height: 50px;
  font-size: 0.875rem;

  font-weight: 400;
  line-height: 1.5;
  color: ${theme.palette.mode === 'dark' ? '#ffffff' : '#fafafa'};
  background: ${theme.palette.mode === 'dark' ? '#0D3A6B' : '#0D3A6B'};
  border: 1px solid ${theme.palette.mode === 'dark' ? '#0D3A6B' : '#0D3A6B'};
  border-radius: 10px;
  padding: 12px 12px;
  transition: all 150ms ease;
  margin-bottom: 24px;

  &:hover {

    border-color: ${theme.palette.mode === 'dark' ? '#0D3A6B' : '#0D3A6B'};
  }

  &:focus {
    outline: none;
    outline-offset: 2px;
  }
`,
);

const CustomInput = React.forwardRef(function CustomInput(
  props: InputUnstyledProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <InputUnstyled
      components={{ Input: StyledInputElement }}
      {...props}
      ref={ref}
    />
  );
});

export default function LoginRegister() {
  const navigate = useNavigate();
  const { signin } = useAuth();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [pageLoginSelect, setPageLoginSelect] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [openAlerta, setOpenAlerta] = useState(false);
  const [message, setMessage] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  useEffect(() => {
    if (location.pathname === '/cadastro') {
      setPageLoginSelect(false);
    }
  }, [location]);

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
    setOpenAlerta(false);
    navigate('/cadastro');
  }

  function linkLogin() {
    setPageLoginSelect(true);
    setOpenAlerta(false);
    navigate('/login');
  }
  const [checked, setChecked] = useState(true);
  const { palette } = useTheme();

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return (
    <MuiBox
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',

        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {pageLoginSelect && (
        <StyledBoxForm>
          <Typography variant="h2" style={{ fontWeight: 500 }}>
            Sign in
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontSize: '0.9rem', marginBottom: '24px' }}
          >
            Acesse sua conta e aproveite os nossos recursos!
          </Typography>

          <CustomInput
            aria-label="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <CustomInput
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <MuiBox
            sx={{
              display: 'flex',

              width: '320px',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'Montserrat,  sans-serif',
              marginTop: '-5px',
            }}
          >
            <FormControlLabel
              label="Remember me"
              sx={{
                color: `${palette.mode === 'dark' ? '#fff' : 'secondary'}`,
              }}
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleChecked}
                  size="small"
                  sx={{
                    '& .MuiSvgIcon-root': {
                      marginTop: '-0.3rem',

                      border: 'none',
                    },
                  }}
                />
              }
              labelPlacement="end"
            />
            <ButtonLink onClick={() => linkCadastro()}>
              Forgot Password?
            </ButtonLink>
          </MuiBox>

          <StyledButton onClick={() => handleLogin()}>Login</StyledButton>

          <ButtonLink
            onClick={() => linkCadastro()}
            sx={{ marginRight: '10px', fontSize: '16px' }}
          >
            Cadastre-se
          </ButtonLink>

          <Alerta open={openAlerta} setOpen={setOpenAlerta} message={message} />
        </StyledBoxForm>
      )}
      {!pageLoginSelect && (
        <StyledBoxForm>
          <Typography variant="h2" style={{ fontWeight: 500 }}>
            Sign up
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontSize: '0.9rem', marginBottom: '24px' }}
          >
            Cadastre-se e tenha controle de suas finanças
          </Typography>

          <CustomInput
            aria-label="Nome"
            placeholder="Nome"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <CustomInput
            aria-label="Email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <CustomInput
            aria-label="Password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <CustomInput
            aria-label="Password_Confirmation"
            placeholder="Password_Confirmation"
            value={passwordConfirmation}
            onChange={e => setPasswordConfirmation(e.target.value)}
          />

          <StyledButton onClick={() => handleCadastroUser()}>
            Cadastrar
          </StyledButton>

          <ButtonLink
            onClick={() => linkLogin()}
            sx={{ marginRight: '10px', fontSize: '16px' }}
          >
            Sign in
          </ButtonLink>

          <Alerta open={openAlerta} setOpen={setOpenAlerta} message={message} />
        </StyledBoxForm>
      )}
      <Footer />
    </MuiBox>
  );
}
