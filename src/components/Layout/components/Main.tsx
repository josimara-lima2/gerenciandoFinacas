import { Box as MuiBox, styled } from '@mui/material';
import { ReactNode } from 'react';

type MainProps = {
  children?: ReactNode;
};

const Box = styled(MuiBox)(({ theme }) => ({
  flexGrow: 1,
  width: '100%',
  padding: theme.spacing(2),
  height: `calc(100vh - 50px)`,
  backgroundColor: theme.palette.background.paper,
}));

export default function Main({ children }: MainProps) {
  return <Box component="main">{children}</Box>;
}
