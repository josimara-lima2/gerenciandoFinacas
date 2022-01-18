import * as React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { DeleteOutline } from '@mui/icons-material';

import {
  Box as MuiBox,
  styled,
  Dialog,
  Typography,
  IconButton,
  Breakpoint,
} from '@mui/material';

type Props = {
  title: string;
  children: React.ReactNode;

  deleteProps: () => void;
  tamanho?: false | Breakpoint | undefined;
};
const Box = styled(MuiBox)(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.palette.background.paper,
  marginTop: '5px',
}));

export default function ModalDelete({
  children,
  title,
  deleteProps,

  tamanho,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    deleteProps();
    setOpen(false);
  };

  return (
    <Box>
      <IconButton onClick={handleClickOpen}>
        <DeleteOutline />
      </IconButton>
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
            paddingBottom: '16px',
          }}
        >
          <Button
            color="primary"
            variant="contained"
            sx={{
              width: '64px',
              height: '32px',
              padding: '8px 48px',
            }}
            onClick={handleClose}
          >
            <Typography>Cancelar</Typography>
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{ width: '64px', padding: '8px 48px', height: '32px' }}
            onClick={handleClose}
          >
            <Typography>Excluir</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
