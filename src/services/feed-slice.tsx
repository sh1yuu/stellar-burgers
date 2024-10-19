import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0
};

export const getFeeds = createAsyncThunk<TOrdersData>(
  'feed/getFeeds',
  async () => {
    const response = await getFeedsApi();
    return response;
  }
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectorFeedOrders: (state) => state.orders,
    selectorFeed: (state) => state,
    selectorFeedTotal: (state) => ({
      total: state.total,
      totalToday: state.totalToday
    })
  },
  extraReducers: (builder) => {
    builder.addCase(getFeeds.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
  }
});

export const { selectorFeedOrders, selectorFeed, selectorFeedTotal } =
  feedSlice.selectors;
