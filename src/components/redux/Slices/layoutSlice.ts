import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import APIClientService from "../../../api";

export const updateListImgLayout: any = createAsyncThunk("REQUEST_LIST_IMG", async (params: any) => {
  const data: any = await APIClientService.reqListImgLayout(params).catch((err: any) => {
    return err.response.data;
  });
  return data;
});

const initialState = {
  statusUpdated: false,
  layout: {
    b1: [],
    b2: [],
    b3: [],
    b4: [],
    b5: [],
    imgRm: [],
  },
  listImages: [],
  listImageRemove: [],
  statusResponse: [],
  dataUpdate: [],
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
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
    builder.addCase(updateListImgLayout.fulfilled, (state: any, action: any) => {
      if (action.payload.status === "success" && action.payload.data) {
        const { layout1, layout2 } = action.payload.data;
        state.layout1 = layout1;
        state.layout2 = layout2;
      }
      state.statusResponse = [...state.statusResponse, action.payload];
    });
  },
});
const { reducer } = layoutSlice;
export const { updateListImagesLayout, updateListImageRemoveLayout } = layoutSlice.actions;
export default reducer;
