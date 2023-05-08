export const MAX_LENGTH_TEXT_AREA = 500;
export const MAX_LENGTH_TEXT = 500;
export const DURATION_TIMEOUT_SECONDS = 5;
export const MAX_QTY = 500;
export const PER_PAGE = 24;
export enum NAME_ACTION {
  //category
  CREATE_CATEGORY = 'CREATE_CATEGORY',
  DEFAULT_CATEGORY = 'CREATE_CATEGORY',
  REMOVE_CATEGORY = 'REMOVE_CATEGORY',
  UPDATE_CATEGORY = 'UPDATE_CATEGORY',
  GET_CATEGORY = 'GET_CATEGORY',

  //product
  CREATE_PRODUCT = 'CREATE_PRODUCT',
  DEFAULT_PRODUCT = 'CREATE_PRODUCT',
  REMOVE_PRODUCT = 'REMOVE_PRODUCT',
  UPDATE_PRODUCT = 'UPDATE_PRODUCT',
  GET_PRODUCT = 'GET_PRODUCT',
  CREATE_PRODUCT_INVENTORY = 'CREATE_PRODUCT_INVENTORY',
  UPDATE_PRODUCT_INVENTORY = 'UPDATE_PRODUCT_INVENTORY',
  GET_PRODUCT_INVENTORY = 'GET_PRODUCT_INVENTORY',

  //order
  CREATE_ORDER = 'CREATE_ORDER',
  DEFAULT_ORDER = 'CREATE_ORDER',
  REMOVE_ORDER = 'REMOVE_ORDER',
  UPDATE_ORDER = 'UPDATE_ORDER',
  GET_ORDER = 'GET_ORDER',
  UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS',
  ADD_TO_CART = 'ADD_TO_CART',

  //image
  CREATE_IMAGE = 'CREATE_IMAGE',
  CREATE_IMAGE_CUSTOM = 'CREATE_IMAGE_CUSTOM',
  DEFAULT_IMAGE = 'CREATE_IMAGE',
  REMOVE_IMAGE = 'REMOVE_IMAGE',
  UPDATE_IMAGE = 'UPDATE_IMAGE',
  GET_IMAGE = 'GET_IMAGE',
  UPLOAD_IMAGE_EDITOR = 'UPLOAD_IMAGE_EDITOR',

  //tag
  CREATE_TAG = 'CREATE_TAG',
  DEFAULT_TAG = 'CREATE_TAG',
  REMOVE_TAG = 'REMOVE_TAG',
  UPDATE_TAG = 'UPDATE_TAG',
  GET_TAG = 'GET_TAG',

  //brand
  CREATE_BRAND = 'CREATE_BRAND',
  DEFAULT_BRAND = 'CREATE_BRAND',
  REMOVE_BRAND = 'REMOVE_BRAND',
  UPDATE_BRAND = 'UPDATE_BRAND',
  GET_BRAND = 'GET_BRAND',

  //dropdown
  GET_DROPDOWN_LIST = 'GET_DROPDOWN_LIST',

  //marketings
  CREATE_MARKETINGS = 'CREATE_MARKETINGS',
  UPDATE_MARKETINGS = 'UPDATE_MARKETINGS',
  GET_MARKETINGS = 'GET_MARKETINGS',

  //post
  DEFAULT_POST = 'DEFAULT_POST',
  CREATE_POST = 'CREATE_POST',
  UPDATE_POST = 'UPDATE_POST',
  REMOVE_POST = 'REMOVE_POST',
  GET_LIST_POSTS = 'GET_LIST_POSTS',
  FILTER_POST = 'FILTER_POST',

  //footer
  DEFAULT_FOOTER = 'DEFAULT_FOOTER',
  CREATE_FOOTER = 'CREATE_FOOTER',
  UPDATE_FOOTER = 'UPDATE_FOOTER',
  REMOVE_FOOTER = 'REMOVE_FOOTER',
  GET_LIST_FOOTERS = 'GET_LIST_FOOTERS',

  //policy
  CREATE_POLICY = 'CREATE_POLICY',
  UPDATE_POLICY = 'UPDATE_POLICY',
  REMOVE_POLICY = 'REMOVE_POLICY',
  GET_LIST_POLICY = 'GET_LIST_POLICY',
}
export enum ORDER_STATUS {
  CREATE = 'create',
  PENDING = 'pending',
  CANCEL = 'cancel',
  DONE = 'done',
}
export enum NAME_DROPDOWNS {
  PAYMENT_METHOD = 'payment-method',
  ORDER_STATUS_S = 'order-status',
  NUMBER_PRODUCT_MARKETINGS = 'number-product-marketings',
  POST_STATUS_OPTIONS = 'post-status-options',
  CATEGORY_PRODUCT = 'category-product',
}
export const LIST_NAME_DROPDOWN_SERVICE = [
  'payment-method',
  'order-status',
  'number-product-marketings',
  'post-status-options',
  'category-product',
];
export enum UPLOAD_KEY {
  SLIDESHOW = 'slideshow',
  IMAGE_MIDDLE = 'image_middle',
  IMAGE_BOTTOMX1 = 'image_bottomx1',
  IMAGE_BOTTOMX2 = 'image_bottomx2',
  IMAGE_PRODUCT = 'image_product',
  IMAGE_PRODUCT_INFO = 'image_product_info',
  IMAGE_BLOG = 'image_blog',
}
export enum KEY_INFORMATION {
  FOOTER = 'footer',
  POLICY = 'policy',
}
export enum CATEGORY_KEY {
  LAPTOP = 'laptop',
  PRINTER = 'may-in',
  ACCESSORY = 'phu-kien',
  CAMERA = 'camera',
  NETWORK_DEVICE = 'thiet-bi-mang',
  PC_LAPTOP_ACCESSORIES = 'phu-kien-may-tinh',
  PRINTER_ACCESSORIES = 'phu-kien-may-in',
  STORAGE_DEVICE = 'thiet-bi-luu-tru',
}
export const BASE_URL = 'https://www.vitinhphuthinh.com';
