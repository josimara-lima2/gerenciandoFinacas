import * as React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box as MuiBox, styled, Dialog } from '@mui/material';

type Props = {
  title: string;
  children: any;
  cadastrar?: () => void;
};
const Box = styled(MuiBox)(() => ({
  width: '480px',
  display: 'flex',
}));

export default function Modal({ children, title, cadastrar }: Props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (cadastrar) {
      cadastrar();
    }
    setOpen(false);
  };

  return (
    <Box>
      <Button variant="text" onClick={handleClickOpen}>
        <AddCircleIcon />
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText />
          {children}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" color="success" onClick={handleClose}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}