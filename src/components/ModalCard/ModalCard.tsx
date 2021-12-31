import * as React from 'react';
import Box from '@mui/material/Box';
import InfoIcon from '@mui/icons-material/Info';
import Modal from 'components/Modal/Modal';

type Props = {
  children?: React.ReactNode;
};
export default function InfoCard({ children }: Props) {
  return (
    <Modal title="Credit Card" buttonIcon={<InfoIcon />}>
      {children}
    </Modal>
  );
}
