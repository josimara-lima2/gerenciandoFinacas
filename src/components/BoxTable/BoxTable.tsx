import React from 'react';
import { Box as MuiBox, Grid, styled } from '@mui/material';

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
    <Grid
      container
      key={key}
      boxShadow={2}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '10px 20px',
        borderRadius: '5px',
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      {children}
    </Grid>
  );
};

export default BoxTable;
