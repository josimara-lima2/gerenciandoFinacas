import {
  styled,
  Button as MuiButton,
  Box as MuiBox,
  Divider as MuiDivider,
  FormControl as MuiFormControl,
} from '@mui/material';

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
