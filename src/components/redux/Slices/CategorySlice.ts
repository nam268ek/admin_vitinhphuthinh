import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import APIClientService from "../../../api";

export const createNewCategory: any = createAsyncThunk(
  "CREATE_NEW_CATEGORY",
  async (params: any) => {
    const data: any = await APIClientService.createCategory(params).catch(
      (err: any) => {
        return err.response.data;
      }
    );
    return data;
  }
);

export const getListCategory: any = createAsyncThunk(
  "GET_LIST_CATEGORY",
  async (params: any) => {
    const data: any = await APIClientService.getCategory(params).catch(
      (err: any) => {
        return err.response.data;
      }
    );
    return data;
  }
);

export const removeItemCategory: any = createAsyncThunk(
  "REMOVE_ITEM_CATEGORY",
  async (params: any) => {
    const data: any = await APIClientService.removeCategory(params).catch(
      (err: any) => {
        return err.response.data;
      }
    );
    return data;
  }
);

const initialState = {
  statusResponse: [],
  listAllCategory: [],

};
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewCategory.pending, (state: any, action: any) => {
        state.statusResponse = [];
      })
      .addCase(createNewCategory.fulfilled, (state: any, action: any) => {
        state.statusResponse = [...state.statusResponse, action.payload];
      })
      .addCase(getListCategory.pending, (state: any, action: any) => {
        state.statusResponse = [];
      })
      .addCase(getListCategory.fulfilled, (state: any, action: any) => {
        state.listAllCategory = action.payload.data;
      })
      .addCase(removeItemCategory.pending, (state: any, action: any) => {
        state.statusResponse = [];
      })
      .addCase(removeItemCategory.fulfilled, (state: any, action: any) => {
        state.statusResponse = [...state.statusResponse, action.payload];
      })
  },
});
const { reducer } = categorySlice;
export default reducer;
