import { instance } from '../api/AxiosClient';
import { PayloadLogin } from './interfaces';

export const requestService = {
  //Product services
  createProductService: (params: any) => {
    const url = '/products';
    return instance.post(url, params);
  },
  updateProductService: (params: any) => {
    const url = '/products/update';
    return instance.put(url, params);
  },
  deleteListProductService: (params: any) => {
    const url = '/products/delete';
    return instance.delete(url, params);
  },
  getListProductService: () => {
    const url = '/products';
    return instance.get(url);
  },
  // Auth services
  updatePassword: (params: any) => {
    const url = '/user/update-pass';
    return instance.put(url, { params });
  },
  loginService: (params: PayloadLogin) => {
    const url = '/auths';
    return instance.post(url, params);
  },
  logoutService: () => {
    const url = '/auths/logout';
    return instance.post(url);
  },
  postRegister: (params: any) => {
    const url = '/register';
    return instance.post(url, { params });
  },
  // image services
  reqListImgLayout: (params: any) => {
    const url = '/layout';
    return instance.post(url, { params });
  },
  uploadImageService: (formData: any) => {
    const url = '/images/upload';
    return instance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  listImageService: () => {
    const url = '/image';
    return instance.get(url);
  },
  removeImageUploadService: (params: any) => {
    const url = '/images/remove';
    return instance.delete(url, { data: params });
  },
  //Category service
  listCategoryService: () => {
    const url = '/categories';
    return instance.get(url);
  },
  removeCategoryService: (params: any) => {
    const url = '/categories/remove';
    return instance.delete(url, { data: params });
  },
  createCategoryService: (params: any) => {
    const url = '/categories/create';
    return instance.post(url, params);
  },
  updateCategoryService: (params: any) => {
    const url = '/categories/update';
    return instance.put(url, params);
  },
  //
  getDropdown: (params: any) => {
    const url = '/list-dropdown';
    return instance.post(url, { params });
  },
  createOrderService: (params: any) => {
    const url = '/orders';
    return instance.post(url, params);
  },
  listOrderService: () => {
    const url = '/orders';
    return instance.get(url);
  },
  updateOrderService: (params: any) => {
    const url = '/orders';
    return instance.post(url, params);
  },
  removeOrderService: (params: any) => {
    const url = '/orders';
    return instance.post(url, { data: params });
  },
  asyncCartFromDatabase: () => {
    const url = '/cart';
    return instance.get(url);
  },
  reqFooter: (params: any) => {
    const url = '/footer';
    return instance.post(url, { params });
  },
  reqFooterEditor: (params: any) => {
    const url = '/footer/policy';
    return instance.post(url, { params });
  },

  uploadFileEditor: (formData: any) => {
    const url = '/upload/image/editor';
    return instance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  uploadFileSingle: (formData: any) => {
    const url = '/v1/layout';
    return instance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  removeFile: (params: any) => {
    const url = '/image/remove';
    return instance.post(url, { params });
  },
  imageTemp: (params: any) => {
    const url = '/images/check';
    return instance.post(url, { params });
  },
  getLayouts: (params: any) => {
    const url = '/layout';
    return instance.post(url, { params });
  },
  uploadFileExcel: (params: any) => {
    const url = '/products/import';
    return instance.post(url, { params });
  },
};
