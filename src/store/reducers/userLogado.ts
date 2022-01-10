import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/rootReducer';
import { apiUser } from '../../services/apiUser';

export declare interface UserLogadoInterface {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
}

export declare interface UserState {
  userLogado: UserLogadoInterface;
  loadingUserLogado: boolean;
}
const initialState = {
  userLogado: {
    id: '',
    name: '',
    email: '',
    avatarUrl: null,
  },
  loadingUserLogado: false,
} as UserState;

export const fetchApiAuthMe = createAsyncThunk(
  'auth/me/fetchApiAuthMe',
  async () => {
    const response = await apiUser.get('auth/me');
    return response.data;
  },
);

const userLogadoSlice = createSlice({
  name: 'userLogado',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchApiAuthMe.pending, state => {
      state.loadingUserLogado = true;
    });
    builder.addCase(fetchApiAuthMe.fulfilled, (state, action) => {
      state.loadingUserLogado = false;
      state.userLogado = action.payload;
    });
    builder.addCase(fetchApiAuthMe.rejected, state => {
      state.loadingUserLogado = false;
    });
  },
});

export const UserLogadoSelector = (state: RootState) => state.logado;
export default userLogadoSlice.reducer;
