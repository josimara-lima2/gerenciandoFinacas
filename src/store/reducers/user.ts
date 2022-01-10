import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/rootReducer';
import { apiUser } from '../../services/apiUser';

export declare interface UserInterface {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
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
} as UserInterface;

export const fetchApiCadastroUser = createAsyncThunk(
  'auth/signup/fetchApi',
  async (user: UserInterface) => {
    const response = await apiUser.post('auth/signup', user);
    return response.data;
  },
);

export const fetchApiDelete = createAsyncThunk(
  'auth/signup/fetchApi',
  async () => {
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
});

export const { logout } = userSlice.actions;
export const UserSelector = (state: RootState) => state.user;
export default userSlice.reducer;
