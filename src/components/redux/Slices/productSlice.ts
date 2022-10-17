import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import APIClientService from "../../../api";
import { IProducts } from "../../Products/interfaces/product.interface";

export const createProduct: any = createAsyncThunk("CREATE_PRODUCT", async (params: any) => {
  const data: any = await APIClientService.createNewProduct(params).catch((err: any) => {
    return err.response.data;
  });
  return data;
});

export const getUpdateProductService: any = createAsyncThunk("UPDATE_PRODUCT", async (params: any) => {
  const data: any = await APIClientService.updateProductService(params).catch((err: any) => {
    return err.response.data;
  });
  return data;
});

export const getDeleteListProductService: any = createAsyncThunk("DELETE_LIST_PRODUCT", async (params: any) => {
  const data: any = await APIClientService.deleteListProductService(params).catch((err: any) => {
    return err.response.data;
  });
  return data;
});

export const getListProductService: any = createAsyncThunk("GET_LIST_PRODUCT", async () => {
  const data: any = await APIClientService.getListProductService().catch((err: any) => {
    return err.response.data;
  });
  return data;
});

export const removeItemProduct: any = createAsyncThunk("REMOVE_ITEM_PRODUCT", async (params: any) => {
  const data: any = await APIClientService.removeProduct(params).catch((err: any) => {
    return err.response.data;
  });
  return data;
});

export const uploadFileImgToCloud: any = createAsyncThunk("UPLOAD_FILE_IMG_TO_CLOUD", async (params: any) => {
  const data: any = await APIClientService.uploadFile(params).catch((err: any) => {
    return err.response.data;
  });
  return data;
});

export const removeFileImgToCloud: any = createAsyncThunk("REMOVE_FILE_IMG_TO_CLOUD", async (params: any) => {
  const data: any = await APIClientService.removeFile(params).catch((err: any) => {
    return err.response.data;
  });
  return data;
});

export const setImageTempProduct: any = createAsyncThunk("SET_IMG_TEMP", async (params: any) => {
  const data: any = await APIClientService.imageTemp(params).catch((err: any) => {
    return err.response.data;
  });
  return data;
});

export const reqUploadListProducts: any = createAsyncThunk("UPLOAD_FILE_EXCEL", async (params: any) => {
  const data: any = await APIClientService.uploadFileExcel(params).catch((err: any) => {
    return err.response.data;
  });
  return data;
});

const initialState = {
  statusUpdated: false,
  data: {},
  listImages: [],
  listAllProducts: [],
  statusResponse: [],
  dataFilter: [],
  dataUpdate: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateListImages: (state: any, action: any) => {
      state.listImages = action.payload;
    },
    filterListProducts: (state: any, action: any) => {
      state.dataFilter = action.payload;
    },
    setDefaultDataFilter: (state: any, action: any) => {
      state.dataFilter = action.payload;
    },
    updateProduct: (state: any, action: any) => {
      state.dataUpdate = action.payload;
      if (action.payload.length > 0) {
        state.listImages = action.payload[0].img;
      }
    },
    resetProcessImg: (state: any) => {
      state.listImages = [];
    },
    updateListAllProducts: (state: any, action: any) => {
      state.listAllProducts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state: any, action: any) => {
        state.statusResponse = [];
      })
      .addCase(createProduct.fulfilled, (state: any, action: any) => {
        state.data = action.payload;
        state.statusResponse = [...state.statusResponse, action.payload];
      })
      .addCase(getListProductService.fulfilled, (state: any, action: any) => {
        if (action.payload.length > 0) {
          state.listAllProducts = action.payload;
        }
      })
      .addCase(getUpdateProductService.fulfilled, (state: any, action: any) => {
        const { id } = action.payload;
        state.listAllProducts = state.listAllProducts.map((item: IProducts, index: string) => {
          if (item.id === id) return (state.listAllProducts[index] = action.payload);
          return item;
        });
      })
      .addCase(getUpdateProductService.rejected, (state: any, action: any) => {})
      .addCase(getDeleteListProductService.fulfilled, (state: any, action: any) => {
        if (action.payload.length > 0) {
          state.listAllProducts = action.payload;
        }
      })
      .addCase(getDeleteListProductService.rejected, (state: any, action: any) => {})
      .addCase(removeItemProduct.pending, (state: any, action: any) => {
        state.statusResponse = [];
      })
      .addCase(removeItemProduct.fulfilled, (state: any, action: any) => {
        state.data = action.payload;
        state.statusResponse = [...state.statusResponse, action.payload];
      })
      .addCase(uploadFileImgToCloud.fulfilled, (state: any, action: any) => {
        // state.data = action.payload;
        if (action.payload.code === 200 && action.payload.data) {
          state.listImages = [...state.listImages, action.payload.data];
          // state.statusResponse = [...state.statusResponse, action.payload];
        }
      })
      .addCase(removeFileImgToCloud.fulfilled, (state: any, action: any) => {
        if (action.payload.code === 200 && action.payload.data) {
          state.listImages = state.listImages.filter((img: any) => img.uid !== action.payload.data);
        }
      })
      .addCase(reqUploadListProducts.fulfilled, (state: any, action: any) => {
        if (action.payload.code === 200 && action.payload.data) {
          state.listAllProducts = action.payload.data;
          state.dataFilter = action.payload.data;
        }
      });
  },
});
const { reducer } = productSlice;
export const {
  updateListAllProducts,
  resetProcessImg,
  updateListImages,
  filterListProducts,
  setDefaultDataFilter,
  updateProduct,
} = productSlice.actions;
export default reducer;
