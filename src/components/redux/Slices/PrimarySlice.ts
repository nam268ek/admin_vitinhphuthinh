import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import APIClientService from "../../../api";

export const getListDropdown: any = createAsyncThunk("GET_LIST_DROPDOWN", async (params: any) => {
  const data: any = await APIClientService.getDropdown(params).catch((err: any) => {
    return err.response.data;
  });
  return data;
});

export const reqUploadImageEditor: any = createAsyncThunk(
  "REQ_UPLOAD_IMAGE_EDITOR",
  async (params: any) => {
    const data: any = await APIClientService.uploadFileEditor(params).catch((err: any) => {
      return err.response.data;
    });
    return data;
  }
);

const initialState = {
  action: "",
  showSidebarCategories: false,
  showSidebarMenu: false,
  isLoading: false,
  showSearchArea: true,
  showOrHideDropdownCart: false,
  showSidebarFilter: false,
  listDropDown: [],
  images: [],
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
    clearImages: (state: any) => {
      state.images = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListDropdown.fulfilled, (state: any, action: any) => {
        state.listDropDown = action.payload.data;
      })
      .addCase(reqUploadImageEditor.fulfilled, (state: any, action: any) => {
        if (action.payload.code === 200 && action.payload.data) {
          state.images = [...state.images, action.payload.data];
        }
      });
  },
});

const { reducer } = primarySlice;
export const { setIsLoading, setAction, clearImages } = primarySlice.actions;
export default reducer;
