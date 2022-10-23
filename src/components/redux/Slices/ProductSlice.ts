import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { requestService } from '../../../api';
import { NAME_ACTION } from '../../../constants/const';
import { IProductState } from '../../../types/types';

export const getCreateProductService: any = createAsyncThunk(
  NAME_ACTION.CREATE_PRODUCT,
  async (params, { rejectWithValue }) => {
    try {
      const response = await requestService.createProductService(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const getUpdateProductService: any = createAsyncThunk(
  NAME_ACTION.UPDATE_PRODUCT,
  async (params, { rejectWithValue }) => {
    try {
      const response = await requestService.updateProductService(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const getDeleteListProductService: any = createAsyncThunk(
  NAME_ACTION.REMOVE_PRODUCT,
  async (params, { rejectWithValue }) => {
    try {
      const response = await requestService.deleteListProductService(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const getListProductService: any = createAsyncThunk(
  NAME_ACTION.GET_PRODUCT,
  async (asd, { rejectWithValue }) => {
    try {
      const response = await requestService.getListProductService();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

// export const uploadFileImgToCloud: any = createAsyncThunk(
//   'UPLOAD_FILE_IMG_TO_CLOUD',
//   async (params: any) => {
//     const data: any = await APIClientService.uploadFile(params).catch((err: any) => {
//       return err.response.data;
//     });
//     return data;
//   },
// );

// export const removeFileImgToCloud: any = createAsyncThunk(
//   'REMOVE_FILE_IMG_TO_CLOUD',
//   async (params: any) => {
//     const data: any = await APIClientService.removeFile(params).catch((err: any) => {
//       return err.response.data;
//     });
//     return data;
//   },
// );

// export const setImageTempProduct: any = createAsyncThunk('SET_IMG_TEMP', async (params: any) => {
//   const data: any = await APIClientService.imageTemp(params).catch((err: any) => {
//     return err.response.data;
//   });
//   return data;
// });

// export const reqUploadListProducts: any = createAsyncThunk(
//   'UPLOAD_FILE_EXCEL',
//   async (params: any) => {
//     const data: any = await APIClientService.uploadFileExcel(params).catch((err: any) => {
//       return err.response.data;
//     });
//     return data;
//   },
// );

const initialState: IProductState = {
  action: NAME_ACTION.DEFAULT_PRODUCT,
  isChange: false,
  loading: false,
  products: [],
  itemSelected: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setChange: (state, action) => {
      state.isChange = action.payload;
    },
  },
  extraReducers: {
    [getListProductService.pending]: (state) => {
      state.loading = true;
    },
    [getListProductService.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [getListProductService.rejected]: (state) => {
      state.loading = false;
    },
    [getCreateProductService.pending]: (state) => {
      state.loading = true;
    },
    [getCreateProductService.fulfilled]: (state) => {
      state.loading = false;
      state.action = NAME_ACTION.DEFAULT_PRODUCT;
      state.itemSelected = [];
      state.isChange = false;
    },
    [getCreateProductService.rejected]: (state) => {
      state.loading = false;
    },
    [getUpdateProductService.pending]: (state) => {
      state.loading = true;
    },
    [getUpdateProductService.fulfilled]: (state) => {
      state.loading = false;
      state.action = NAME_ACTION.DEFAULT_PRODUCT;
      state.itemSelected = [];
      state.isChange = false;
    },
    [getUpdateProductService.rejected]: (state) => {
      state.loading = false;
    },
    [getDeleteListProductService.pending]: (state) => {
      state.loading = true;
    },
    [getDeleteListProductService.fulfilled]: (state) => {
      state.loading = false;
      state.action = NAME_ACTION.DEFAULT_PRODUCT;
      state.itemSelected = [];
      state.isChange = false;
    },
    [getDeleteListProductService.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const productReducer = productSlice.reducer;
export const { setChange } = productSlice.actions;
