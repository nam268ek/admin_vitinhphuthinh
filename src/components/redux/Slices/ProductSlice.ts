import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { requestService } from '../../../api';
import { NAME_ACTION } from '../../../constants/const';
import { IProductState } from '../../../types/types';

export const getCreateProductService: any = createAsyncThunk(
  NAME_ACTION.CREATE_PRODUCT,
  async (params, { rejectWithValue }) => {
    try {
      const response = await requestService.createProductService(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const getUpdateProductService: any = createAsyncThunk(
  NAME_ACTION.UPDATE_PRODUCT,
  async (params, { rejectWithValue }) => {
    try {
      const response = await requestService.updateProductService(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const getUpdateProductInventoryService: any = createAsyncThunk(
  NAME_ACTION.UPDATE_PRODUCT_INVENTORY,
  async (params, { rejectWithValue }) => {
    try {
      const response = await requestService.updateProductInventoryService(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const getDeleteListProductService: any = createAsyncThunk(
  NAME_ACTION.REMOVE_PRODUCT,
  async (params, { rejectWithValue }) => {
    try {
      const response = await requestService.deleteListProductService(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const getListProductService: any = createAsyncThunk(
  NAME_ACTION.GET_PRODUCT,
  async (_, { rejectWithValue }) => {
    try {
      const response = await requestService.listProductService();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getCreateProductInventoryService: any = createAsyncThunk(
  NAME_ACTION.CREATE_PRODUCT_INVENTORY,
  async (params, { rejectWithValue }) => {
    try {
      const response = await requestService.createProductInventoryService(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getListProductInventoryService: any = createAsyncThunk(
  NAME_ACTION.GET_PRODUCT_INVENTORY,
  async (params, { rejectWithValue }) => {
    try {
      const response = await requestService.listProductInventoryService(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

const initialState: IProductState = {
  action: NAME_ACTION.DEFAULT_PRODUCT,
  isChange: false,
  loading: false,
  products: [],
  itemSelected: [],
  keyProduct: '',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setChange: (state, action) => {
      state.isChange = action.payload;
    },
    updateStateKeyProductAction: (state, action) => {
      state.keyProduct = action.payload;
    },
    setAction: (state, action) => {
      state.action = action.payload;
    },
    setItemSelectedAction: (state, action) => {
      state.itemSelected = action.payload;
    },
    setDefaultProductAction: (state) => {
      state.action = NAME_ACTION.DEFAULT_PRODUCT;
      state.itemSelected = [];
    },
    setUpdateListProductAction: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: {
    [getListProductService.pending]: (state) => {
      state.loading = true;
    },
    [getListProductService.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [getListProductService.rejected]: (state) => {
      state.loading = false;
    },
    [getCreateProductService.pending]: (state) => {
      state.loading = true;
    },
    [getCreateProductService.fulfilled]: (state) => {
      state.loading = false;
      state.action = NAME_ACTION.DEFAULT_PRODUCT;
      state.itemSelected = [];
      state.keyProduct = '';
    },
    [getCreateProductService.rejected]: (state) => {
      state.loading = false;
    },
    [getUpdateProductService.pending]: (state) => {
      state.loading = true;
    },
    [getUpdateProductService.fulfilled]: (state, action) => {
      state.loading = false;
      const index = state.products.findIndex((o) => o.id === action.payload.id);
      state.products[index] = action.payload;
      state.action = NAME_ACTION.DEFAULT_PRODUCT;
      state.itemSelected = [];
      state.keyProduct = '';
    },
    [getUpdateProductService.rejected]: (state) => {
      state.loading = false;
    },
    [getDeleteListProductService.pending]: (state) => {
      state.loading = true;
    },
    [getDeleteListProductService.fulfilled]: (state, action) => {
      state.loading = false;
      state.itemSelected = [];
      state.products = action.payload;
    },
    [getDeleteListProductService.rejected]: (state) => {
      state.loading = false;
    },
    [getCreateProductInventoryService.pending]: (state) => {
      state.loading = true;
    },
    [getCreateProductInventoryService.fulfilled]: (state) => {
      state.loading = false;
    },
    [getCreateProductInventoryService.rejected]: (state) => {
      state.loading = false;
    },
    [getUpdateProductInventoryService.pending]: (state) => {
      state.loading = true;
    },
    [getUpdateProductInventoryService.fulfilled]: (state) => {
      state.loading = false;
    },
    [getUpdateProductInventoryService.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const productReducer = productSlice.reducer;
export const {
  setChange,
  setDefaultProductAction,
  updateStateKeyProductAction,
  setAction,
  setUpdateListProductAction,
  setItemSelectedAction,
} = productSlice.actions;
