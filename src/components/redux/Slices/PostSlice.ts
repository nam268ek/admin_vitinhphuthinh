/* eslint-disable curly */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { requestService } from '../../../api';
import { NAME_ACTION } from '../../../constants/const';
import { PostState } from '../../../types/types';

export const getListPostsService: any = createAsyncThunk(NAME_ACTION.GET_LIST_POSTS, async (_, { rejectWithValue }) => {
  try {
    const response = await requestService.listPostsService();
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const getCreatePostService: any = createAsyncThunk(NAME_ACTION.CREATE_POST, async (params, { rejectWithValue }) => {
  try {
    const response = await requestService.createPostService(params);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const getUpdatePostService: any = createAsyncThunk(NAME_ACTION.UPDATE_POST, async (params, { rejectWithValue }) => {
  try {
    const response = await requestService.updatePostService(params);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
export const getDeleteListPostService: any = createAsyncThunk(NAME_ACTION.REMOVE_POST, async (params, { rejectWithValue }) => {
  try {
    const response = await requestService.deleteListPostsService(params);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const getUpdateManyPostService: any = createAsyncThunk(NAME_ACTION.UPDATE_POST, async (params, { rejectWithValue }) => {
  try {
    const response = await requestService.updatePostManyService(params);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

const initialState: PostState = {
  action: NAME_ACTION.CREATE_POST,
  loading: false,
  posts: [],
  errors: {},
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPostAction: (state, action) => {
      state.action = action.payload;
    },
  },
  extraReducers: {
    [getUpdateManyPostService.pending]: (state) => {
      state.loading = true;
    },
    [getUpdateManyPostService.fulfilled]: (state) => {
      state.loading = false;
    },
    [getUpdateManyPostService.rejected]: (state) => {
      state.loading = false;
    },
    [getListPostsService.pending]: (state) => {
      state.loading = true;
    },
    [getListPostsService.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    [getListPostsService.rejected]: (state) => {
      state.loading = false;
    },
    [getCreatePostService.pending]: (state) => {
      state.loading = true;
    },
    [getCreatePostService.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts.push(action.payload);
    },
    [getCreatePostService.rejected]: (state) => {
      state.loading = false;
    },
    [getUpdatePostService.pending]: (state) => {
      state.loading = true;
    },
    [getUpdatePostService.fulfilled]: (state) => {
      state.loading = false;
    },
    [getUpdatePostService.rejected]: (state) => {
      state.loading = false;
    },
    [getDeleteListPostService.pending]: (state) => {
      state.loading = true;
    },
    [getDeleteListPostService.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts.push(action.payload);
    },
    [getDeleteListPostService.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const { setPostAction } = postSlice.actions;
export const postReducer = postSlice.reducer;
