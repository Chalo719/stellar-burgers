import { getOrdersApi } from '@api';
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from '../store';

type TProfileOrdersState = {
  items: TOrder[];
  loading: boolean;
  error: boolean;
};

const initialState: TProfileOrdersState = {
  items: [],
  loading: false,
  error: false
};

export const getProfileOrders = createAsyncThunk(
  'profileOrders/getAll',
  async () => getOrdersApi()
);

const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfileOrders.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getProfileOrders.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getProfileOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      });
  }
});

export const selectOrders = (state: RootState) => state.profileOrders.items;
export const selectOrdersLoading = (state: RootState) =>
  state.profileOrders.loading;
export const selectOrdersError = (state: RootState) =>
  state.profileOrders.error;

export default profileOrdersSlice.reducer;
