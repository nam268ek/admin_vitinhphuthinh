import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import APIClientService from "../../../api";

export const createNewOrder: any = createAsyncThunk("CREATE_NEW_ORDER", async (params: any) => {
  const data: any = await APIClientService.createOrder(params).catch((err: any) => {
    return err.response.data;
  });
  return data;
});

const initialState = {
  listOrder: [],
  statusResponse: [],
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateListOrder: (state: any, action: any) => {
      state.listOrder = [...state.listOrder, action.payload];
    },
    removeItemListOrder: (state: any, action: any) => {
      state.listOrder = state.listOrder.filter((item: any) => item._id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewOrder.fulfilled, (state: any, action: any) => {
      state.statusResponse = [...state.statusResponse, action.payload];
    });
  },
});
const { reducer } = orderSlice;
export const { updateListOrder, removeItemListOrder } = orderSlice.actions;
export default reducer;
