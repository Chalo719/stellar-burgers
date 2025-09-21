import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { RootState } from '../store';

type TAuthState = {
  user: TUser | null;
  isAuthChecked: boolean;
  loginLoading: boolean;
  loginError: boolean;
  registerLoading: boolean;
  registerError: boolean;
  updateLoading: boolean;
  updateError: boolean;
  logoutLoading: boolean;
  logoutError: boolean;
};

const initialState: TAuthState = {
  user: null,
  isAuthChecked: false,
  loginLoading: false,
  loginError: false,
  registerLoading: false,
  registerError: false,
  updateLoading: false,
  updateError: false,
  logoutLoading: false,
  logoutError: false
};

export const getUser = createAsyncThunk('auth/checkAuth', async () =>
  getUserApi()
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: TLoginData) => loginUserApi(data)
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: TRegisterData) => registerUserApi(data)
);

export const updateUser = createAsyncThunk(
  'auth/update',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const logoutUser = createAsyncThunk('auth/logout', async () =>
  logoutApi()
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(getUser.rejected, (state) => {
        state.isAuthChecked = true;
        state.user = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
        state.loginError = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loginLoading = false;
        state.loginError = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.pending, (state) => {
        state.registerLoading = true;
        state.registerError = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.registerLoading = false;
        state.registerError = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerLoading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUser.pending, (state) => {
        state.updateLoading = true;
        state.updateError = false;
      })
      .addCase(updateUser.rejected, (state) => {
        state.updateLoading = false;
        state.updateError = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.user = action.payload.user;
      })
      .addCase(logoutUser.pending, (state) => {
        state.logoutLoading = true;
        state.logoutError = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.logoutLoading = false;
        state.logoutError = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.logoutLoading = false;
        state.user = null;
        state.isAuthChecked = true;
      });
  }
});

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthChecked = (state: RootState) =>
  state.auth.isAuthChecked;
export const selectLoginLoading = (state: RootState) => state.auth.loginLoading;
export const selectLoginError = (state: RootState) => state.auth.loginError;
export const selectRegisterLoading = (state: RootState) =>
  state.auth.registerLoading;
export const selectRegisterError = (state: RootState) =>
  state.auth.registerError;
export const selectUpdateLoading = (state: RootState) =>
  state.auth.updateLoading;
export const selectUpdateError = (state: RootState) => state.auth.updateError;
export const selectLogoutLoading = (state: RootState) =>
  state.auth.logoutLoading;
export const selectLogoutError = (state: RootState) => state.auth.logoutError;

export default authSlice.reducer;
