import * as React from 'react';
import Box from '@mui/material/Box';
import InfoIcon from '@mui/icons-material/Info';
import Modal from 'components/Modal/Modal';

type Props = {
  children?: React.ReactNode;
};
export default function InfoCard({ children }: Props) {
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
          {children}
        </Box>
      </Modal>
    </Box>
  );
}
