import { UploadFileStatus } from 'antd/es/upload/interface';
import { NAME_ACTION, UPLOAD_KEY } from '../constants/const';
import { Path } from '../components/Categories/interfaces/categories.interface';

export interface ISelectProps {
  defaultValue?: any;
  listItem?: any;
}
export interface IResData {
  status: string;
  code: number;
  data: any;
  message: string;
}
export interface IAuth {
  email: string;
  password: string;
  image?: string;
}
export interface DataTypeProduct {
  key: React.Key;
  id: string;
  name: string;
  price: number;
  priceSale: number;
  status: 'Y' | 'N';
  updatedAt: string;
  quantity: number;
  category: any;
  brand: IBrand;
  isFeatured?: string;
}

export interface DataTypeCategory {
  key: React.Key;
  id: string;
  name: string;
  slug: string;
  path: Path[];
  category: string;
  updatedAt: string;
}
export interface DataTypeCustom extends DataTypeProduct {
  quantity: number;
}
export interface IProducts {
  id: string;
  status: 'Y' | 'N';
  name: string;
  price: number;
  tags: string[];
  images: string[];
  brand: string;
  category: string;
  sku: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  specs?: IProductSpesc[];
  productInformation?: string;
  priceSale?: number;
  quantity?: number;
  isFeatured?: string;
}
export interface IProductSpesc {
  k: string;
  v: string | number;
  u: string | number;
}
export interface IPropsProducts {
  products: IProducts[];
}
export interface IBodyCreateProduct {
  category: string;
  brand: string;
  name: string;
  price: number;
  images: string[];
  tags: string[];
  description: string;
  status: boolean;
  isNewProduct: boolean;
  sku: string;
  specs?: IProductSpesc[];
  productInformation?: string;
}
export interface ISelectOption {
  name: string;
  options?: ISelectOptionProps[];
  handleOnChange?: (value: any, name: string) => void;
  disabled?: boolean;
  className?: string;
  initialValue?: any;
  placeholder?: string;
  rules?: any[];
  validateTrigger?: any;
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight' | 'topLeft';
}
export interface ISelectOptionProps {
  label: string;
  value: string;
}
export interface AuthState {
  isLogin: boolean;
  loading: boolean;
  user: object | undefined;
}
export interface IAuthToken {
  logoutAction: () => void;
}
export interface IToken {
  id: string;
  email: string;
  exp: number;
  iat: string;
}
export interface IImage {
  id: string;
  keyId: string;
  name: string;
  status: UploadFileStatus;
  url: string;
  thumbUrl: string;
  size: number;
  updatedAt: string;
  disabled?: boolean;
}
export interface IProductState {
  action: NAME_ACTION;
  isChange: boolean;
  products: any[];
  loading: boolean;
  itemSelected: any[];
  keyProduct: string;
  errors: Record<string, string>;
}
export interface IImageState {
  loading: boolean;
  images: IImage[];
  imageUploaded: IImage[];
  imageEditor: IImage[];
  totalPages: number;
}
export interface TagState {
  loading: boolean;
  tags: ITag[];
}
export interface ITag {
  id: string;
  name: string;
}
export interface BrandState {
  loading: boolean;
  brands: IBrand[];
}
export interface IBrand {
  id: string;
  name: string;
  logo?: IImage;
  createdAt?: string;
  updatedAt?: string;
}
export enum SPECS {
  model = 'model',
  cpu = 'cpu',
  memory = 'memory',
  ram = 'ram',
  hardDrive = 'hardDrive',
  monitor = 'monitor',
  vgaCard = 'vgaCard',
  network = 'network',
  extend = 'extend',
  battery = 'battery',
  os = 'os',
  weight = 'weight',
  color = 'color',
  warranty = 'warranty',
  nsx = 'nsx',
  inCountry = 'inCountry',
  timeWarranty = 'timeWarranty',
  locationWarranty = 'locationWarranty',
  categoryPrinter = 'categoryPrinter',
  function = 'function',
  pixel = 'pixel',
  speedPrintBlackWhite = 'speedPrintBlackWhite',
  speedPrintColor = 'speedPrintColor',
  autoPrint = 'autoPrint',
  categoryInk = 'categoryInk',
  paperSize = 'paperSize',
  paperTray = 'paperTray',
  usbConnect = 'usbConnect',
  internetConnect = 'internetConnect',
  printToMobile = 'printToMobile',
  sizeBox = 'sizeBox',
  weigthBox = 'weigthBox',
}
export interface OrderState {
  loading: boolean;
  action: string;
  orders: IOrder[];
  cartItem: any[];
  carts: any[];
}
export interface IOrder {
  id: string;
  customer: ICustomer;
  orderedItem: ICart;
  billingAddress: string;
  deliveryCharges: number;
  discount: number;
  isGift: boolean;
  orderDate: string;
  orderNumber: string;
  orderStatus: 'done' | 'pending' | 'cancel';
  paymentMethod: 'cash' | 'debit_card' | 'credit_card' | 'electronic_bank_transfer' | 'installment';
  orderNotes: string;
  totalOrderValue: number;
  subTotalOrderValue: number;
  orderQty: number;
}
export interface ICustomer {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  email: string;
}
export interface ICart {
  id: string;
  customer: ICustomer;
  products: CartItem[];
  state: 'active' | 'completed' | 'expired';
  modifiedOn: string;
  createdAt: string;
  updatedAt: string;
}
export interface CartItem {
  productId: string;
  quantity: number;
}
export interface DataTypeOrder {
  key: React.Key;
  id: string;
  orderQty: number;
  orderDate: string;
  orderStatus: string;
  totalOrderValue: number;
  customer: ICustomer;
}
export interface PrimaryState {
  loading: boolean;
  dropdowns: IDropdown[];
}
export interface IDropdown {
  name: string;
  dropdowns: ISelectOptionProps[];
}
export interface MarketingState {
  action: NAME_ACTION;
  loading: boolean;
  marketings: any[];
}
export interface FooterState {
  action: NAME_ACTION;
  loading: boolean;
  footers: any[];
  policies: any[];
}
export interface DataTypeMarketing {
  key: React.Key;
  id: string;
  name: string;
  status: boolean;
  startDate: string;
  endDate: string;
  quantitySelected: number;
}
export interface PostState {
  action: NAME_ACTION;
  loading: boolean;
  posts: any[];
}
export interface DataTypePost {
  key: React.Key;
  id: string;
  namePost: string;
  status: string;
  images: IImage[] | IImage;
  updatedAt: string;
}
export interface ImageUploadModalProps {
  name: string;
  maxFiles?: number;
  onChange: (data: any, key: string, action: 'upload' | 'remove') => void;
  keyUpload?: UPLOAD_KEY;
}
