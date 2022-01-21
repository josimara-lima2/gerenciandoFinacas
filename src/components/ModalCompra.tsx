import * as React from 'react';
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Box, Typography, IconButton, Modal } from '@mui/material';
import { IPurchase } from 'store/reducers/compras';

type Props = {
  compra: IPurchase;
};
const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid background.paper',
  boxShadow: 24,
  p: 4,
};

export default function ModalCompra({ compra }: Props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton color="warning" onClick={handleClickOpen}>
        <InfoIcon />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <AddShoppingCartIcon />
          <>
            <Typography variant="h6">Detalhes da compra</Typography>

            <Typography variant="subtitle1">
              Compra parcelada em: {compra.numberOfInstallments}x
            </Typography>
            <Typography>
              Número de parcelas pagas: {compra.paidInstallments}
            </Typography>
            <Typography>Status: {compra.status}</Typography>
            <Typography>Forma de pagamento: {compra.formOfPayment}</Typography>
          </>

          <Button
            variant="modalBtn"
            color="error"
            onClick={handleClose}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '50%',
              padding: '16px',
              margin: '18px 25% -2px 25%',
            }}
          >
            <Typography> Fechar</Typography>
          </Button>
        </Box>
      </Modal>
    </>
  );
}
