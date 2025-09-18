import { orderBurgerApi } from '@api';
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderState = {
  order: TOrder | null;
  name: string | null;
  loading: boolean;
  error: boolean;
};

const initialState: TOrderState = {
  order: null,
  name: null,
  loading: false,
  error: false
};

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
        state.name = action.payload.name;
      });
  }
});

export const { clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
