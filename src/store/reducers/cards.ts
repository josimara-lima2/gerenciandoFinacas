import { RootState } from 'store/rootReducer';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

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

export const fetchApi = createAsyncThunk('/credit-card/fetchApi', async () => {
  const response = await apiUser.get('/credit-card');
  return response.data;
});
export const fetchApiPost = createAsyncThunk(
  '/credit-card/fetchApi',
  async (card: Partial<CardInterface>) => {
    const response = await apiUser.post('/credit-card', card);
    return response.data;
  },
);
const CardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard(state, action: PayloadAction<Partial<CardInterface>>) {
      const name = action.payload.name as string;
      const flag = action.payload.flag as string;
      const cardHolderName = action.payload.cardHolderName as string;
      const limit = action.payload.limit as number;
      const availableLimit = action.payload.availableLimit as number;
      const invoiceClosing = action.payload.invoiceClosing as number;
      const number = action.payload.number as string;
      const code = action.payload.code as string;
      const dueDate = action.payload.dueDate as string;

      state.cards = [
        ...state.cards,
        {
          name,
          flag,
          cardHolderName,
          limit,
          availableLimit,
          invoiceClosing,
          number,
          code,
          dueDate,
          id: 'teste',
        },
      ];
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchApi.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cards = action.payload;
    });
    builder.addCase(fetchApi.rejected, state => {
      state.isLoading = true;
    });
  },
});

export const { addCard } = CardSlice.actions;
export const cardSelector = (state: RootState) => state.cards;
export default CardSlice.reducer;
