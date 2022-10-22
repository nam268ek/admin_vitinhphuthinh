/* eslint-disable curly */
import decodeJwt from 'jwt-decode';
import { instance } from '../api/AxiosClient';
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

export const verifyRequestToken = async (): Promise<string | undefined> => {
  const token = await getRefreshToken();
  if (token) {
    const isVerify = await instance.post('auths/verify', { token });
    if (isVerify.data.exp > Date.now()) {
      const response = await instance.post(
        'auths/refresh',
        { refreshToken: token },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const { accesstoken, refreshtoken } = response.headers;
      localStorage.setItem('token', accesstoken);
      localStorage.setItem('refreshtoken', refreshtoken);

      return accesstoken;
    }
  }
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

    resolve(token);
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

    resolve(token);
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
