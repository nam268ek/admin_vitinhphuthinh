import { message as messageAntd } from 'antd';
import { DURATION_TIMEOUT_SECONDS } from '../../constants/const';
import { IAuth, IBodyCreateProduct } from '../../types/types';

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

// export const openMessage = (action: any, isSuccess?: boolean) => {
//   if (action.payload) {
//     const { message } = action.payload;
//     if (isSuccess) {
//       messageAntd.success({ content: message, duration: DURATION_TIMEOUT_SECONDS });
//       return;
//     }
//     if (typeof message === 'string') {
//       messageAntd.error({ content: message, duration: DURATION_TIMEOUT_SECONDS });
//       return;
//     }
//     for (const item of message) {
//       messageAntd.error({ content: item, duration: DURATION_TIMEOUT_SECONDS });
//     }
//     return;
//   }
//   messageAntd.error({ content: action.error.message, duration: DURATION_TIMEOUT_SECONDS });
// };

export const openMessage = (data?: any) => {
  if (data && data.statusCode !== 200) {
    return messageAntd.error({ content: data.message, duration: DURATION_TIMEOUT_SECONDS });
  }
  return messageAntd.success({ content: 'Successfully', duration: DURATION_TIMEOUT_SECONDS });
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
