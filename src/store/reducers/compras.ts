import { RootState } from 'store/rootReducer';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiUser } from '../../services/apiUser';

declare interface IPurchase {
  description: string;
  value: number;
  parceleOut: boolean;
  numberOfInstallments: number;
  formOfPayment: string;
  status: string;
  paidInstallments: number;
  creditCardId: string;
  clientId: string;
}
export declare interface PagePurchases {
  totalCount: number;
  page: number;
  limite: number;
  totalPage: number;
  nextPage: number;
  data: IPurchase[];
}

export declare interface PagePurchaseInterface {
  pagePurchases: PagePurchases;
  loadingPurchases: boolean;
}
const initialState = {
  pagePurchases: {
    totalCount: 1,
    page: 1,
    limite: 1,
    totalPage: 2,
    nextPage: 2,
    data: [],
  },
  loadingPurchases: false,
} as PagePurchaseInterface;

export const fetchApiPurchases = createAsyncThunk(
  'purchases?page=&limit=10/fetchApiPurchases',
  async (page: number) => {
    const token = localStorage.getItem('token') as string;
    const config = {
      headers: {
        Authorization: `Bearer ${token ? token.replace(/^"(.*)"$/, '$1') : ''}`,
        'content-type': 'application/json',
      },
    };
    const url = `purchases?page=${page}&limit=10`;
    const response = await apiUser.get(url, config);
    return response.data;
  },
);

export const fetchApiPurchasesPost = createAsyncThunk(
  'purchases/fetchApiPurchasesPost',
  async (purchase: IPurchase) => {
    const token = localStorage.getItem('token') as string;
    const config = {
      headers: {
        Authorization: `Bearer ${token ? token.replace(/^"(.*)"$/, '$1') : ''}`,
        'content-type': 'application/json',
      },
    };
    const response = await apiUser.post('purchases', purchase, config);
    return response.data;
  },
);
export const fetchApiSearch = createAsyncThunk(
  'purchases?search=/fetchApiSearch',
  async (search: string) => {
    const token = localStorage.getItem('token') as string;
    const config = {
      headers: {
        Authorization: `Bearer ${token ? token.replace(/^"(.*)"$/, '$1') : ''}`,
        'content-type': 'application/json',
      },
    };
    const response = await apiUser.get(`purchases?search=${search}`, config);
    return response.data;
  },
);

const purchasesSlice = createSlice({
  name: 'purchases',
  initialState,
  reducers: {
    addPurchase(state, action: PayloadAction<IPurchase>) {
      state.pagePurchases.data = [...state.pagePurchases.data, action.payload];
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchApiPurchases.pending, state => {
      state.loadingPurchases = true;
    });
    builder.addCase(fetchApiPurchases.fulfilled, (state, action) => {
      state.loadingPurchases = false;
      state.pagePurchases = action.payload;
    });
    builder.addCase(fetchApiPurchases.rejected, state => {
      state.loadingPurchases = false;
    });
    builder.addCase(fetchApiSearch.pending, state => {
      state.loadingPurchases = true;
    });
    builder.addCase(fetchApiSearch.fulfilled, (state, action) => {
      state.loadingPurchases = false;
      state.pagePurchases = action.payload;
    });
    builder.addCase(fetchApiSearch.rejected, state => {
      state.loadingPurchases = false;
    });
  },
});

export const { addPurchase } = purchasesSlice.actions;
export const purchasesSelector = (state: RootState) => state.purchases;
export default purchasesSlice.reducer;
