import { RootState } from 'store/rootReducer';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiUser } from '../../services/apiUser';

export declare interface CardInterface {
  id: string;
  name: string;
  flag: string;
  cardHolderName: string;
  limit: number;
  availableLimit: number;
  dueDate: string;
  invoiceClosing: number;
  number: string;
  code: string;
}

export declare interface ListCardInterface {
  cards: CardInterface[];
  isLoading: boolean;
}

const initialState = {
  cards: [],
  isLoading: false,
} as ListCardInterface;

export const fetchApi = createAsyncThunk('credit-card/fetchApi', async () => {
  const response = await apiUser.get('credit-card');
  return response.data;
});
export const fetchApiPost = createAsyncThunk(
  'credit-card/fetchApiPost',
  async (card: CardInterface) => {
    const response = await apiUser.post('credit-card', card);
    return response.data;
  },
);
export const fetchApiDelete = createAsyncThunk(
  'credit-card/id/fetchApiPost',
  async (id: string) => {
    const response = await apiUser.delete(`credit-card/${id}`);
    return response.data;
  },
);
const CardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchApi.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cards = action.payload;
    });
    builder.addCase(fetchApi.rejected, state => {
      state.isLoading = false;
    });
  },
});

export const CardSelector = (state: RootState) => state.cards;
export default CardSlice.reducer;
