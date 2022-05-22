import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import APIClientService from "../../../api";

export const getListDropdown: any = createAsyncThunk("GET_LIST_DROPDOWN", async (params: any) => {
  const data: any = await APIClientService.getDropdown(params).catch((err: any) => {
    return err.response.data;
  });
  return data;
});

const initialState = {
  action: "",
  showSidebarCategories: false,
  showSidebarMenu: false,
  isLoading: false,
  showSearchArea: true,
  showOrHideDropdownCart: false,
  showSidebarFilter: false,
  listDropDown: [],
};

const primarySlice = createSlice({
  name: "primary",
  initialState,
  reducers: {
    setAction: (state: any, action: any) => {
      state.action = action.payload;
    },
    setIsLoading: (state: any, action: any) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getListDropdown.fulfilled, (state: any, action: any) => {
      state.listDropDown = action.payload.data;
    });
  },
});

const { reducer } = primarySlice;
export const { setIsLoading, setAction } = primarySlice.actions;
export default reducer;
