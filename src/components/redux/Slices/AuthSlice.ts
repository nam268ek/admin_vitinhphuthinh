/* eslint-disable curly */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { requestService } from '../../../api';
import { AuthState, IAuth } from '../../../types/types';
import { removeTokenLocalStorage } from '../../../utils/verifyToken';

export const getLoginService: any = createAsyncThunk(
  'REQUEST_LOGIN',
  async (params: IAuth, { rejectWithValue }) => {
    try {
      const response = await requestService.loginService(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getLogoutService: any = createAsyncThunk(
  'REQUEST_LOGOUT',
  async (_, { rejectWithValue }) => {
    try {
      const response = await requestService.logoutService();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

const initialState: AuthState = {
  isLogin: false,
  loading: false,
  user: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    asyncUser: (state, action) => {
      state.isLogin = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLogin = false;
      state.user = undefined;
      removeTokenLocalStorage();
    },
  },
  extraReducers: {
    [getLoginService.pending]: (state) => {
      state.loading = true;
    },
    [getLoginService.fulfilled]: (state, action) => {
      state.isLogin = true;
      state.loading = false;
      state.user = action.payload;
    },
    [getLoginService.rejected]: (state) => {
      state.isLogin = true;
      state.loading = false;
      state.user = undefined;
    },
    [getLogoutService.fulfilled]: (state) => {
      state.isLogin = true;
      state.loading = false;
      state.user = undefined;
    },
  },
});
export const { logout, asyncUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
