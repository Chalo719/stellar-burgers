import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from '../store';

type TOrderState = {
  order: TOrder | null;
  loading: boolean;
  error: boolean;
};

const initialState: TOrderState = {
  order: null,
  loading: false,
  error: false
};

export const getOrderByNumber = createAsyncThunk(
  'orders/getByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

export const createOrder = createAsyncThunk(
  'orders/create',
  async (ingredients: string[]) => orderBurgerApi(ingredients)
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getOrderByNumber.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.orders[0];
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createOrder.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      });
  }
});

export const { clearOrder } = orderSlice.actions;

export const selectOrderByNumber = (state: RootState) => state.order.order;
export const selectOrderByNumberLoading = (state: RootState) =>
  state.order.loading;
export const selectOrderByNumberError = (state: RootState) => state.order.error;

export default orderSlice.reducer;
