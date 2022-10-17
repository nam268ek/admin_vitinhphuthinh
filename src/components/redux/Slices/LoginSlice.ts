import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import APIClientService from "../../../api";
import ValidateToken from "../../../api/authClient";
import { history } from "../../../utils/history";
// import { openDialogError } from "../../services/general.service";

export const requestLogin: any = createAsyncThunk("REQUEST_LOGIN", async (params: any) => {
  const data: any = await APIClientService.getLogin(params).catch((err: any) => {
    return err.response.data;
  });
  return data;
});

const initialState = {
  isLogin: false,
  data: {},
};
const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin: (state: any, action: any) => {
      state.isLogin = action.payload;
    },
    setLogout: (state: any) => {
      state.isLogin = false;
      ValidateToken.removeTokenLocalStorage();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestLogin.pending, (state: any, action: any) => {
        state.data = action.payload;
      })
      .addCase(requestLogin.fulfilled, (state: any, action: any) => {
        // openDialogError(action.payload);
        state.isLogin = true;
      });
  },
});
export const { setLogin, setLogout } = LoginSlice.actions;
const { reducer } = LoginSlice;
export default reducer;
