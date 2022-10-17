import AxiosClient from "../api/AxiosClient";

const APIClientService = {
  createNewProduct: (params: any) => {
    const url = "/products";
    return AxiosClient.post(url, { params });
  },
  updateProductService: (params: any) => {
    const url = "/products/update";
    return AxiosClient.put(url, params);
  },
  deleteListProductService: (params: any) => {
    const url = "/products/delete";
    return AxiosClient.delete(url, params);
  },
  getListProductService: () => {
    const url = "/products";
    return AxiosClient.get(url);
  },
  updatePassword: (params: any) => {
    const url = "/user/update-pass";
    return AxiosClient.put(url, { params });
  },
  getLogin: (params: any) => {
    const url = "/auths";
    return AxiosClient.post(url, params);
  },
  reqListImgLayout: (params: any) => {
    const url = "/layout";
    return AxiosClient.post(url, { params });
  },
  postRegister: (params: any) => {
    const url = "/register";
    return AxiosClient.post(url, { params });
  },
  listCategoryService: () => {
    const url = "/categories";
    return AxiosClient.get(url);
  },
  removeCategoryService: (params: any) => {
    const url = "/categories/remove";
    return AxiosClient.delete(url, { data: params });
  },
  createCategoryService: (params: any) => {
    const url = "/categories/create";
    return AxiosClient.post(url, params);
  },
  removeProduct: (params: any) => {
    const url = "/products";
    return AxiosClient.post(url, { params });
  },
  getDropdown: (params: any) => {
    const url = "/list-dropdown";
    return AxiosClient.post(url, { params });
  },
  createOrder: (params: any) => {
    const url = "/orders";
    return AxiosClient.post(url, { params });
  },
  requestListOrder: (params: any) => {
    const url = "/orders";
    return AxiosClient.post(url, { params });
  },
  updateOrder: (params: any) => {
    const url = "/orders";
    return AxiosClient.post(url, { params });
  },
  requestRemoveOrder: (params: any) => {
    const url = "/orders";
    return AxiosClient.post(url, { params });
  },
  asyncCartFromDatabase: () => {
    const url = "/cart";
    return AxiosClient.get(url);
  },
  reqFooter: (params: any) => {
    const url = "/footer";
    return AxiosClient.post(url, { params });
  },
  reqFooterEditor: (params: any) => {
    const url = "/footer/policy";
    return AxiosClient.post(url, { params });
  },
  uploadFile: (formData: any) => {
    const url = "/image/product/upload";
    return AxiosClient.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  uploadFileEditor: (formData: any) => {
    const url = "/upload/image/editor";
    return AxiosClient.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  uploadFileSingle: (formData: any) => {
    const url = "/v1/layout";
    return AxiosClient.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  removeFile: (params: any) => {
    const url = "/image/remove";
    return AxiosClient.post(url, { params });
  },
  imageTemp: (params: any) => {
    const url = "/images/check";
    return AxiosClient.post(url, { params });
  },
  getLayouts: (params: any) => {
    const url = "/layout";
    return AxiosClient.post(url, { params });
  },
  uploadFileExcel: (params: any) => {
    const url = "/products/import";
    return AxiosClient.post(url, { params });
  },
};

export default APIClientService;
