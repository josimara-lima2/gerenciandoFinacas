import { AppBar, Box, IconButton, Toolbar, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { fetchAllPosts, postsSelector } from 'store/reducers/posts';
import LightModeIcon from '@mui/icons-material/LightMode';
import useChangeTheme from 'hooks/useChangeTheme';

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
  console.log('[POSTS]:', posts);

  return (
    <Box>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Box flexGrow={1}>Projeto Base ReactJS</Box>
          <IconButton onClick={toggleTheme}>
            <LightModeIcon color="warning" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default App;
