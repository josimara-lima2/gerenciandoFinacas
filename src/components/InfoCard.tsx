import * as React from 'react';
import {
  Box as MuiBox,
  Typography,
  styled,
  Modal,
  IconButton,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

import chipImg from '../assets/images/chip.png';

type Props = {
  flag: string;
  number: string;
  cardHolderName: string;
  dueDate: string;
  code: string;
};

const Box = styled(MuiBox)(() => ({
  width: '400px',
  height: '230px',
  backgroundImage:
    ' linear-gradient(90deg, rgba(0,0,139,1) 0%, rgba(0,0,128,1) 35%, rgba(25,25,112,1) 100%)',
  border: '0.5px solid rgba(0,0,139,1)',
  borderRadius: '30px',
  color: '#fafafa',
}));

const BoxDateItem = styled(MuiBox)(() => ({
  display: 'flex',
  flexDirection: 'column',
  marginRight: '40px',
}));

const BoxDate = styled(MuiBox)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  marginTop: '20px',
}));

const BoxFlag = styled(MuiBox)(() => ({
  display: 'flex',
  margin: '10px',
  justifyContent: 'space-between',
}));

export default function InfoCard({
  flag,
  number,
  cardHolderName,
  dueDate,
  code,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton onClick={handleClickOpen} color="warning">
        <InfoIcon />
      </IconButton>
      <Modal title="info" open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute' as const,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '1px solid background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <BoxFlag>
            <img
              width={50}
              src={chipImg}
              alt="chip"
              style={{ marginLeft: '-15px' }}
            />
            <Typography sx={{ marginRight: '10px' }}>{flag}</Typography>
          </BoxFlag>
          <Typography align="justify" variant="h5" sx={{ marginTop: '20px' }}>
            {number}
          </Typography>
          <BoxDate>
            <BoxDateItem>
              <Typography variant="caption">Titular</Typography>
              <Typography>{cardHolderName}</Typography>
            </BoxDateItem>
            <BoxDateItem>
              <Typography variant="caption">Vencimento</Typography>
              <Typography>{dueDate}</Typography>
            </BoxDateItem>
            <BoxDateItem>
              <Typography variant="caption">CVV</Typography>
              <Typography>{code}</Typography>
            </BoxDateItem>
          </BoxDate>
        </Box>
      </Modal>
    </>
  );
}
