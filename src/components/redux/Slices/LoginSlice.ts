import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import APIClientService from '../../../api';

export const RequestLogin = createAsyncThunk('REQUEST_LOGIN', async (params) => {
  const data = await APIClientService.getLogin(params).catch((err: any) => {
    return err.response.data;
  });
  return data;
});

const initialState = {
    isLogin: false,
    data: {},
}
const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(RequestLogin.pending, (state: any, action: any) => {
        state.data = action.payload;
        })
        .addCase(RequestLogin.fulfilled, (state: any, action: any) => {
        state.data = action.payload;
        })
  },
});
const { reducer } = LoginSlice;
export default reducer;
