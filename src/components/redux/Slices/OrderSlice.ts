import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { requestService } from '../../../api';
import { NAME_ACTION } from '../../../constants/const';

export const getCreateOrderService: any = createAsyncThunk(
  NAME_ACTION.CREATE_ORDER,
  async (params, { rejectWithValue }) => {
    try {
      const response = await requestService.createOrderService(params);
      return response;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error.response.data);
      }
    }
  },
);
export const getUpdateOrderService: any = createAsyncThunk(
  NAME_ACTION.UPDATE_ORDER,
  async (params, { rejectWithValue }) => {
    try {
      const response = await requestService.updateOrderService(params);
      return response;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error.response.data);
      }
    }
  },
);
export const getListOrderService: any = createAsyncThunk(
  NAME_ACTION.GET_ORDER,
  async (_, { rejectWithValue }) => {
    try {
      const response = await requestService.listOrderService();
      return response;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error.response.data);
      }
    }
  },
);

export const getRemoveOrderService: any = createAsyncThunk(
  NAME_ACTION.REMOVE_ORDER,
  async (params, { rejectWithValue }) => {
    try {
      const response = await requestService.removeOrderService(params);
      return response;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error.response.data);
      }
    }
  },
);

const initialState = {
  loading: false,
  orders: [],
  orderUpdate: [],
};
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: {
    [getListOrderService.pending]: (state) => {
      state.loading = true;
    },
    [getListOrderService.fulfilled]: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    [getListOrderService.rejected]: (state) => {
      state.loading = false;
      state.orders = [];
    },
  },
});
export const orderReducer = orderSlice.reducer;
