import { useContext, useCallback } from 'react';
import { ThemeContext } from 'contexts/ThemeContext';

export default function useChangeTheme() {
  const dispatch = useContext(ThemeContext);
  return useCallback(
    ({ payload }) => dispatch({ type: 'CHANGE', payload }),
    [dispatch],
  );
}
