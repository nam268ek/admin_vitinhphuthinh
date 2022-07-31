import { Modal } from "antd";
import { isEmpty } from "lodash";
import { IResData } from "../../types/types";

export const originalRegister: any = {
  email: "",
  password: "",
  avatar: "",
};

export const originalLogin: any = {
  email: "",
  password: "",
};

export const originalProduct: any = {
  role: "admin",
  action: "",
  data: {
    status: true,
    img: [],
    title: "",
    contsum: "",
    price: 0,
    pricesale: 0,
    label: "",
    brand: "",
    category: "",
    hasDiscount: false,
    isNew: false,
    count: 1,
    sku: "",
    isInCart: false,
    previousPrice: 0,
    contentEditor: "",
    contentInfo: {
      model: "",
      cpu: "",
      ram: "",
      harddrive: "",
      monitor: "",
      vgacard: "",
      network: "",
      extend: "",
      battery: "",
      os: "",
      weight: "",
      color: "",
      warranty: "",
    },
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

export const openDialogError = (res: IResData, isShow?: string) => {
  if (res && !isEmpty(res)) {
    switch (res.code) {
      case 200:
        if (isShow === "showModel") {
          Modal.success({
            title: "Thông báo",
            content: `${res.message}`,
            okText: "Ok",
          });
        }
        break;
      case 400:
        Modal.error({
          title: "Thông báo",
          content: `${res.message}`,
          okText: "Ok",
        });
        break;
      case 403:
      case 401:
        Modal.error({
          title: "Thông báo",
          content: `Authorization failed`,
          okText: "Ok",
        });
        if (res.data && !isEmpty(res.data) && res.data.urlRedirect) {
          localStorage.removeItem("persist:root");
          localStorage.removeItem("refreshtokenvtpt");
          localStorage.removeItem("tokenvtpt");
          setTimeout(() => {
            window.location.href = res.data.urlRedirect;
          }, 2000);
        }
        break;
      case 402:
        Modal.error({
          title: "Thông báo",
          content: `Request failed`,
          okText: "Ok",
        });
        break;
      // case 403:
      //   Modal.error({
      //     title: "Thông báo",
      //     content: `Authorization failed`,
      //     okText: "Ok",
      //   });
      //   break;
      case 404:
        Modal.error({
          title: "Thông báo",
          content: `Not Found`,
          okText: "Ok",
        });
        break;
      case 500:
        Modal.error({
          title: "Thông báo",
          content: `${res.message}`,
          okText: "Ok",
        });
        break;
    }
  } else {
    Modal.error({
      title: "Thông báo",
      content: `Invalid error message`,
      okText: "Ok",
    });
  }
};

export const formatMoney = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export let previousData: any = [];

export const removePropertySpecificData = (data: any) => {
  if(data.hasOwnProperty("updatedAt")) {
    delete data.updatedAt;
  }
  if(data.hasOwnProperty("created_at")) {
    delete data.created_at;
  }
  if(data.hasOwnProperty("__v")) {
    delete data.__v;
  }
  return data;
};
// const openDialogConfirm = () => {
//   return Modal.confirm({
//     title: "Do you want to delete these items?",
//     icon: <ExclamationCircleOutlined />,
//     content: "When clicked the OK button, this dialog will be closed after 1 second",

//     onOk() {
//       return new Promise((resolve, reject) => {
//         setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
//       }).catch(() => console.log("Oops errors!"));
//     },

//     onCancel() {},
//   });
// }
