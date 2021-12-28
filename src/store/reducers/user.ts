import {
  createAsyncThunk,
  createSlice,
  Action,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from 'store/rootReducer';
import { apiUser } from '../../services/apiUser';

export declare interface UserInterface {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}
export declare interface LoginInterface {
  email: string;
  password: string;
}

export declare interface LoginState {
  isLoggedIn: boolean;
}

export declare interface UserState {
  user: UserInterface;
  isLoggedIn: boolean;
}
const initialState = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

export const fetchApi = createAsyncThunk(
  'auth/signup/fetchApi',
  async (user: UserInterface) => {
    const response = await apiUser.post('auth/signup', user);
    return response.data;
  },
);

export const fetchApiLogin = createAsyncThunk(
  'auth/signin/fetchApiLogin',
  async (login: LoginInterface) => {
    const response = await apiUser.post('auth/signin', login);
    return response.data;
  },
);

export const fetchApiList = createAsyncThunk(
  'clients/fetchApiList',
  async (token: string) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await apiUser.get('clients', config);
    console.log(token);
    return response.data;
  },
);

export const fetchApiDelete = createAsyncThunk(
  'auth/signup/fetchApi',
  async (user: UserInterface) => {
    const response = await apiUser.delete('auth/signup');
    return response.data as string;
  },
);
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => localStorage.removeItem('token'),
  },

  extraReducers(builder) {
    builder.addCase(fetchApiLogin.fulfilled, (state, action) => {
      const t = action.payload;
      const { token } = t;
      localStorage.setItem('token', JSON.stringify(token.replace('"')));
    });
  },
});
export const { logout } = userSlice.actions;
export const UserSelector = (state: RootState) => state.user;
export default userSlice.reducer;
