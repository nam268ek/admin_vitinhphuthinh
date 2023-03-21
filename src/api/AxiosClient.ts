import axios from 'axios';
import queryString from 'query-string';
import { getToken, removeTokenLocalStorage, getRefreshToken } from '../utils/verifyToken';

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
  paramsSerializer: {
    serialize: (params) => queryString.stringify(params, { arrayFormat: 'comma' }),
  },
});

instance.interceptors.request.use(
  async (config: any) => {
    //add token to header
    const token = await getToken();
    if (token) {
      //add token to header
      // eslint-disable-next-line quotes
      config.headers['Authorization'] = `Bearer ${token}`;
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
    const { config, response } = error;
    const NO_RETRY_HEADER = 'x-no-retry';

    const isValid =
      config.url !== '/auths/refresh' &&
      config.url !== '/auths/verify' &&
      config.url !== '/auths' &&
      response &&
      !axios.isCancel(error) &&
      axios.isAxiosError(error) &&
      response.status === 401;

    if (isValid) {
      if (config.headers && config.headers[NO_RETRY_HEADER]) {
        removeTokenLocalStorage();
        return Promise.reject(error);
      }
      // skip refresh token request, retry attempts to avoid infinite loops
      config.headers[NO_RETRY_HEADER] = 'true';

      const newToken = await getRefreshToken();
      config.headers['Authorization'] = 'Bearer ' + newToken;
      return await instance(config);
    }

    return Promise.reject(error);
  },
);
