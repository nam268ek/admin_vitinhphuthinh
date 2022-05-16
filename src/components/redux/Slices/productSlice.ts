import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import APIClientService from "../../../api";

export const createProduct: any = createAsyncThunk("CREATE_PRODUCT", async (params: any) => {
  const data: any = await APIClientService.createNewProduct(params).catch((err: any) => {
    return err.response.data;
  });
  return data;
});

export const getAllProducts: any = createAsyncThunk("GET_ALL_PRODUCT", async (params: any) => {
  const data: any = await APIClientService.getAllProducts(params).catch((err: any) => {
    return err.response.data;
  });
  return data;
});

export const removeItemProduct: any = createAsyncThunk("REMOVE_ITEM_PRODUCT", async (params: any) => {
  const data: any = await APIClientService.removeProduct(params).catch((err: any) => {
    return err.response.data;
  });
  return data;
});

const initialState = {
  statusUpdated: false,
  data: {},
  listImages: [],
  listAllProducts: [],
  statusResponse: [],
  dataFilter: [],
  dataUpdate: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateListImages: (state: any, action: any) => {
      state.listImages = action.payload;
    },
    filterListProducts: (state: any, action: any) => {
      state.dataFilter = action.payload;
    },
    setDefaultDataFilter: (state: any, action: any) => {
      state.dataFilter = action.payload;
    },
    updateProduct: (state: any, action: any) => {
      state.dataUpdate = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state: any, action: any) => {
        state.statusResponse = [];
      })
      .addCase(createProduct.fulfilled, (state: any, action: any) => {
        state.data = action.payload;
        state.statusResponse = [...state.statusResponse, action.payload];
      })
      .addCase(getAllProducts.pending, (state: any, action: any) => {
        state.statusResponse = [];
      })
      .addCase(getAllProducts.fulfilled, (state: any, action: any) => {
        state.listAllProducts = action.payload.data;
        state.dataFilter = action.payload.data;
      })
      .addCase(removeItemProduct.pending, (state: any, action: any) => {
        state.statusResponse = [];
      })
      .addCase(removeItemProduct.fulfilled, (state: any, action: any) => {
        state.data = action.payload;
        state.statusResponse = [...state.statusResponse, action.payload];
      });
  },
});
const { reducer } = productSlice;
export const { updateListImages, filterListProducts, setDefaultDataFilter, updateProduct } = productSlice.actions;
export default reducer;
