/* eslint-disable curly */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { requestService } from '../../../api';
import { NAME_ACTION } from '../../../constants/const';
import { BrandState, TagState } from '../../../types/types';

export const getListBrandsService: any = createAsyncThunk(
  NAME_ACTION.GET_BRAND,
  async (_, { rejectWithValue }) => {
    try {
      const response = await requestService.listBrandsService();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getCreateBrandService: any = createAsyncThunk(
  NAME_ACTION.CREATE_BRAND,
  async (params, { rejectWithValue }) => {
    try {
      const response = await requestService.createBrandService(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

const initialState: BrandState = {
  loading: false,
  brands: [],
};

export const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {},
  extraReducers: {
    [getListBrandsService.pending]: (state) => {
      state.loading = true;
    },
    [getListBrandsService.fulfilled]: (state, action) => {
      state.loading = false;
      state.brands = action.payload;
    },
    [getListBrandsService.rejected]: (state) => {
      state.loading = false;
    },
    [getCreateBrandService.pending]: (state) => {
      state.loading = true;
    },
    [getCreateBrandService.fulfilled]: (state, action) => {
      state.loading = false;
      state.brands.push(action.payload);
    },
    [getCreateBrandService.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const brandReducer = brandSlice.reducer;
