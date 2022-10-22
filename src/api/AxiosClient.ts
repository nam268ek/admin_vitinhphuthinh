/* eslint-disable no-useless-catch */
import axios from 'axios';
import queryString from 'query-string';
import { getToken, removeTokenLocalStorage, verifyRequestToken } from '../utils/verifyToken';

//config .env for production
const ROOT =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;

//config axios client
export const instance = axios.create({
  baseURL: ROOT,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params: any) => queryString.stringify(params),
});

instance.interceptors.request.use(
  async (config: any) => {
    //add token to header
    const token = await getToken();
    if (token) {
      //add token to header
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['X-Api-Key'] = process.env.REACT_APP_API_KEY;
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    const { accesstoken, refreshtoken } = response.headers;
    if (accesstoken && refreshtoken) {
      localStorage.setItem('token', JSON.stringify(accesstoken));
      localStorage.setItem('refreshtoken', JSON.stringify(refreshtoken));
    }
    if (response && response.data) {
      return response.data;
    }
    return response;
  },

  async (error) => {
    const { config: originalRequest, response } = error;
    // skip refresh token request, retry attempts to avoid infinite loops
    const isValid =
      originalRequest.url !== '/auths/refresh' &&
      originalRequest.url !== '/auths/verify' &&
      originalRequest.url !== '/auths' &&
      !originalRequest._retry &&
      response &&
      response.status === 401;

    try {
      if (isValid) {
        const newToken = await verifyRequestToken();
        originalRequest._retry = true;
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return await instance.request(originalRequest);
      }
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        removeTokenLocalStorage();
      }
      return Promise.reject(err);
    }
    return Promise.reject(error);
  },
);
