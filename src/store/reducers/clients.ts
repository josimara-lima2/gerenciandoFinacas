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

export declare interface ListClientInterface {
  clients: ClientInterface[];
  isLoading: boolean;
}

const initialState = {
  clients: [],
  isLoading: false,
} as ListClientInterface;

export const fetchApi = createAsyncThunk('clients/fetchApi', async () => {
  const response = await apiUser.get('/clients');
  return response.data;
});

export const fetchApiDelete = createAsyncThunk(
  'clients/id/fetchApiDelete',
  async (id: string) => {
    const response = await apiUser.delete(`clients/${id}`);
    return response.data;
  },
);

export const fetchApiPost = createAsyncThunk(
  'clients/fetchApiPost',
  async (client: Partial<ClientInterface>) => {
    const response = await apiUser.post('/clients', client);
    return response.data;
  },
);

const ClientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    deleteClient(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      state.clients = state.clients.filter(item => item.id !== id);
    },
    addClient(state, action: PayloadAction<Partial<ClientInterface>>) {
      const client = action.payload as ClientInterface;

      state.clients = [...state.clients, client];
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchApi.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.clients = action.payload;
    });
    builder.addCase(fetchApi.rejected, state => {
      state.isLoading = false;
    });

    builder.addCase(fetchApiPost.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchApiPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.clients = action.payload;
    });

    builder.addCase(fetchApiPost.rejected, state => {
      state.isLoading = false;
    });
  },
});

export const { deleteClient, addClient } = ClientSlice.actions;
export const ClientSelector = (state: RootState) => state.clients;
export default ClientSlice.reducer;
