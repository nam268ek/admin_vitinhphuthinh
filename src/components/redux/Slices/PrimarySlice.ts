/* eslint-disable curly */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { requestService } from '../../../api';
import { NAME_ACTION } from '../../../constants/const';
import { PrimaryState } from '../../../types/types';

export const getListDropdownsService: any = createAsyncThunk(
  NAME_ACTION.GET_DROPDOWN_LIST,
  async (params, { rejectWithValue }) => {
    try {
      const response = await requestService.listDropdownsService(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

const initialState: PrimaryState = {
  loading: false,
  dropdowns: [],
};

export const primarySlice = createSlice({
  name: 'primary',
  initialState,
  reducers: {},
  extraReducers: {
    [getListDropdownsService.pending]: (state) => {
      state.loading = true;
    },
    [getListDropdownsService.fulfilled]: (state, action) => {
      state.loading = false;
      state.dropdowns = action.payload;
    },
    [getListDropdownsService.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const primaryReducer = primarySlice.reducer;
