import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/rootReducer';
import { apiUser } from '../../services/apiUser';
import { ClientInterface } from './clients';

export declare interface PageCliente {
  totalCount: number;
  page: string;
  limite: string;
  totalPage: number;
  nextPage: string;
  data: ClientInterface[];
}

export declare interface PageClienteInterface {
  pageCliente: PageCliente;
  isLoadingg: boolean;
}
const initialState = {
  pageCliente: {
    totalCount: 1,
    page: '1',
    limite: '3',
    totalPage: 1,
    nextPage: '0',
    data: [],
  },
  isLoadingg: false,
} as PageClienteInterface;

export const fetchApiPage = createAsyncThunk(
  'clients?page=&limit=15/fetchApiPage',
  async (page: string) => {
    const token = localStorage.getItem('token') as string;
    const tokenValid = token.replace(/^"(.*)"$/, '$1');
    const config = {
      headers: {
        Authorization: 'Bearer '.concat(tokenValid),
        'content-type': 'application/json',
      },
    };
    const url =
      page === '' ? `clients?page=&limit=` : `clients?page=${page}&limit=10`;
    const response = await apiUser.get(url, config);

    return response.data;
  },
);

export const fetchApiSearch = createAsyncThunk(
  'clients?search=/fetchApiPage',
  async (search: string) => {
    const token = localStorage.getItem('token') as string;
    const tokenValid = token.replace(/^"(.*)"$/, '$1');
    const config = {
      headers: {
        Authorization: 'Bearer '.concat(tokenValid),
        'content-type': 'application/json',
      },
    };
    const response = await apiUser.get(`clients?search=${search}`, config);
    return response.data;
  },
);

const PageSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    addClient(state, action: PayloadAction<ClientInterface>) {
      state.pageCliente.data = [...state.pageCliente.data, action.payload];
    },
  },

  extraReducers(builder) {
    builder.addCase(fetchApiPage.pending, state => {
      state.isLoadingg = true;
    });
    builder.addCase(fetchApiPage.fulfilled, (state, action) => {
      state.isLoadingg = false;
      state.pageCliente = action.payload;
    });
    builder.addCase(fetchApiPage.rejected, state => {
      state.isLoadingg = false;
    });
    builder.addCase(fetchApiSearch.pending, state => {
      state.isLoadingg = true;
    });
    builder.addCase(fetchApiSearch.fulfilled, (state, action) => {
      state.isLoadingg = false;
      state.pageCliente = action.payload;
    });
    builder.addCase(fetchApiSearch.rejected, state => {
      state.isLoadingg = false;
    });
  },
});
export const { addClient } = PageSlice.actions;
export const PageSelector = (state: RootState) => state.pages;
export default PageSlice.reducer;
