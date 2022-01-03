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
  page: string;
  limite: string;
  totalPage: number;
  nextPage: string;
  data: IPurchase[];
}

export declare interface PagePurchaseInterface {
  pagePurchases: PagePurchases;
  loadingPurchases: boolean;
}
const initialState = {
  pagePurchases: {
    totalCount: 1,
    page: '1',
    limite: '3',
    totalPage: 1,
    nextPage: '0',
    data: [],
  },
  loadingPurchases: false,
} as PagePurchaseInterface;

export const fetchApiPurchases = createAsyncThunk(
  'purchases?page=&limit=8/fetchApiPurchases',
  async (page: number) => {
    const token = localStorage.getItem('token') as string;
    const tokenValid = token.replace(/^"(.*)"$/, '$1');
    const config = {
      headers: {
        Authorization: 'Bearer '.concat(tokenValid),
        'content-type': 'application/json',
      },
    };
    const url = `purchases?page=${page}&limit=8`;
    const response = await apiUser.get(url, config);
    return response.data;
  },
);
export const fetchApiPurchasesPost = createAsyncThunk(
  'purchases/fetchApiPurchasesPost',
  async (purchase: IPurchase) => {
    const token = localStorage.getItem('token') as string;
    const tokenValid = token.replace(/^"(.*)"$/, '$1');
    const config = {
      headers: {
        Authorization: 'Bearer '.concat(tokenValid),
        'content-type': 'application/json',
      },
    };

    const response = await apiUser.post('purchases', purchase, config);
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
  },
});

export const { addPurchase } = purchasesSlice.actions;
export const purchasesSelector = (state: RootState) => state.purchases;
export default purchasesSlice.reducer;
