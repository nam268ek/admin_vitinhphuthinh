/* eslint-disable curly */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { requestService } from '../../../api';
import { NAME_ACTION } from '../../../constants/const';
import { IImage, IImageState } from '../../../types/types';

export const getUploadImageService: any = createAsyncThunk(
  NAME_ACTION.CREATE_IMAGE,
  async (params, { rejectWithValue }) => {
    try {
      const response = await requestService.uploadImageService(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const getRemoveImageUploadService: any = createAsyncThunk(
  NAME_ACTION.REMOVE_IMAGE,
  async (params, { rejectWithValue }) => {
    try {
      const response = await requestService.removeImageUploadService(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const getListImageService: any = createAsyncThunk(
  NAME_ACTION.GET_IMAGE,
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
  reducers: {
    updateImageUploadedAction: (state, action) => {
      const { keyId } = action.payload;
      state.imageUploaded = state.imageUploaded.filter((item: IImage) => item.keyId !== keyId);
    },
  },
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
    [getRemoveImageUploadService.pending]: (state) => {
      state.loading = true;
    },
    [getRemoveImageUploadService.fulfilled]: (state) => {
      state.loading = false;
    },
    [getRemoveImageUploadService.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const { updateImageUploadedAction } = imageSlice.actions;
export const imageReducer = imageSlice.reducer;
