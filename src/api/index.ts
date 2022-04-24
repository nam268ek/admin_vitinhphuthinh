import AxiosClient from '../api/AxiosClient';
//get theme api
const APIClientService = {
  createNewProduct: (params: any) => {
    const url = '/products';
    return AxiosClient.post(url, { params });
  },
  getAllProducts: (params: any) => {
    const url = '/products';
    return AxiosClient.post(url, { params });
  },
  updatePassword: (params: any) => {
    const url = '/user/update-pass';
    return AxiosClient.put(url, { params });
  },
  getLogin: (params: any) => {
    const url = '/login';
    return AxiosClient.post(url, { params });
  },
  // getRefreshToken: (params) => {},
  getOrderCanceled: () => {
    const url = '/order/canceled';
    return AxiosClient.get(url);
  },
  postRegister: (params: any) => {
    const url = '/register';
    return AxiosClient.post(url, { params });
  },
  getAll: () => {
    const url = '/themes';
    return AxiosClient.get(url);
  },
  getLimit: (params: any) => {
    const url = '/themes';
    return AxiosClient.get(url, { params });
  },
  showCase: () => {
    const url = '/showcase';
    return AxiosClient.get(url);
  },
  getLimitShowCase: (params: any) => {
    const url = '/showcase';
    return AxiosClient.get(url, { params });
  },
  getDetailShowCase: () => {
    const url = '/detail';
    return AxiosClient.get(url);
  },
  getCardPostList: () => {
    const url = '/cardposts';
    return AxiosClient.get(url);
  },
  getCardPostListLimit: (params: any) => {
    const url = '/cardposts';
    return AxiosClient.get(url, { params });
  },
  asyncProductForUser: (params: any) => {
    const url = '/cart';
    return AxiosClient.post(url, { params });
  },
  asyncCartFromDatabase: () => {
    const url = '/cart';
    return AxiosClient.get(url);
  },
  checkOutPurchase: (params: any) => {
    const url = '/checkout';
    return AxiosClient.post(url, { params });
  },
  getDataPurchase: () => {
    const url = '/checkout';
    return AxiosClient.get(url);
  },
  uploadFile: (formData: any) => {
    const url = '/image-upload';
    return AxiosClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  paymentRequest: (params: any) => {
    const url = '/create-checkout-session';
    return AxiosClient.post(url, { params });
  },
};

export default APIClientService;
