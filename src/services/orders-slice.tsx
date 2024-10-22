import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrdersState = {
  orders: TOrder[];
  loading: boolean;
};

const initialState: TOrdersState = {
  orders: [],
  loading: false
};

export const getOrders = createAsyncThunk('orders/getOrders', async () =>
  getOrdersApi()
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    orderRequest: (state, action) => {
      state.loading = action.payload;
    }
  },
  selectors: {
    selectorOrders: (state) => state.orders,
    selectorOrdersRequest: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  }
});

export const { selectorOrders, selectorOrdersRequest } = ordersSlice.selectors;
export const { orderRequest } = ordersSlice.actions;
