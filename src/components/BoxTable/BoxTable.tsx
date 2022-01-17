import React from 'react';
import { Box as MuiBox, styled } from '@mui/material';

type Props = {
  children: React.ReactNode;
  key?: string | number;
};

const Box = styled(MuiBox)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  padding: '10px',
  borderRadius: '5px',
  backgroundColor: theme.palette.background.paper,
  boxSizing: 'border-box',
  overflow: 'hidden',
  zIndex: 1,
  [theme.breakpoints.down('md')]: {
    display: 'block',
  },
}));

const BoxTable = ({ children, key }: Props) => {
  return (
    <Box key={key} boxShadow={2}>
      {children}
    </Box>
  );
};

export default BoxTable;
