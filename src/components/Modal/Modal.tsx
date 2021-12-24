/* eslint-disable react/no-unused-prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box as MuiBox, styled, Dialog, Typography } from '@mui/material';
import { JsxElement } from 'typescript';
import HowToRegIcon from '@mui/icons-material/HowToReg';

type Props = {
  title: string;
  children: React.ReactNode;
  buttonIcon?: React.ReactNode;
  cadastrar?: () => void;
  list?: () => void;
};
const Box = styled(MuiBox)(({ theme }) => ({
  display: 'flex',
  marginRight: '50px',
  backgroundColor: theme.palette.background.paper,
  marginTop: '25px',
}));

export default function Modal({
  children,
  title,
  cadastrar,
  buttonIcon,
  list,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    if (list) {
      list();
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseCad = () => {
    if (cadastrar) {
      cadastrar();
    }
    handleClose();
  };

  return (
    <Box>
      <Button variant="text" onClick={handleClickOpen} sx={{ width: '10px' }}>
        {buttonIcon || <AddCircleIcon />}
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText />
          {children}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={handleClose}
            sx={{
              marginBottom: '15px',
              marginRight: '10px',
            }}
          >
            <Typography>{list ? 'Fechar' : 'Cancelar'}</Typography>
          </Button>

          {cadastrar && (
            <Button
              variant="contained"
              color="success"
              onClick={handleCloseCad}
              sx={{
                marginBottom: '15px',
                marginRight: '10px',
              }}
            >
              Salvar
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
