import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import APIClientService from "../../../api";

export const createProduct: any = createAsyncThunk(
  "CREATE_PRODUCT",
  async (params: any) => {
    const data: any = await APIClientService.createNewProduct(params).catch(
      (err: any) => {
        return err.response.data;
      }
    );
    return data;
  }
);

const initialState = {
  isLogin: false,
  data: {},
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state: any, action: any) => {
        state.data = action.payload;
      })
      .addCase(createProduct.fulfilled, (state: any, action: any) => {
        state.data = action.payload;
      });
  },
});
const { reducer } = productSlice;
export default reducer;
