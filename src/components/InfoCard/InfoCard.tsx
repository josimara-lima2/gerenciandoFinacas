import * as React from 'react';
import { Box, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import Modal from 'components/Modal/Modal';
import chipImg from '../../assets/images/chip.png';

type Props = {
  flag: string;
  number: string;
  cardHolderName: string;
  dueDate: string;
  code: string;
};
export default function InfoCard({
  flag,
  number,
  cardHolderName,
  dueDate,
  code,
}: Props) {
  return (
    <Box>
      <Modal title="Credit Card" buttonIcon={<InfoIcon />} tamanho="sm">
        <Box
          sx={{
            width: '400px',
            height: '230px',
            backgroundImage:
              'linear-gradient(to left bottom, #1c86ee, #2084e5, #2582db, #2a7fd2, #2f7dc8, #367ec4, #3d7ebf, #437fbb, #4c83bb, #5588bb, #5d8cbb, #6590bb)',
            border: '0.5px solid ',
            borderRadius: '43px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              margin: '10px 20px',
              justifyContent: 'space-between',
            }}
          >
            <img
              style={{ marginTop: '30px' }}
              width={50}
              src={chipImg}
              alt="chip"
            />
            <Typography sx={{ marginRight: '10px', marginTop: '10px' }}>
              {flag}
            </Typography>
          </Box>
          <Typography
            align="justify"
            variant="h5"
            sx={{ marginLeft: '20px', marginTop: '20px' }}
          >
            {number}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
              marginTop: '20px',
              marginLeft: '20px',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="caption">Titular</Typography>
              <Typography>{cardHolderName}</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '40px',
              }}
            >
              <Typography variant="caption">Vencimento</Typography>
              <Typography>{dueDate}</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '50px',
              }}
            >
              <Typography variant="caption">CVV</Typography>
              <Typography>{code}</Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
