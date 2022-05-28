import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import APIClientService from "../../../api";



const initialState = {
  listOrder: [],
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
    }
  },

});
const { reducer } = orderSlice;
export const { updateListOrder, removeItemListOrder } = orderSlice.actions;
export default reducer;
