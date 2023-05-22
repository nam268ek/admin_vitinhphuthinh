/* eslint-disable import/no-unresolved */
/* eslint-disable curly */
import { clsx, type ClassValue } from 'clsx';
import { isArray } from 'lodash';
import { ERROR_VALIDATE } from 'src/types/types';
import { twMerge } from 'tailwind-merge';
interface ThumbProps {
  width: number;
  height: number;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export const getThumbUrl = (url: string, options?: ThumbProps): string => {
  let tranformation = 'c_thumb,h_150,w_150';
  const { width, height } = options as ThumbProps;
  if (width && height) tranformation = `c_thumb,h_${height},w_${width}`;

  const urlSplit = url?.split('/');
  urlSplit?.splice(urlSplit?.indexOf('upload') + 1, 0, tranformation);
  return urlSplit?.join('/');
};

export const overideError = (data: any) => {
  const { error, message } = data;

  if (error === ERROR_VALIDATE.VALIDATE_DATA_ERROR) return data;

  const newMsg = isArray(message)
    ? message.reduce((item: any, msg: any) => {
        const name = msg.split(' ')[0];
        item[name] = msg;
        return item;
      }, {})
    : message;

  return { ...data, message: newMsg };
};
