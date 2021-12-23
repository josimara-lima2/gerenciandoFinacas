import { Box as MuiBox, styled } from '@mui/material';
import { ReactNode } from 'react';

type MainProps = {
  children?: ReactNode;
};

const Box = styled(MuiBox)(({ theme }) => ({
  flexGrow: 1,
  width: '100%',
  padding: theme.spacing(2),
  height: `100vh`,
  backgroundColor: theme.palette.background.paper,
}));

export default function Main({ children }: MainProps) {
  return <Box component="main">{children}</Box>;
}
