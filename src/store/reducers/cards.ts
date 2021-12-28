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

export const fetchApi = createAsyncThunk('credit-card/fetchApi', async () => {
  const response = await apiUser.get('credit-card');
  console.log(response.data);
  return response.data;
});
export const fetchApiPost = createAsyncThunk(
  'credit-card/fetchApiPost',
  async (card: CardInterface) => {
    const response = await apiUser.post('credit-card', card);
    console.log(response.data);
    return response.data;
  },
);
export const fetchApiDelete = createAsyncThunk(
  'credit-card/id/fetchApiPost',
  async (id: string) => {
    const response = await apiUser.delete(`credit-card/${id}`);
    console.log(response.data);
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
          id: 'teste',
          name,
          flag,
          cardHolderName,
          limit,
          availableLimit,
          invoiceClosing,
          number,
          code,
          dueDate,
        },
      ];
    },
    deleteCard(state, action: PayloadAction<{ code: string }>) {
      state.cards = state.cards.filter(
        card => card.code !== action.payload.code,
      );
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
      state.isLoading = false;
    });
  },
});

export const { addCard, deleteCard } = CardSlice.actions;
export const CardSelector = (state: RootState) => state.cards;
export default CardSlice.reducer;
