import AxiosClient from "../api/AxiosClient";
//get theme api
const APIClientService = {
  createNewProduct: (params: any) => {
    const url = "/products";
    return AxiosClient.post(url, { params });
  },
  getAllProducts: (params: any) => {
    const url = "/products";
    return AxiosClient.post(url, { params });
  },
  updatePassword: (params: any) => {
    const url = "/user/update-pass";
    return AxiosClient.put(url, { params });
  },
  getLogin: (params: any) => {
    const url = "/login";
    return AxiosClient.post(url, { params });
  },
  // getRefreshToken: (params) => {},
  reqListImgLayout: (params: any) => {
    const url = "/layout";
    return AxiosClient.post(url, { params });
  },
  postRegister: (params: any) => {
    const url = "/register";
    return AxiosClient.post(url, { params });
  },
  getCategory: (params: any) => {
    const url = "/categories";
    return AxiosClient.post(url, { params });
  },
  removeCategory: (params: any) => {
    const url = "/categories";
    return AxiosClient.post(url, { params });
  },
  createCategory: (params: any) => {
    const url = "/categories";
    return AxiosClient.post(url, { params });
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
    const url = "/image-upload";
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
    const url = "/image-remove";
    return AxiosClient.post(url, { params });
  },
  imageTemp: (params: any) => {
    const url = "/check-images";
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
