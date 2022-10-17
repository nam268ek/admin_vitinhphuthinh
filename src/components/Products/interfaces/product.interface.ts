export interface DataTypeProduct {
  key: React.Key;
  id: string;
  name: string;
  price: number;
  status: boolean;
  updatedAt: any;
}
export interface IProducts {
  id: string;
  status: boolean;
  name: string;
  price: number;
  tags: string;
  images: any;
  brand: string;
  category: string;
  specs: IProductSpesc;
  sku: string;
  isNew: boolean;
  description: string;
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
  specs: IProductSpesc[];
  productInformation: IProductInformation;
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
  initialValue?: string;
}
export interface ISelectOptionProps {
  label: string;
  value: string;
}
