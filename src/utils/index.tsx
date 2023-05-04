/* eslint-disable curly */
import { clsx, type ClassValue } from 'clsx';
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
