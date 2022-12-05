import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { requestService } from '../../../api';
import { NAME_ACTION } from '../../../constants/const';
import { FooterState } from '../../../types/types';

export const getCreateFooterService: any = createAsyncThunk(
  NAME_ACTION.CREATE_FOOTER,
  async (params, { rejectWithValue }) => {
    try {
      const response = await requestService.createFooterService(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const getListFootersService: any = createAsyncThunk(
  NAME_ACTION.GET_LIST_FOOTERS,
  async (_, { rejectWithValue }) => {
    try {
      const response = await requestService.getListFooterService();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const getUpdateFooterService: any = createAsyncThunk(
  NAME_ACTION.UPDATE_FOOTER,
  async (params, { rejectWithValue }) => {
    try {
      const response = await requestService.updateFooterService(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

const initialState: FooterState = {
  action: NAME_ACTION.CREATE_FOOTER,
  loading: false,
  footers: [],
  policies: [],
};

const footerSlice = createSlice({
  name: 'footer',
  initialState,
  reducers: {},
  extraReducers: {
    [getCreateFooterService.pending]: (state) => {
      state.loading = true;
    },
    [getCreateFooterService.fulfilled]: (state, action) => {
      state.loading = false;
      state.footers.push(action.payload);
    },
    [getCreateFooterService.rejected]: (state) => {
      state.loading = false;
    },
    [getUpdateFooterService.pending]: (state) => {
      state.loading = true;
    },
    [getUpdateFooterService.fulfilled]: (state) => {
      state.loading = false;
    },
    [getUpdateFooterService.rejected]: (state) => {
      state.loading = false;
    },
    [getListFootersService.rejected]: (state) => {
      state.loading = false;
    },
    [getListFootersService.pending]: (state) => {
      state.loading = true;
    },
    [getListFootersService.fulfilled]: (state, action) => {
      state.loading = false;
      state.footers = action.payload;
    },
  },
});
export const footerReducer = footerSlice.reducer;
