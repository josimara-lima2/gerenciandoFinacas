import * as React from 'react';
import { DeleteOutline } from '@mui/icons-material';
import {
  Box as MuiBox,
  styled,
  Dialog as MuiDialog,
  Typography,
  IconButton,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
} from '@mui/material';
import imgDel from '../assets/images/delete.png';

type Props = {
  title: string;

  name: string;
  deleteProps: () => void;
};
const StyledBox = styled(MuiBox)(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.palette.background.paper,
  marginTop: '5px',
}));

const StyledDialog = styled(MuiDialog)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const StyledDialogActions = styled(DialogActions)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  paddingBottom: '16px',
}));

const StyledDialogContent = styled(DialogContent)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'start',
  margin: 0,
}));
export default function ModalDelete({ title, deleteProps, name }: Props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    deleteProps();
    setOpen(false);
  };

  return (
    <StyledBox>
      <IconButton color="error" onClick={handleClickOpen}>
        <DeleteOutline />
      </IconButton>
      <StyledDialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>{title}</DialogTitle>
        <StyledDialogContent>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="subtitle2">
            Deseja excluir {name} de sua lista?
          </Typography>
          <Typography variant="subtitle2">Essa ação é irreversível!</Typography>
          <img width="100px" src={imgDel} alt="delete img" />
        </StyledDialogContent>
        <StyledDialogActions>
          <Button variant="modalBtn" onClick={handleClose}>
            <Typography>Cancelar</Typography>
          </Button>
          <Button variant="modalBtn" color="error" onClick={handleClose}>
            <Typography>Excluir</Typography>
          </Button>
        </StyledDialogActions>
      </StyledDialog>
    </StyledBox>
  );
}
