import * as React from 'react';
import { Box as MuiBox, Typography, styled } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import Modal from 'components/Modal';
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
  marginLeft: '20px',
}));

const BoxFlag = styled(MuiBox)(() => ({
  display: 'flex',
  margin: '10px 20px',
  justifyContent: 'space-between',
}));

export default function InfoCard({
  flag,
  number,
  cardHolderName,
  dueDate,
  code,
}: Props) {
  return (
    <Modal title="info" tamanho="sm">
      <Box>
        <BoxFlag>
          <img
            style={{ marginTop: '30px' }}
            width={50}
            src={chipImg}
            alt="chip"
          />
          <Typography sx={{ marginRight: '10px', marginTop: '10px' }}>
            {flag}
          </Typography>
        </BoxFlag>
        <Typography
          align="justify"
          variant="h5"
          sx={{ marginLeft: '20px', marginTop: '20px' }}
        >
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
  );
}
