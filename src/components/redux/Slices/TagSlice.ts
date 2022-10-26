/* eslint-disable curly */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { requestService } from '../../../api';
import { NAME_ACTION } from '../../../constants/const';
import { TagState } from '../../../types/types';

export const getListTagsService: any = createAsyncThunk(
  NAME_ACTION.GET_TAG,
  async (_, { rejectWithValue }) => {
    try {
      const response = await requestService.listTagsService();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getCreateTagService: any = createAsyncThunk(
  NAME_ACTION.CREATE_TAG,
  async (params, { rejectWithValue }) => {
    try {
      const response = await requestService.createTagService(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

const initialState: TagState = {
  loading: false,
  tags: [],
};

export const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {},
  extraReducers: {
    [getListTagsService.pending]: (state) => {
      state.loading = true;
    },
    [getListTagsService.fulfilled]: (state, action) => {
      state.loading = false;
      state.tags = action.payload;
    },
    [getListTagsService.rejected]: (state) => {
      state.loading = false;
    },
    [getCreateTagService.pending]: (state) => {
      state.loading = true;
    },
    [getCreateTagService.fulfilled]: (state, action) => {
      state.loading = false;
      state.tags.push(action.payload);
    },
    [getCreateTagService.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const tagReducer = tagSlice.reducer;
