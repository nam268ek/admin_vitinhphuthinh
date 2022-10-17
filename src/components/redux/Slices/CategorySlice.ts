import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import APIClientService from "../../../api";
import { NAME_ACTION } from "../../../constants/const";
import { IStateCategories } from "../../Categories/interfaces/categories.interface";
import { openMessage } from "../../services/general.service";

export const getCreateCategoryService: any = createAsyncThunk(
  NAME_ACTION.CREATE_CATEGORY,
  async (params: any, { rejectWithValue }) => {
    try {
      const response: any = await APIClientService.createCategoryService(params);
      return response;
    } catch (error: any) {
      if (error) return rejectWithValue(error.response.data);
    }
  }
);

export const getListCategoryService: any = createAsyncThunk(
  NAME_ACTION.GET_CATEGORY,
  async (params: any, { rejectWithValue }) => {
    try {
      const response: any = await APIClientService.listCategoryService();
      return response;
    } catch (error: any) {
      if (error) return rejectWithValue(error.response.data);
    }
  }
);

export const getRemoveCategoryService: any = createAsyncThunk(
  NAME_ACTION.REMOVE_CATEGORY,
  async (params: string, { rejectWithValue }) => {
    try {
      console.log(params);
      const response: any = await APIClientService.removeCategoryService(params);
      return response;
    } catch (error: any) {
      if (error) return rejectWithValue(error.response.data);
    }
  }
);

const initialState: IStateCategories = {
  loading: false,
  listAllCategory: [],
};
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCreateCategoryService.pending, (state: any, action: any) => {
        state.loading = true;
      })
      .addCase(getCreateCategoryService.fulfilled, (state: any, action: any) => {
        state.loading = false;
        openMessage(action, true);
      })
      .addCase(getCreateCategoryService.rejected, (state: any, action: any) => {
        state.loading = false;
        openMessage(action);
      })
      .addCase(getListCategoryService.pending, (state: any, action: any) => {
        state.loading = true;
      })
      .addCase(getListCategoryService.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.listAllCategory = action.payload;
      })
      .addCase(getListCategoryService.rejected, (state: any, action: any) => {
        state.loading = false;
        openMessage(action);
      })
      .addCase(getRemoveCategoryService.pending, (state: any, action: any) => {
        state.loading = true;
      })
      .addCase(getRemoveCategoryService.fulfilled, (state: any, action: any) => {
        state.loading = false;
        openMessage(action, true);
      })
      .addCase(getRemoveCategoryService.rejected, (state: any, action: any) => {
        state.loading = false;
        openMessage(action);
      });
  },
});
const { reducer } = categorySlice;
export default reducer;
