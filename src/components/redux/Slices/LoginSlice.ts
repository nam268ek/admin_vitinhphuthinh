import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import APIClientService from "../../../api";
import ValidateToken from "../../../api/authClient";
import { history } from "../../../utils/history";
import { openDialogError } from "../../Services/general.service";

export const RequestLogin: any = createAsyncThunk("REQUEST_LOGIN", async (params: any) => {
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
      .addCase(RequestLogin.pending, (state: any, action: any) => {
        state.data = action.payload;
      })
      .addCase(RequestLogin.fulfilled, (state: any, action: any) => {
        openDialogError(action.payload);
        const { token, refreshtoken } = action.payload.data;
        if (token && refreshtoken) {
          state.isLogin = true;
          localStorage.setItem("tokenvtpt", JSON.stringify(token));
          localStorage.setItem("refreshtokenvtpt", JSON.stringify(refreshtoken));
        } else state.isLogin = false;
        state.data = action.payload;
      });
  },
});
export const { setLogin, setLogout } = LoginSlice.actions;
const { reducer } = LoginSlice;
export default reducer;
