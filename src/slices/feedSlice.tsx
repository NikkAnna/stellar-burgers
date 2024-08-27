import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { TOrdersData } from '@utils-types';
import { getFeedsApi } from '../utils/burger-api';

export type TOrderFeedState = {
  orders: TOrdersData;
  loading: boolean;
  error: string | undefined;
};

const initialState: TOrderFeedState = {
  orders: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  loading: false,
  error: ''
};

export const getFeedThunk = createAsyncThunk(
  'orders/getAll',
  async () => await getFeedsApi()
);

const ordersFeedSlice = createSlice({
  name: 'ordersFeed',
  initialState,
  reducers: {},
  selectors: {
    getOrdersFeed: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedThunk.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getFeedThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getFeedThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.orders = action.payload.orders;
        state.orders.total = action.payload.total;
        state.orders.totalToday = action.payload.totalToday;
      });
  }
});

export const ordersFeedReducer = ordersFeedSlice.reducer;
export const { getOrdersFeed } = ordersFeedSlice.selectors;
