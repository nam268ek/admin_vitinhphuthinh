import { message as messageAntd } from "antd";
import { DURATION_TIMEOUT_SECONDS } from "../../constants/const";

export const originalRegister: any = {
  email: "",
  password: "",
  avatar: "",
};

export const originalLogin: any = {
  email: "",
  password: "",
};

export const bodyCreateProduct: any = {
  category: "",
  brand: "",
  name: "",
  price: 0,
  images: [],
  tags: [],
  description: "",
  status: false,
  isNewProduct: false,
  sku: "",
  specs: [],
  productInformation: {
    images: [],
    content: "",
  },
};

export const originalCategory: any = {
  role: "admin",
  action: "",
  data: {
    title: "",
    icon: "",
    index: "",
    link: "",
    submenuTitle: "",
    submenu: [
      {
        id: "",
        title: "",
        category: "",
      },
    ],
  },
};

export const originalOrder: any = {
  role: "admin",
  action: "",
  data: {
    stord: "",
    orderid: "",
    customer: {
      name: "",
      phone: "",
      email: "",
      address: "",
      note: "",
    },
    priord: {
      subtotal: 0,
      discount: 0,
      feeship: 0,
      total: 0,
      note: "",
      payment: "",
    },
    listprod: [],
  },
};

export const originalImage: any = {
  role: "admin",
  action: "",
  data: {},
};

export const originalListDropDown: any = {
  role: "admin",
  action: "",
  data: {
    "list-brand": [],
  },
};

export const originalListImgLayout: any = {
  role: "admin",
  action: "",
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
  role: "admin",
  action: "",
  data: {
    addrshop: "",
    email: "",
    fblink: "",
    hotline: "",
    zalolink: "",
  },
};

export const originalContentFooterEditor: any = {
  role: "admin",
  action: "",
  data: {
    polship: "",
    polreturn: "",
    polwan: "",
    polinsta: "",
    polquality: "",
    poluse: "",
    polbuy: "",
    polprot: "",
  },
};

export const convertListCategory = (list: any[]) => {
  return list.map((item: any, index: number) => {
    return {
      id: item._id,
      key: index,
      index: item.index,
      category: item.title,
      link: item.link,
      createdAt: item.createdAt ? item.createdAt : "",
    };
  });
};

export const openMessage = (action: any, isSuccess?: boolean) => {
  if (action.payload) {
    const { message } = action.payload;
    if (isSuccess) {
      messageAntd.success({ content: message, duration: DURATION_TIMEOUT_SECONDS });
      return;
    }
    if (typeof message === "string") {
      messageAntd.error({ content: message, duration: DURATION_TIMEOUT_SECONDS });
      return;
    }
    for (const item of message) {
      messageAntd.error({ content: item, duration: DURATION_TIMEOUT_SECONDS });
    }
    return;
  }
  messageAntd.error({ content: action.error.message, duration: DURATION_TIMEOUT_SECONDS });
};

export const formatMoney = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export let previousData: any = [];
