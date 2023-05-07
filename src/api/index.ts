import queryString from 'query-string';
import { instance } from '../api/AxiosClient';
import { PayloadLogin } from './interfaces';

export const requestService = {
  //Product services
  createProductService: (params: any) => {
    const url = '/products/create';
    return instance.post(url, params);
  },
  updateProductService: (params: any) => {
    const url = '/products/update';
    return instance.put(url, params);
  },
  updateManyProductService: (params: any) => {
    const url = '/products/update-many';
    return instance.put(url, params);
  },
  deleteListProductService: (params: any) => {
    const url = '/products/remove';
    return instance.delete(url, { data: params });
  },
  listProductService: () => {
    const url = '/products';
    return instance.get(url);
  },
  createProductInventoryService: (params: any) => {
    const url = '/inventories/create';
    return instance.post(url, params);
  },
  updateProductInventoryService: (params: any) => {
    const url = '/inventories/update';
    return instance.put(url, params);
  },
  listProductInventoryService: (params: any) => {
    const url = '/inventories';
    return instance.post(url, params);
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
  uploadImageCustomService: (params: any) => {
    const { data, config } = params;
    const url = '/images/upload';
    return instance.post(url, data, config);
  },
  listImageService: (params: any) => {
    let url = '/images';
    if (params) {
      url = `${url}?${queryString.stringify(params)}`;
    }
    return instance.get(url, params);
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

  //tag services
  listTagsService: () => {
    const url = '/tags';
    return instance.get(url);
  },
  createTagService: (params: any) => {
    const url = '/tags/create';
    return instance.post(url, params);
  },

  // brand services
  listBrandsService: () => {
    const url = '/brands';
    return instance.get(url);
  },
  createBrandService: (params: any) => {
    const url = '/brands/create';
    return instance.post(url, params);
  },

  //orders services
  updateOrderStatusService: (params: any) => {
    const url = '/orders/update/status';
    return instance.put(url, params);
  },
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

  //marketings services
  listMarketingsService: () => {
    const url = '/marketings';
    return instance.get(url);
  },
  createMarketingService: (params: any) => {
    const url = '/marketings/create';
    return instance.post(url, params);
  },

  //dropdown services
  listDropdownsService: (params: any) => {
    const url = '/dropdowns';
    return instance.post(url, params);
  },

  // posts services
  listPostsService: () => {
    const url = '/posts';
    return instance.get(url);
  },
  createPostService: (params: any) => {
    const url = '/posts/create';
    return instance.post(url, params);
  },
  deleteListPostsService: (params: any) => {
    const url = '/posts/remove';
    return instance.delete(url, { data: params });
  },
  updatePostService: (params: any) => {
    const url = '/posts/update';
    return instance.put(url, params);
  },
  updatePostManyService: (params: any) => {
    const url = '/posts/update-many';
    return instance.put(url, params);
  },

  //footer services
  updateFooterService: (params: any) => {
    const url = '/info/footer/update';
    return instance.put(url, params);
  },
  getListFooterService: () => {
    const url = '/info/footer';
    return instance.get(url);
  },
  updatePolicyService: (params: any) => {
    const url = '/info/policies/update';
    return instance.put(url, params);
  },
  listPoliciesService: () => {
    const url = '/info/policies';
    return instance.get(url);
  },

  //cart services
  addToCartService: (params: any) => {
    const url = '/cart/add';
    return instance.post(url, params);
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
