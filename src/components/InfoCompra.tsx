import Modal from 'components/Modal';
import React from 'react';
import { IPurchase } from 'store/reducers/compras';
import { Box, Collapse, IconButton, Tooltip, Typography } from '@mui/material';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';

type Props = {
  compra: IPurchase;
};
const InfoCompra = ({ compra }: Props) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Modal title="info">
      {compra.parceleOut && (
        <Box>
          <Typography>Compra parcelada</Typography>
          <Typography>Número de parcelas: {compra.parceleOut}</Typography>
          <Typography>
            Número de parcelas: {compra.numberOfInstallments}
          </Typography>
          <Typography>
            Número de parcelas pagas: {compra.paidInstallments}
          </Typography>
        </Box>
      )}
      {!compra.parceleOut && (
        <Box>
          <Typography variant="h6">Compra não parcelada</Typography>
          <Typography>Status: {compra.status}</Typography>
          <Typography>Forma de pagamento: {compra.formOfPayment}</Typography>
        </Box>
      )}
      <Tooltip title="Ids relacionados" placement="right">
        <IconButton onClick={() => setOpen(!open)}>
          <VpnKeyOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Collapse in={open}>
        {compra.client && compra.creditCard && (
          <Typography>
            Id da compra: {compra.id} <br />
            Id do cliente: {compra.client.id} <br />
            Id fo cartão: {compra.creditCard.id} <br />
          </Typography>
        )}
      </Collapse>
    </Modal>
  );
};

export default InfoCompra;
