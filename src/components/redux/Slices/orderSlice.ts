import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import APIClientService from "../../../api";

export const createNewOrder: any = createAsyncThunk("CREATE_NEW_ORDER", async (params: any) => {
  const data: any = await APIClientService.createOrder(params).catch((err: any) => {
    return err.response.data;
  });
  return data;
});

export const updateItemOrder: any = createAsyncThunk("UPDATE_ITEM_ORDER", async (params: any) => {
  const data: any = await APIClientService.updateOrder(params).catch((err: any) => {
    return err.response.data;
  });
  return data;
});

export const getListOrder: any = createAsyncThunk("GET_LIST_ORDER", async (params: any) => {
  const data: any = await APIClientService.requestListOrder(params).catch((err: any) => {
    return err.response.data;
  });
  return data;
});


const initialState = {
  listOrder: [],
  statusResponse: [],
  listAllOrders: [],
  dataUpdate: [],
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateListOrder: (state: any, action: any) => {
      if (action.payload.update) {
        state.listOrder = action.payload.data;
      }
      else state.listOrder = [...state.listOrder, action.payload];
    },
    removeItemListOrder: (state: any, action: any) => {
      state.listOrder = state.listOrder.filter((item: any) => item._id !== action.payload.id);
    },
    updateOrder: (state: any, action: any) => {
      state.dataUpdate = action.payload;
    },
    resetOrder: (state: any, action: any) => {
      state.dataUpdate = [];
      state.listOrder = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewOrder.fulfilled, (state: any, action: any) => {
      state.statusResponse = [...state.statusResponse, action.payload];
    })
    builder.addCase(getListOrder.pending, (state: any, action: any) => {
      state.statusResponse = [];
    })
    builder.addCase(getListOrder.fulfilled, (state: any, action: any) => {
      state.listAllOrders = [...action.payload.data];
    })
    builder.addCase(updateItemOrder.pending, (state: any, action: any) => {
      state.statusResponse = [];
    })
    builder.addCase(updateItemOrder.fulfilled, (state: any, action: any) => {
      state.statusResponse = [...state.statusResponse, action.payload];
    })
  },
});
const { reducer } = orderSlice;
export const { updateListOrder, removeItemListOrder, updateOrder, resetOrder } = orderSlice.actions;
export default reducer;
