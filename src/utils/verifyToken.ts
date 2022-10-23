/* eslint-disable curly */
import decodeJwt from 'jwt-decode';
import { IToken } from '../types/types';

export const verify = (token: string): boolean => {
  if (token.length > 0) {
    const decoded: IToken = decodeJwt(token);
    console.log(decoded);
    if (decoded.exp * 1000 < Date.now()) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};

export const getUserToken = async (): Promise<IToken> => {
  const token = await getToken();
  return decodeJwt(token);
};

export const getToken = async (): Promise<string> => {
  const token = localStorage.getItem('token');
  //No loged in user
  if (token === null) {
    return '';
  }

  //Loged in user
  return new Promise((resolve, reject) => {
    const waitTimer = setTimeout(() => {
      reject(false);
    }, 5000);

    // eslint-disable-next-line quotes
    resolve(token.replaceAll(`"`, ''));
    clearTimeout(waitTimer);
  });
};

export const getRefreshToken = async (): Promise<string> => {
  const token = localStorage.getItem('refreshtoken');
  //No loged in user
  if (token === null) {
    return '';
  }

  //Loged in user
  return new Promise((resolve, reject) => {
    const waitTimer = setTimeout(() => {
      reject(false);
    }, 5000);

    // eslint-disable-next-line quotes
    resolve(token.replaceAll(`"`, ''));
    clearTimeout(waitTimer);
  });
};

export const removeTokenLocalStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshtoken');
  console.log('Token removed');
};

export const handleAuth = async (callback?: () => void): Promise<boolean> => {
  const token = await getToken();
  const refreshToken = await getRefreshToken();

  const isToken = verify(token);
  if (!isToken) {
    const isRefreshToken = verify(refreshToken);

    if (!isRefreshToken && callback) {
      callback();
      return false;
    } else if (!isRefreshToken) return false;
  }
  return true;
};
