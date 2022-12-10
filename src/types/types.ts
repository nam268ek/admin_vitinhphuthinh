import { UploadFileStatus } from 'antd/es/upload/interface';
import { NAME_ACTION } from '../constants/const';

// header
export interface INavMenuDataTypes {
  id: number;
  title: string;
  href: string;
  class: string;
}

export interface IMonetaryUnitDataTypes {
  id: number;
  title: string;
  icon: string;
}

export interface ILanguageDataTypes {
  id: number;
  title: string;
  img: string;
}

export interface IActionDataTypes {
  id: number;
  href: string;
  sup: number;
  icon: JSX.Element;
  class: string;
  dropdownContent?: JSX.Element;
  func?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

// categories list
export interface ICategoriesListDataTypes {
  id: number;
  title: string;
  icon: JSX.Element;
  submenuTitle?: string;
  submenuTitle2?: string;
  submenu?: {
    id: number;
    title: string;
    category: string;
  }[];
}

// owl-carousel options
export interface IOwlCarouselOptions {
  margin: number;
  loop: boolean;
  dots: boolean;
  lazyLoad?: boolean;
  autoplay?: boolean;
  autoplayHoverPause?: boolean;
  responsive: {
    0: {
      items: number;
    };
    500: {
      items: number;
    };
    768: {
      items: number;
    };
    1000: {
      items: number;
    };
    1400: {
      items: number;
    };
  };
}

// owl-carousel options for about > awards
export interface IOwlCarouselOptionsAwards {
  margin: number;
  loop: boolean;
  dots: boolean;
  responsive: {
    0: {
      items: number;
    };
    300: {
      items: number;
    };
    500: {
      items: number;
    };
    768: {
      items: number;
    };
    1200: {
      items: number;
    };
  };
}

// home > ads
export interface IAdsData1 {
  id: number;
  img: string;
}

// home > advantages
export interface IAdvantagesDataTypes {
  id: number;
  icon: JSX.Element;
  title: string;
  paragraph: string;
}

// home > banner
export interface ISliderDataTypes {
  id: number;
  img: string;
}

export interface IBannerRightDataTypes {
  id: number;
  img: string;
}

// home > categories
export interface IButtonsAndLink {
  id: number;
  href: string;
  title: string;
}

// home > section-header
export interface ISectionHeaderProps {
  title: string;
}

// home > top categories
export interface ITopCategoriesData {
  id: number;
  title: string;
  img: string;
}

// home > download-app
export interface ISmallImages {
  id: number;
  img: string;
}

// social media
export interface ISocialMedia {
  id: number;
  href: string;
  icon: JSX.Element;
  class: string;
}

// react image-gallery
export interface IReactImgGalleryOptions {
  showPlayButton: boolean;
  showFullscreenButton: boolean;
  autoPlay: boolean;
}

export interface IReactImgGalleryimages {
  original: any;
  thumbnail: any;
}

// product-details > tab list
export interface ITabList {
  id: number;
  title: string;
  reviewCount?: number;
}

// about > team
export interface ITeam {
  id: number;
  img: string;
  name: string;
  position: string;
  twitter: string;
  facebook: string;
  linkedin: string;
}

// about > team bg img
export interface ITeamBgImgStyle {
  backgroundImage: string;
  backgroundSize: string;
  backgroundPosition: string;
  backgroundRepeat: string;
  height: string;
}

// about > awards
export interface IAwards {
  id: number;
  img: string;
  class: string;
}

export interface IProductProps {
  product: IProducts;
}

// shop > brands section
export interface IBrandsSection {
  id: number;
  img: string;
  link: string;
}

// shop > filter > brands
export interface IBrands {
  id: number;
  title: string;
  value: string;
}

// shop > pagination
export interface IPaginationProps {
  pages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

// contact items
export interface IContactItems {
  id: number;
  title: string;
  content: JSX.Element;
}

// footer bottom
export interface IPayment {
  id: number;
  img: string;
}

// footer links
export interface ILinks {
  id: number;
  title: string;
  links: {
    id: number;
    title: string;
    href: string;
  }[];
}

// rating
export interface IRatingProps {
  value: number;
  color?: string;
}

// shopping cart
export interface ICartProps {
  cart: any;
}

// product reducer
export interface IProductReducerState {
  products: IProducts[];
  searchedProducts: IProducts[];
}

// primary reducer
export interface IPrimaryReducerState {
  title: string;
  showSidebarCategories: boolean;
  showSidebarMenu: boolean;
  isLoading: boolean;
  showSearchArea: boolean;
  showOrHideDropdownCart: boolean;
  showSidebarFilter: boolean;
}
export interface IImageUpload {
  styleClassName?: string;
  maxNumberOfFiles?: number;
  multiple?: boolean;
  listFileUpdate?: any;
  status?: any;
  feature?: any;
  listImages?: any;
  isCropImg?: boolean;
}
export interface ISearchService {
  placeholder?: string;
  className?: string;
  listItem?: any;
  isDefault?: boolean;
  searchValue?: any;
}
export interface ISelectService {
  placeholder?: string;
  className?: string;
  defaultValue?: any;
  isCategory?: boolean;
  isBrand?: boolean;
  isStatus?: boolean;
  isDefault?: boolean;
  isPayment?: boolean;
  disabled?: boolean;
}
export interface IProtectedRoute {
  redirect: string;
  component?: JSX.Element;
  condition: boolean;
}
export interface INavBarMenu {
  isProtected: boolean;
}
export interface IModalBox {
  statusResponse: any;
}
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
  priceSale: number;
  status: boolean;
  updatedAt: any;
  quantity: number;
}
export interface DataTypeCustom extends DataTypeProduct {
  quantity: number;
}
export interface IProducts {
  id: string;
  status: boolean;
  name: string;
  price: number;
  tags: string[];
  images: string[];
  brand: string;
  category: string;
  specs: IProductSpesc[];
  sku: string;
  isNewProduct: boolean;
  description: string;
  productInformation: IProductInformation;
  priceSale?: number;
  quantity?: number;
  createdAt: string;
  updatedAt: string;
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
  productInformation?: IProductInformation;
}
export interface IProductInformation {
  images: string[];
  content: string;
}
export interface ISelectOption {
  options: ISelectOptionProps[];
  name: string;
  disabled?: boolean;
  className?: string;
  initialValue?: any;
  placeholder?: string;
  rules?: any[];
  validateTrigger?: any;
  onChange?: any;
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
}
export interface IProductState {
  action: NAME_ACTION;
  isChange: boolean;
  products: any[];
  loading: boolean;
  itemSelected: any[];
  keyProduct: string;
}
export interface IImageState {
  loading: boolean;
  images: IImage[];
  imageUploaded: IImage[];
  imageEditor: IImage[];
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
  brandName: string;
  logo?: IImage;
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
  name: string;
  status: string;
  images: any[];
  updatedAt: string;
}
