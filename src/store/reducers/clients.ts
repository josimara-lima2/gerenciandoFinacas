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
  const token = localStorage.getItem('token') as string;
  const tokenValid = token.replace(/^"(.*)"$/, '$1');
  const config = {
    headers: {
      Authorization: 'Bearer '.concat(tokenValid),
      'content-type': 'application/json',
    },
  };
  const response = await apiUser.get('clients', config);
  return response.data;
});

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

export const fetchApiPost = createAsyncThunk(
  'clients/fetchApiPost',
  async (client: Partial<ClientInterface>) => {
    const response = await apiUser.post('clients', client);
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
      const name = action.payload.name as string;
      const email = action.payload.email as string;
      const telephone = action.payload.telephone as string;
      const cpf = action.payload.cpf as string;
      state.clients = [
        ...state.clients,
        { name, email, telephone, cpf, id: 'teste' },
      ];
    },
    editClient(
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        email: string;
        telephone: string;
        cpf: string;
      }>,
    ) {
      const { id } = action.payload;
      state.clients.map(item => {
        if (item.id === id) {
          item.name = action.payload.name;
          item.telephone = action.payload.telephone;
          item.cpf = action.payload.cpf;
          item.email = action.payload.email;
        }

        return state.clients;
      });
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
  },
});

export const { deleteClient, addClient, editClient } = ClientSlice.actions;
export const ClientSelector = (state: RootState) => state.clients;
export default ClientSlice.reducer;
