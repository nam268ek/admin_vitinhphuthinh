/* eslint-disable curly */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { requestService } from '../../../api';
import { NAME_ACTION } from '../../../constants/const';
import { MarketingState } from '../../../types/types';

export const getListMarketingsService: any = createAsyncThunk(
  NAME_ACTION.GET_MARKETINGS,
  async (_, { rejectWithValue }) => {
    try {
      const response = await requestService.listMarketingsService();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getCreateMarketingService: any = createAsyncThunk(
  NAME_ACTION.CREATE_MARKETINGS,
  async (params, { rejectWithValue }) => {
    try {
      const response = await requestService.createMarketingService(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

const initialState: MarketingState = {
  action: NAME_ACTION.CREATE_MARKETINGS,
  loading: false,
  marketings: [],
};

export const marketingSlice = createSlice({
  name: 'marketing',
  initialState,
  reducers: {
    setMarketingAction: (state, action) => {
      state.action = action.payload;
    },
  },
  extraReducers: {
    [getListMarketingsService.pending]: (state) => {
      state.loading = true;
    },
    [getListMarketingsService.fulfilled]: (state, action) => {
      state.loading = false;
      state.marketings = action.payload;
    },
    [getListMarketingsService.rejected]: (state) => {
      state.loading = false;
    },
    [getCreateMarketingService.pending]: (state) => {
      state.loading = true;
    },
    [getCreateMarketingService.fulfilled]: (state, action) => {
      state.loading = false;
      state.marketings.push(action.payload);
    },
    [getCreateMarketingService.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const { setMarketingAction } = marketingSlice.actions;
export const marketingReducer = marketingSlice.reducer;
