import { configureStore } from '@reduxjs/toolkit';
import coinsListSlice from '../features/coinsListSlice';
import singleCoinSlice from '../features/singleCoinSlice';

const store = configureStore({
  reducer: {
    coinsList: coinsListSlice.reducer,
    singleCoin: singleCoinSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
