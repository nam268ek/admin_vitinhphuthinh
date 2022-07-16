import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import APIClientService from "../../../api";

export const updateListImgLayout: any = createAsyncThunk("UPDATE_LIST_IMG_LAYOUT", async (params: any) => {
  const data: any = await APIClientService.reqListImgLayout(params).catch((err: any) => {
    return err.response.data;
  });
  return data;
});

export const uploadFileLayout: any = createAsyncThunk("UPLOAD_FILE_LAYOUT", async (params: any) => {
  const data: any = await APIClientService.uploadFile(params).catch((err: any) => {
    return err.response.data;
  });
  return data;
});

export const removeFileLayout: any = createAsyncThunk("REMOVE_FILE_LAYOUT", async (params: any) => {
  const data: any = await APIClientService.removeFile(params).catch((err: any) => {
    return err.response.data;
  });
  return data;
});

export const setImageTempLayout: any = createAsyncThunk("SET_IMG_TEMP", async (params: any) => {
  const data: any = await APIClientService.imageTemp(params).catch((err: any) => {
    return err.response.data;
  });
  return data;
});

export const GetDataLayouts: any = createAsyncThunk("SET_IMG_TEMP", async (params: any) => {
  const data: any = await APIClientService.getLayouts(params).catch((err: any) => {
    return err.response.data;
  });
  return data;
});

const initialState = {
  statusUpdated: false,
  currentLayout: "",
  layout: {
    b1: [],
    b2: [],
    b3: [],
    b4: [],
    b5: [],
  },
  statusResponse: [],
  dataUpdate: [],
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    SetCurrentLayoutState: (state: any, action: any) => {
      state.currentLayout = action.payload;
    },
    updateListImagesLayout: (state: any, action: any) => {
      console.log(action.payload);
    },
    updateListImageRemoveLayout: (state: any, action: any) => {
      const layout = action.payload.feature.split("_");
      if (layout[0] === "layout1") {
        Object.keys(state.layout1[0]).forEach((key: any) => {
          if (layout[1] === key) {
            state.layout1[0][key] = action.payload.listPath;
          }
        });
      }
      if (layout[0] === "layout2") {
        Object.keys(state.layout2[0]).forEach((key: any) => {
          if (layout[1] === key) {
            state.layout2[0][key] = action.payload.listPath;
          }
        });
      }
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(updateListImgLayout.fulfilled, (state: any, action: any) => {
        if (action.payload.status === "success" && action.payload.data) {
          state.layout = action.payload.data.layout;
        }
        state.statusResponse = [...state.statusResponse, action.payload];
      })
      .addCase(uploadFileLayout.fulfilled, (state: any, action: any) => {
        if (action.payload.code === 200 && action.payload.data) {
          state.layout[state.currentLayout] = [...state.layout[state.currentLayout], action.payload.data];
        }
        state.statusResponse = [...state.statusResponse, action.payload];
      })
      .addCase(removeFileLayout.fulfilled, (state: any, action: any) => {
        if (action.payload.code === 200 && action.payload.data) {
          state.layout[state.currentLayout] = state.layout[state.currentLayout].filter((item: any) => item.uid !== action.payload.data);
        }
        state.statusResponse = [...state.statusResponse, action.payload];
      })
      .addCase(GetDataLayouts.fulfilled, (state: any, action: any) => {
        if (action.payload.code === 200 && action.payload.data) {
          state.layout = action.payload.data[0].layout;
        }
        state.statusResponse = [...state.statusResponse, action.payload];
      });
  },
});
const { reducer } = layoutSlice;
export const { SetCurrentLayoutState, updateListImagesLayout, updateListImageRemoveLayout } = layoutSlice.actions;
export default reducer;
