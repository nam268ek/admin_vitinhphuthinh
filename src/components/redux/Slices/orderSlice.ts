import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import APIClientService from "../../../api";
// import { openDialogError } from "../../services/general.service";

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

export const reqRemoveListSelectItemOrder: any = createAsyncThunk(
  "REMOVE_LIST_ORDER",
  async (params: any) => {
    const data: any = await APIClientService.requestRemoveOrder(params).catch((err: any) => {
      return err.response.data;
    });
    return data;
  }
);

const initialState = {
  listOrder: [],
  statusResponse: [],
  listAllOrders: [],
  dataUpdate: [],
  viewItemOrder: [],
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateListOrder: (state: any, action: any) => {
      if (action.payload.update) {
        state.listOrder = action.payload.data;
      } else state.listOrder = [...state.listOrder, action.payload];
    },
    removeItemListOrder: (state: any, action: any) => {
      state.listOrder = state.listOrder.filter((item: any) => item._id !== action.payload.id);
    },
    updateOrder: (state: any, action: any) => {
      state.dataUpdate = action.payload;
    },
    resetOrder: (state: any) => {
      state.dataUpdate = [];
      state.listOrder = [];
    },
    updateViewItemOrder: (state: any, action: any) => {
      state.viewItemOrder = [action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.fulfilled, (state: any, action: any) => {
        if (action.payload.code === 200 && action.payload.data) {
          state.statusResponse = [...state.statusResponse, action.payload];
          state.dataUpdate = [];
          state.listOrder = [];
        }
      })
      .addCase(getListOrder.pending, (state: any, action: any) => {
        state.statusResponse = [];
      })
      .addCase(getListOrder.fulfilled, (state: any, action: any) => {
        state.listAllOrders = [...action.payload.data];
      })
      .addCase(updateItemOrder.pending, (state: any, action: any) => {
        state.statusResponse = [];
      })
      .addCase(updateItemOrder.fulfilled, (state: any, action: any) => {
        state.statusResponse = [...state.statusResponse, action.payload];
      })
      .addCase(reqRemoveListSelectItemOrder.fulfilled, (state: any, action: any) => {
        if (action.payload.code === 200 && action.payload.data) {
          let listData = cloneDeep(state.listAllOrders);
          for (let id in action.payload.data) {
            listData = listData.filter((item: any) => item._id !== action.payload.data[id]);
          }
          state.listAllOrders = listData;
        }
      });
  },
});

const { reducer } = orderSlice;
export const {
  updateListOrder,
  removeItemListOrder,
  updateOrder,
  resetOrder,
  updateViewItemOrder,
} = orderSlice.actions;
export default reducer;
