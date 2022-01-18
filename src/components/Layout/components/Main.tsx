import { Box as MuiBox, styled } from '@mui/material';
import React, { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { UserLogadoSelector, fetchApiAuthMe } from 'store/reducers/userLogado';

type MainProps = {
  children?: ReactNode;
};

const Box = styled(MuiBox)(({ theme }) => ({
  flexGrow: 1,
  width: '100%',
  padding: theme.spacing(2),
  height: `calc(100vh - 50px)`,
  overflow: 'auto',
  backgroundColor: theme.palette.background.paper,
}));

export default function Main({ children }: MainProps) {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchApiAuthMe());
  }, [dispatch]);
  return <Box component="main">{children}</Box>;
}
