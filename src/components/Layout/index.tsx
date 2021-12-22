import { Box } from '@mui/material';
import { ReactNode } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import Sidebar from './components/Sidebar';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <Box
      sx={{
        background: '#fafafa',
        height: '100%',
        display: 'flex',
      }}
    >
      <Header />

      <Box
        height="100%"
        bgcolor="green"
        width="100%"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'space-between',
          marginTop: '50px',
        }}
      >
        <Main>{children}</Main>
      </Box>
    </Box>
  );
}
