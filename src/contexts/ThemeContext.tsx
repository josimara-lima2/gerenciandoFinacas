import { CssBaseline, Button } from '@mui/material';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import { useMemo, createContext, Dispatch, useReducer, ReactNode } from 'react';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    modalBtn: true;
  }
}
type ThemeProviderProps = {
  children: ReactNode;
};

type ThemePaletteType = 'light' | 'dark';

type ACTIONTYPE = {
  type: 'CHANGE';
  payload: {
    paletteType: ThemePaletteType;
  };
};

type ThemeState = {
  paletteType: ThemePaletteType;
};

const initialState = {
  paletteType: 'light',
} as ThemeState;

const reducer = (state: typeof initialState, action: ACTIONTYPE) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        paletteType: action.payload.paletteType || state.paletteType,
      };
    default:
      throw new Error(`Unrecognized type ${action.type}`);
  }
};

export type ThemeContextInterface = Dispatch<ACTIONTYPE>;

export const ThemeContext = createContext({} as ThemeContextInterface);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { paletteType } = state;

  const theme = useMemo(() => {
    let nextTheme = createTheme({
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            '@global': {},
            // ...
          },
        },
        MuiButton: {
          styleOverrides: {},

          variants: [
            {
              props: { variant: 'modalBtn' },
              style: {
                width: '64px',
                padding: '8px 48px',
                height: '32px',
                backgroundColor: '#1c83ee',
                color: '#fafafa',
                '&.MuiButton-root:hover': {
                  backgroundColor: '#1c83eecc',
                },
              },
            },
            {
              props: { variant: 'modalBtn', color: 'error' },
              style: {
                backgroundColor: 'transparent',
                color: '#d32f2fcc',
                border: '1px solid #d32f2fcc',
                '&.MuiButton-root:hover': {
                  backgroundColor: 'transparent',
                },
              },
            },
          ],
        },
        MuiDialog: {
          // ...
        },
        MuiDialogContent: {
          // ...
        },
        MuiDialogActions: {
          // ...
        },
      },

      palette: {
        mode: paletteType,
        background: {
          paper: paletteType === 'dark' ? '#36393f' : '#E5E5E5',
          default: paletteType === 'dark' ? '#2f3136' : '#E5E5E5',
        },
        primary: {
          main: '#1c86ee',
          dark: '#000000',
          light: '#fafafa',
        },
        secondary: {
          main: '#1664B8',
        },
        // ...
      },
      typography: {
        // ...
        //  fontFamily: ['Poppins', 'sans-serif'].join(','),
      },
    });

    nextTheme = responsiveFontSizes(nextTheme);

    return nextTheme;
  }, [paletteType]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeContext.Provider value={dispatch}>{children}</ThemeContext.Provider>
    </MuiThemeProvider>
  );
}
