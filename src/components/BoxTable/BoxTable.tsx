import React from 'react';
import { Grid as MuiGrid, styled } from '@mui/material';

type Props = {
  children: React.ReactNode;
};

const Grid = styled(MuiGrid)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-around',
  padding: '10px 20px',
  borderRadius: '5px',
  backgroundColor: theme.palette.background.paper,
  boxSizing: 'border-box',
  overflow: 'hidden',
  zIndex: 1,
  [theme.breakpoints.down('md')]: {
    display: 'block',
  },
}));

const GridTable = ({ children }: Props) => {
  return (
    <Grid container boxShadow={2}>
      {children}
    </Grid>
  );
};

export default GridTable;
