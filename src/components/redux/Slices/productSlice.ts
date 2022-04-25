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

export const getAllProducts: any = createAsyncThunk(
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
  statusUpdated: false,
  data: {},
  listImages: [],
  listAllProducts: [],
  statusResponse: {},
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateListImages: (state: any, action: any) => {
      state.listImages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state: any, action: any) => {
        state.data = action.payload;
      })
      .addCase(createProduct.fulfilled, (state: any, action: any) => {
        if(action.payload.message === 'success') {
          state.data = action.payload;
        }
      })
      .addCase(getAllProducts.pending, (state: any, action: any) => {
        state.listAllProducts = [];
        state.statusResponse = {};
      })
      .addCase(getAllProducts.fulfilled, (state: any, action: any) => {
        state.statusResponse = {
          status: action.payload.status,
          message: action.payload.message,
          code: action.payload.code,
        };
        state.listAllProducts = action.payload.data;
      });
  },
});
const { reducer } = productSlice;
export const { updateListImages } = productSlice.actions;
export default reducer;
