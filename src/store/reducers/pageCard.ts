import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'store/rootReducer';
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

export declare interface PageCard {
  totalCount: number;
  page: string;
  limite: string;
  totalPage: number;
  nextPage: string;
  data: CardInterface[];
}

export declare interface PageClienteInterface {
  pageCard: PageCard;
  loadingCard: boolean;
}
const initialState = {
  pageCard: {
    totalCount: 1,
    page: '1',
    limite: '3',
    totalPage: 1,
    nextPage: '2',
    data: [],
  },
  loadingCard: false,
} as PageClienteInterface;

export const fetchApiSearch = createAsyncThunk(
  'credit-card?search=/fetchApiPage',
  async (search: string) => {
    const response = await apiUser.get(`credit-card?search=${search}`);
    return response.data;
  },
);
export const fetchApiPageCard = createAsyncThunk(
  'credit-card?page=&limit=8/fetchApiPage',
  async (page: string) => {
    const url =
      page === ''
        ? `credit-card?page=&limit=`
        : `credit-card?page=${page}&limit=8`;
    const response = await apiUser.get(url);
    return response.data;
  },
);
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
const PageCardSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(fetchApiSearch.pending, state => {
      state.loadingCard = true;
    });
    builder.addCase(fetchApiSearch.fulfilled, (state, action) => {
      state.loadingCard = false;
      state.pageCard = action.payload;
    });
    builder.addCase(fetchApiSearch.rejected, state => {
      state.loadingCard = false;
    });
    builder.addCase(fetchApiPageCard.pending, state => {
      state.loadingCard = true;
    });
    builder.addCase(fetchApiPageCard.fulfilled, (state, action) => {
      state.loadingCard = false;
      state.pageCard = action.payload;
    });
    builder.addCase(fetchApiPageCard.rejected, state => {
      state.loadingCard = false;
    });
  },
});

export const PageCardSelector = (state: RootState) => state.pagesCard;
export default PageCardSlice.reducer;
