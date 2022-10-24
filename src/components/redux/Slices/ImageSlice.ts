/* eslint-disable curly */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { requestService } from '../../../api';
import { IImageState } from '../../../types/types';

export const getUploadImageService: any = createAsyncThunk(
  'UPLOAD_IMAGE',
  async (params, { rejectWithValue }) => {
    try {
      const response = await requestService.uploadImageService(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getListImageService: any = createAsyncThunk(
  'LIST_IMAGE',
  async (_, { rejectWithValue }) => {
    try {
      const response = await requestService.listImageService();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

const initialState: IImageState = {
  loading: false,
  images: [],
  imageUploaded: [],
};

export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {},
  extraReducers: {
    [getListImageService.pending]: (state) => {
      state.loading = true;
    },
    [getListImageService.fulfilled]: (state, action) => {
      state.loading = false;
      state.images = action.payload;
    },
    [getListImageService.rejected]: (state) => {
      state.loading = false;
    },
    [getUploadImageService.pending]: (state) => {
      state.loading = true;
    },
    [getUploadImageService.fulfilled]: (state, action) => {
      state.loading = false;
      state.imageUploaded.push(action.payload);
    },
    [getUploadImageService.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const imageReducer = imageSlice.reducer;
