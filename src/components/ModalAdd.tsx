import * as React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  Box as MuiBox,
  styled,
  Dialog,
  Typography,
  Breakpoint,
} from '@mui/material';

type Props = {
  title: string;
  children: React.ReactNode;
  buttonIcon?: React.ReactNode;
  cadastrar?: (id?: string) => void;
  tamanho?: false | Breakpoint | undefined;
};
const StyledBox = styled(MuiBox)(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.palette.background.paper,
  marginTop: '5px',
}));

const StyledDialog = styled(Dialog)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const StyledDialogActions = styled(DialogActions)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  width: '100%',
  padding: '16px',
}));
export default function ModalAdd({
  children,
  title,
  cadastrar,
  buttonIcon,
  tamanho,
}: Props) {
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

  return (
    <StyledBox>
      <Button variant="outlined" onClick={handleClickOpen}>
        {buttonIcon || <AddCircleIcon />}
        <Typography sx={{ marginLeft: '5px' }}>Add {title}</Typography>
      </Button>
      <StyledDialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth={tamanho}
      >
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
