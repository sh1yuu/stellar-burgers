import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderState = {
  data: TOrder | null;
  loading: boolean;
};

export const initialState: TOrderState = {
  data: null,
  loading: false
};

export const getOrderByNumber = createAsyncThunk<TOrder, number>(
  'order/getOrder',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  }
);

export const orderBurger = createAsyncThunk(
  'order/orderBurger',
  async (id: string[]) => {
    const response = await orderBurgerApi(id);
    return response;
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
      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderByNumber.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(orderBurger.pending, (state) => {
        state.loading = true;
      })
      .addCase(orderBurger.rejected, (state) => {
        state.loading = false;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.data = action.payload.order;
        state.loading = false;
      });
  }
});

export const { selectorOrder, selectorRequest } = orderSlice.selectors;
export const { clearOrder } = orderSlice.actions;
