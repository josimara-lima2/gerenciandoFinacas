import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

type Props = {
  title: string;
  children: any;
  cadastrar?: () => void;
};

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
    <div>
      <Button variant="text" onClick={handleClickOpen}>
        <AddCircleIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText />
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
