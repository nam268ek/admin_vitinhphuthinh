/* eslint-disable curly */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { requestService } from '../../../api';
import { NAME_ACTION } from '../../../constants/const';
import { IStateCategories } from '../../Categories/interfaces/categories.interface';

export const getCreateCategoryService: any = createAsyncThunk(
  NAME_ACTION.CREATE_CATEGORY,
  async (params, { rejectWithValue }) => {
    try {
      const response = await requestService.createCategoryService(params);
      return response;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error.response.data);
      }
    }
  },
);

export const getListCategoryService: any = createAsyncThunk(
  NAME_ACTION.GET_CATEGORY,
  async (_, { rejectWithValue }) => {
    try {
      const response = await requestService.listCategoryService();
      return response;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error.response.data);
      }
    }
  },
);

export const getRemoveCategoryService: any = createAsyncThunk(
  NAME_ACTION.REMOVE_CATEGORY,
  async (params: string, { rejectWithValue }) => {
    try {
      const response = await requestService.removeCategoryService(params);
      return response;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error.response.data);
      }
    }
  },
);

const initialState: IStateCategories = {
  loading: false,
  categories: [],
  itemSelected: [],
};
export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addItemSelected: (state, action) => {
      state.itemSelected.push(action.payload);
    },
    cleanState: (state: any, action) => {
      const { list } = action.payload;
      for (const st of list) {
        [state][st] = [];
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: {
    [getListCategoryService.pending]: (state) => {
      state.loading = true;
    },
    [getListCategoryService.fulfilled]: (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    },
    [getListCategoryService.rejected]: (state) => {
      state.loading = false;
    },
    [getCreateCategoryService.pending]: (state) => {
      state.loading = true;
    },
    [getCreateCategoryService.fulfilled]: (state) => {
      state.loading = false;
    },
    [getCreateCategoryService.rejected]: (state) => {
      state.loading = false;
    },
    [getRemoveCategoryService.pending]: (state) => {
      state.loading = true;
    },
    [getRemoveCategoryService.fulfilled]: (state) => {
      state.loading = false;
    },
    [getRemoveCategoryService.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const categoryReducer = categorySlice.reducer;
export const { addItemSelected, cleanState, setLoading } = categorySlice.actions;
