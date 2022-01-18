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
const Box = styled(MuiBox)(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.palette.background.paper,
  marginTop: '5px',
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
    <Box>
      <Button variant="outlined" onClick={handleClickOpen}>
        {buttonIcon || <AddCircleIcon />}
        <Typography sx={{ marginLeft: '5px' }}>Add {title}</Typography>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth={tamanho}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>

        <DialogActions
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%',
            padding: '16px',
          }}
        >
          <Button
            sx={{
              width: '64px',
              padding: '0 48px',
              height: '32px',
            }}
            variant="outlined"
            color="error"
            onClick={handleClose}
          >
            <Typography>{cadastrar ? 'Cancelar' : 'Fechar'}</Typography>
          </Button>
          {cadastrar && (
            <Button
              sx={{
                width: '64px',
                padding: '8px 48px',
                height: '32px',
              }}
              variant="contained"
              color="primary"
              onClick={handleCloseCadastro}
            >
              <Typography>Salvar</Typography>
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}