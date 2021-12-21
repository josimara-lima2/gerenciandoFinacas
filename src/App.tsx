/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { fetchAllPosts, postsSelector } from 'store/reducers/posts';
import useChangeTheme from 'hooks/useChangeTheme';
import CustomRoutes from 'routes';
import { BrowserRouter } from 'react-router-dom';
import Layout from 'components/Layout';

const App = () => {
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector(postsSelector);

  const theme = useTheme();
  const changeTheme = useChangeTheme();

  const toggleTheme = () => {
    const nextPaletteType = theme.palette.mode === 'dark' ? 'light' : 'dark';
    changeTheme({ type: 'CHANGE', payload: { paletteType: nextPaletteType } });
  };

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  // eslint-disable-next-line no-console

  return (
    <BrowserRouter>
      <Layout>
        <CustomRoutes />
      </Layout>
    </BrowserRouter>
  );
};

export default App;
