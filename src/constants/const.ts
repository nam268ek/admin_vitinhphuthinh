export const MAX_LENGTH_TEXT_AREA = 500;
export const MAX_LENGTH_TEXT = 500;
export const DURATION_TIMEOUT_SECONDS = 5;
export enum NAME_ACTION {
  //category
  CREATE_CATEGORY = "CREATE_CATEGORY",
  REMOVE_CATEGORY = "REMOVE_CATEGORY",
  GET_CATEGORY = "GET_CATEGORY",

  //product
  CREATE_PRODUCT = "CREATE_PRODUCT",
  REMOVE_PRODUCT = "REMOVE_PRODUCT",
  GET_PRODUCT = "GET_PRODUCT",

  //order
  CREATE_ORDER = "CREATE_ORDER",
  REMOVE_ORDER = "REMOVE_ORDER",
  GET_ORDER = "GET_ORDER",

  //image
  CREATE_IMAGE = "CREATE_IMAGE",
  REMOVE_IMAGE = "REMOVE_IMAGE",
  GET_IMAGE = "GET_IMAGE",
}
export interface IError {
  statusCode: number;
  message: string[];
  error: string;
}
