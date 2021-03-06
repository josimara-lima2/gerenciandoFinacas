import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/rootReducer';
import { apiUser } from '../../services/apiUser';

export declare interface ClientInterface {
  id: string;
  name: string;
  email: string;
  telephone: string;
  cpf: string;
}

export declare interface PageCliente {
  totalCount: number;
  page: number;
  limite: number;
  totalPage: number;
  nextPage: number;
  data: ClientInterface[];
}

export declare interface PageClienteInterface {
  pageCliente: PageCliente;
  isLoadingg: boolean;
}
const initialState = {
  pageCliente: {
    totalCount: 0,
    page: 1,
    limite: 3,
    totalPage: 1,
    nextPage: 2,
    data: [],
  },
  isLoadingg: false,
} as PageClienteInterface;

export const fetchApiPage = createAsyncThunk(
  'clients?page=&limit=10/fetchApiPage',
  async (page: number | null) => {
    const url = page === null ? 'clients' : `clients?page=${page}&limit=10`;
    const response = await apiUser.get(url);
    return response.data;
  },
);

export const fetchApiSearch = createAsyncThunk(
  'clients?search=/fetchApiPage',
  async (search: string) => {
    const response = await apiUser.get(`clients?search=${search}`);
    return response.data;
  },
);

export const fetchApiPost = createAsyncThunk(
  'clients/fetchApiPost',
  async (client: Partial<ClientInterface>) => {
    const response = await apiUser.post('clients', client);
    return response.data;
  },
);
export const fetchApiDelete = createAsyncThunk(
  'clients/id/fetchApiDelete',
  async (id: string) => {
    const response = await apiUser.delete(`clients/${id}`);
    return response.data;
  },
);

export const fetchApiPut = createAsyncThunk(
  'clients/id/fetchApiPut',
  async (client: ClientInterface) => {
    const response = await apiUser.put(`clients/${client.id}`, client);
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
    deleteClient(state, action: PayloadAction<{ id: string }>) {
      state.pageCliente.data = state.pageCliente.data.filter(
        item => item.id !== action.payload.id,
      );
      return state;
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
