import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'store/rootReducer';
import { apiUser } from '../../services/apiUser';
import { CardInterface } from './cards';

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
  isLoadingg: boolean;
}
const initialState = {
  pageCard: {
    totalCount: 1,
    page: '1',
    limite: '3',
    totalPage: 1,
    nextPage: '0',
    data: [],
  },
  isLoadingg: false,
} as PageClienteInterface;

export const fetchApiSearch = createAsyncThunk(
  'credit-card?search=/fetchApiPage',
  async (search: string) => {
    const token = localStorage.getItem('token') as string;
    const tokenValid = token.replace(/^"(.*)"$/, '$1');
    const config = {
      headers: {
        Authorization: 'Bearer '.concat(tokenValid),
        'content-type': 'application/json',
      },
    };
    const response = await apiUser.get(`credit-card?search=${search}`, config);
    return response.data;
  },
);
export const fetchApiPageCard = createAsyncThunk(
  'credit-card?page=&limit=8/fetchApiPage',
  async (page: string) => {
    const token = localStorage.getItem('token') as string;
    const tokenValid = token.replace(/^"(.*)"$/, '$1');
    const config = {
      headers: {
        Authorization: 'Bearer '.concat(tokenValid),
        'content-type': 'application/json',
      },
    };
    const response = await apiUser.get(
      `credit-card?page=${page}&limit=8`,
      config,
    );
    return response.data;
  },
);

const PageCardSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(fetchApiSearch.pending, state => {
      state.isLoadingg = true;
    });
    builder.addCase(fetchApiSearch.fulfilled, (state, action) => {
      state.isLoadingg = false;
      state.pageCard = action.payload;
    });
    builder.addCase(fetchApiSearch.rejected, state => {
      state.isLoadingg = false;
    });
    builder.addCase(fetchApiPageCard.pending, state => {
      state.isLoadingg = true;
    });
    builder.addCase(fetchApiPageCard.fulfilled, (state, action) => {
      state.isLoadingg = false;
      state.pageCard = action.payload;
    });
    builder.addCase(fetchApiPageCard.rejected, state => {
      state.isLoadingg = false;
    });
  },
});

export const PageCardSelector = (state: RootState) => state.pagesCard;
export default PageCardSlice.reducer;
