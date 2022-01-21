import * as React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CreateIcon from '@mui/icons-material/Create';
import InfoIcon from '@mui/icons-material/Info';

import {
  Box as MuiBox,
  styled,
  Dialog,
  Typography,
  IconButton,
} from '@mui/material';

type Props = {
  title: 'editar' | 'info';
  children: React.ReactNode;
  cadastrar?: (id?: string) => void;
};
const StyledBox = styled(MuiBox)(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.palette.background.paper,
  marginTop: '5px',
}));

const StyledDialogActions = styled(DialogActions)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  width: '100%',
  padding: '16px',
}));

const StyledDialog = styled(Dialog)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export default function Modal({ children, title, cadastrar }: Props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseCadastro = () => {
    if (cadastrar) {
      cadastrar();
    }
    handleClose();
  };

  const SelectIcon = () => {
    switch (title) {
      case 'info':
        return <InfoIcon />;
      case 'editar':
        return <CreateIcon />;
      default:
        return <AddCircleIcon />;
    }
  };
  return (
    <StyledBox>
      <IconButton
        color={title === 'editar' ? 'primary' : 'warning'}
        onClick={handleClickOpen}
      >
        {SelectIcon()}
      </IconButton>
      <StyledDialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>

        <StyledDialogActions>
          <Button variant="modalBtn" color="error" onClick={handleClose}>
            <Typography>{cadastrar ? 'Cancelar' : 'Fechar'}</Typography>
          </Button>
          {cadastrar && (
            <Button variant="modalBtn" onClick={handleCloseCadastro}>
              <Typography>Salvar</Typography>
            </Button>
          )}
        </StyledDialogActions>
      </StyledDialog>
    </StyledBox>
  );
}
