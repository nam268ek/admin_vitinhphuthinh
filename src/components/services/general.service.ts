/* eslint-disable prefer-const */
import { message as messageAntd, UploadFile } from 'antd';
import { DURATION_TIMEOUT_SECONDS } from '../../constants/const';
import { IAuth, IBodyCreateProduct, IImage } from '../../types/types';

// variables
export let previousData: any = {};
// --

//body api
export const originalRegister: IAuth = {
  email: '',
  password: '',
  image: '',
};

export const originalLogin: IAuth = {
  email: '',
  password: '',
};

export const bodyCreateProduct: IBodyCreateProduct = {
  category: '',
  brand: '',
  name: '',
  price: 0,
  images: [],
  tags: [],
  description: '',
  status: false,
  isNewProduct: false,
  sku: '',
  specs: [],
  productInformation: {
    images: [],
    content: '',
  },
};

export const originalOrder: any = {
  role: 'admin',
  action: '',
  data: {
    stord: '',
    orderid: '',
    customer: {
      name: '',
      phone: '',
      email: '',
      address: '',
      note: '',
    },
    priord: {
      subtotal: 0,
      discount: 0,
      feeship: 0,
      total: 0,
      note: '',
      payment: '',
    },
    listprod: [],
  },
};

export const originalImage: any = {
  role: 'admin',
  action: '',
  data: {},
};

export const originalListDropDown: any = {
  role: 'admin',
  action: '',
  data: {
    'list-brand': [],
  },
};

export const originalListImgLayout: any = {
  role: 'admin',
  action: '',
  data: {
    layout: {
      b1: [],
      b2: [],
      b3: [],
      b4: [],
      b5: [],
    },
  },
};

export const originalContentFooter: any = {
  role: 'admin',
  action: '',
  data: {
    addrshop: '',
    email: '',
    fblink: '',
    hotline: '',
    zalolink: '',
  },
};

export const originalContentFooterEditor: any = {
  role: 'admin',
  action: '',
  data: {
    polship: '',
    polreturn: '',
    polwan: '',
    polinsta: '',
    polquality: '',
    poluse: '',
    polbuy: '',
    polprot: '',
  },
};
//end body api
export const openMessage = (data?: any, key?: string) => {
  if (data && data.statusCode !== 200) {
    return messageAntd.error({ content: data.message, key, duration: DURATION_TIMEOUT_SECONDS });
  }
  return messageAntd.success({ content: 'Successfully', key, duration: DURATION_TIMEOUT_SECONDS });
};

export const formatMoney = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

export const convertListDropdown = (list: any[]) => {
  return (
    list.map((item: any) => {
      return {
        label: item.name,
        value: item.id,
      };
    }) || []
  );
};
export const convertTypeUploadImageList = (list: IImage[]): UploadFile[] => {
  return list.map((file) => {
    const { keyId, name, status, url, thumbUrl, updatedAt } = file;
    return {
      uid: keyId,
      name,
      status,
      lastModifiedDate: new Date(updatedAt),
      thumbUrl,
      url,
    };
  });
};
export const unique = (arr: Array<any>) => {
  const uniqueIds = new Set();
  return arr.filter((element) => {
    const isDuplicate = uniqueIds.has(element.value);
    uniqueIds.add(element.value);
    if (!isDuplicate) {
      return true;
    }
    return false;
  });
};
