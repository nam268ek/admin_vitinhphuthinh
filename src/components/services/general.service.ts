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
    return messageAntd.error({
      content: data.message,
      key,
      className: 'error-message',
      duration: DURATION_TIMEOUT_SECONDS,
    });
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
  return list?.map((file) => {
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

export const convertViToEn = (str: string) => {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư

  str = str.replace(/[^\w\s-]/g, '');
  str = str.replace(/[\s_-]+/g, '-');
  str = str.replace(/^-+|-+$/g, '');

  return str;
};
