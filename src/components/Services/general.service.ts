import { Modal } from "antd";

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
    img: "",
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
    layout1: [
      {
        b1: [],
        b2: [],
        b3: [],
      },
    ],
    layout2: [
      {
        b1: [],
        b2: [],
      },
    ],
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
      created_at: item.created_at ? item.created_at : "",
    };
  });
};

export const openDialogError = (statusResponse: any) => {
  if (statusResponse.length > 0 && statusResponse[0].status === "success") {
    Modal.success({
      title: "Thông báo",
      content: `${statusResponse[0].message}`,
      okText: "Ok",
    });
  }
  if (statusResponse.length > 0 && statusResponse[0].status === "error") {
    Modal.error({
      title: "Thông báo",
      content: `[${statusResponse[0].code}] ${statusResponse[0].message}`,
      okText: "Ok",
    });
  }
};

export const formatMoney = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

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
