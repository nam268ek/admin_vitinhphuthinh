import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { requestService } from '../../../api';
import { NAME_ACTION } from '../../../constants/const';
import { FooterState } from '../../../types/types';

export const getListFootersService: any = createAsyncThunk(NAME_ACTION.GET_LIST_FOOTERS, async (_, { rejectWithValue }) => {
  try {
    const response = await requestService.getListFooterService();
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
export const getListPoliciesService: any = createAsyncThunk(NAME_ACTION.GET_LIST_POLICY, async (_, { rejectWithValue }) => {
  try {
    const response = await requestService.listPoliciesService();
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
export const getUpdateFooterService: any = createAsyncThunk(NAME_ACTION.UPDATE_FOOTER, async (params, { rejectWithValue }) => {
  try {
    const response = await requestService.updateFooterService(params);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
export const getUpdatePolicyService: any = createAsyncThunk(NAME_ACTION.UPDATE_POLICY, async (params, { rejectWithValue }) => {
  try {
    const response = await requestService.updatePolicyService(params);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

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
    [getUpdateFooterService.pending]: (state) => {
      state.loading = true;
    },
    [getUpdateFooterService.fulfilled]: (state, action) => {
      state.loading = false;
      state.footers = [...action.payload];
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
    [getUpdatePolicyService.rejected]: (state) => {
      state.loading = false;
    },
    [getUpdatePolicyService.pending]: (state) => {
      state.loading = true;
    },
    [getUpdatePolicyService.fulfilled]: (state) => {
      state.loading = false;
    },
    [getListPoliciesService.rejected]: (state) => {
      state.loading = false;
    },
    [getListPoliciesService.pending]: (state) => {
      state.loading = true;
    },
    [getListPoliciesService.fulfilled]: (state, action) => {
      state.loading = false;
      state.policies = action.payload;
    },
  },
});
export const footerReducer = footerSlice.reducer;
