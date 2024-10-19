import { getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderState = {
  data: TOrder | null;
  loading: boolean;
};

const initialState: TOrderState = {
  data: null,
  loading: false
};

export const getOrder = createAsyncThunk<TOrder, number>(
  'order/getOrder',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.data = null;
    }
  },
  selectors: {
    selectorOrder: (state) => state.data,
    selectorRequest: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrder.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      });
  }
});

export const { selectorOrder, selectorRequest } = orderSlice.selectors;
export const { clearOrder } = orderSlice.actions;
