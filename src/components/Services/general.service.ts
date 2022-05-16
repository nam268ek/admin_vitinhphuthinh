import { Modal } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';

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
    link: '',
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
// {
//   id: 1,
//   title: "Laptop Dell",
//   icon: <MdOutlineLaptopMac />,
//   submenuTitle: "Sản phẩm Dell",
//   submenu: [
//     { id: 1, title: "Dell Inspiron", category: "dellProducts" },
//     { id: 2, title: "Dell Latitude", category: "dellProducts" },
//     { id: 3, title: "Dell Alienware", category: "dellProducts" },
//     { id: 4, title: "Dell XPS", category: "dellProducts" },
//     { id: 5, title: "Dell Vostro", category: "dellProducts" },
//   ],
// },

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
