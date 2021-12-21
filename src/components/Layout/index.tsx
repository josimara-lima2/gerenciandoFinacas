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
        display: 'flex',
        flexDirection: 'column',
        background: '#fafafa',
        height: '100vh',
      }}
    >
      <Header />
      <Box sx={{ display: 'flex', height: '100%' }}>
        <Sidebar />
        <Box width="100%" bgcolor="green">
          <Main>{children}</Main>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}
