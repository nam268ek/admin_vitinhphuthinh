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

export const getAllProducts = createAsyncThunk(
  "GET_ALL_PRODUCT",
  async (params: any) => {
    const data: any = await APIClientService.getAllProducts(params).catch(
      (err: any) => {
        return err.response.data;
      }
    );
    return data;
  }
);

const initialState = {
  data: {},
  listImages: [],
  listAllProducts: [],
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateListImages: (state: any, action: any) => {
      state.listImages = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state: any, action: any) => {
        state.data = action.payload;
      })
      .addCase(createProduct.fulfilled, (state: any, action: any) => {
        state.data = action.payload;
      })
      .addCase(getAllProducts.fulfilled, (state: any, action: any) => {
        state.listProducts = action.payload;
      });
  },
});
const { reducer } = productSlice;
export const { updateListImages } = productSlice.actions;
export default reducer;
