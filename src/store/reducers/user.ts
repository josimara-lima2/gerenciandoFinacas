import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/rootReducer';
import { apiUser } from '../../services/apiUser';

export declare interface UserInterface {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
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
export const fetchApiList = createAsyncThunk(
  'clients/fetchApiList',
  async () => {
    const response = await apiUser.get('clients');
    console.log(response.data);
    return response.data;
  },
);
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {},
});

export const UserSelector = (state: RootState) => state.user;
export default userSlice.reducer;
