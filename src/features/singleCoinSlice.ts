import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import coinDetailsService from '../services/coinDetailsService';

export interface IResultItem {
  uuid: string;
  name: string;
  rank: number | null;
  symbol: string;
  iconUrl: string;
  price: string;
  marketCap: string;
  change: string;
  description: string;
}

export interface SingleCoinState {
  data: Readonly<IResultItem>;
  error: null | string;
  isLoading: boolean;
  isFetched: boolean;
}

export const initialState: SingleCoinState = {
  data: {
    uuid: '',
    name: '',
    rank: null,
    symbol: '',
    iconUrl: '',
    price: '',
    marketCap: '',
    change: '',
    description: '',
  },
  error: null,
  isLoading: false,
  isFetched: false,
};

export const fetchSingleCoin = createAsyncThunk(
  'data/fetchSingleCoin',
  async (coinId: string) => {
    try {
      const response = coinDetailsService.getSingleCoin(coinId);
      return response;
    } catch (error: any) {
      return console.error(error.message);
    }
  }
);

const singleCoinSlice = createSlice({
  name: 'singleCoin',
  initialState,
  reducers: {
    fetchDataRequest: (state: SingleCoinState) => {
      state.isLoading = true;
      state.isFetched = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSingleCoin.pending, (state) => {
      state.data = {
        uuid: '',
        name: '',
        rank: null,
        symbol: '',
        iconUrl: '',
        price: '',
        marketCap: '',
        change: '',
        description: '',
      };
      state.isFetched = true;
      state.isLoading = true;
    });
    builder.addCase(
      fetchSingleCoin.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(
      fetchSingleCoin.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
  },
});

export const singleCoinActions = singleCoinSlice.actions;
export default singleCoinSlice;
