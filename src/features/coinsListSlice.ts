import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import homepageService from '../services/homepageService';

export interface IResultItem {
  uuid: string;
  name: string;
  rank: number;
  symbol: string;
  iconUrl: string;
  price: string;
  marketCap: string;
  change: string;
}

export interface CoinsListState {
  data: Readonly<IResultItem>[];
  selectedCoinId: string;
  error: null | string;
  isLoading: boolean;
  isFetched: boolean;
}

export const initialState: CoinsListState = {
  data: [],
  selectedCoinId: '',
  error: null,
  isLoading: false,
  isFetched: false,
};

export const fetchAllCoins = createAsyncThunk(
  'data/fetchAllCoins',
  async () => {
    try {
      const response = homepageService.getAllCoins();
      return response;
    } catch (error: any) {
      return console.error(error.message);
    }
  }
);

const coinsListSlice = createSlice({
  name: 'coinsList',
  initialState,
  reducers: {
    fetchDataRequest: (state: CoinsListState) => {
      state.isLoading = true;
      state.isFetched = true;
    },
    setSelectedCoin: (state: CoinsListState, action: PayloadAction<string>) => {
      state.selectedCoinId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCoins.pending, (state) => {
      state.data = [];
      state.isFetched = true;
      state.isLoading = true;
    });
    builder.addCase(
      fetchAllCoins.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(
      fetchAllCoins.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
  },
});

export const coinsListActions = coinsListSlice.actions;
export default coinsListSlice;
