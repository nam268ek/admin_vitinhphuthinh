import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import APIClientService from "../../../api";
// import { openDialogError } from "../../services/general.service";

export const updateContentFooter: any = createAsyncThunk(
  "UPDATE_FOOTER_CONTENT",
  async (params: any) => {
    const data: any = await APIClientService.reqFooter(params).catch((err: any) => {
      return err.response.data;
    });
    return data;
  }
);

export const getContentFooter: any = createAsyncThunk("GET_FOOTER_CONTENT", async (params: any) => {
  const data: any = await APIClientService.reqFooter(params).catch((err: any) => {
    return err.response.data;
  });
  return data;
});

export const getContentFooterEditor: any = createAsyncThunk(
  "GET_FOOTER_CONTENT_EDITOR",
  async (params: any) => {
    const data: any = await APIClientService.reqFooterEditor(params).catch((err: any) => {
      return err.response.data;
    });
    return data;
  }
);

export const updateContentFooterEditor: any = createAsyncThunk(
  "UPDATE_FOOTER_CONTENT_EDITOR",
  async (params: any) => {
    const data: any = await APIClientService.reqFooterEditor(params).catch((err: any) => {
      return err.response.data;
    });
    return data;
  }
);

const initialState = {
  statusUpdated: false,
  statusResponse: [],
  dataUpdate: [],
  dataUpdatePolicy: [],
};

const FooterSlice = createSlice({
  name: "footer",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(updateContentFooter.fulfilled, (state: any, action: any) => {
        if (action.payload.code === 200 && action.payload.data) {
          state.dataUpdate = [action.payload.data];
        }
        state.statusResponse = [...state.statusResponse, action.payload];
      })
      .addCase(getContentFooter.fulfilled, (state: any, action: any) => {
        // openDialogError(action.payload);
        if (action.payload.code === 200 && action.payload.data) {
          state.dataUpdate = action.payload.data;
        }
        state.statusResponse = [...state.statusResponse, action.payload];
      })
      .addCase(getContentFooterEditor.fulfilled, (state: any, action: any) => {
        // openDialogError(action.payload);
        if (action.payload.code === 200 && action.payload.data) {
          state.dataUpdatePolicy = action.payload.data;
        }
        state.statusResponse = [...state.statusResponse, action.payload];
      })
      .addCase(updateContentFooterEditor.fulfilled, (state: any, action: any) => {
        // openDialogError(action.payload);
        if (action.payload.code === 200 && action.payload.data) {
          state.dataUpdatePolicy = [action.payload.data];
        }
        state.statusResponse = [...state.statusResponse, action.payload];
      });
  },
});
const { reducer } = FooterSlice;
// export const {  } = FooterSlice.actions;
export default reducer;
