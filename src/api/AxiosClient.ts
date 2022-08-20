import axios from "axios";
import queryString from "query-string";
import { openDialogError } from "../components/Services/general.service";
import ValidateToken from "./authClient";
import store from "../components/redux/store/store";
import { setLogout } from "../components/redux/Slices/LoginSlice";
import { history } from "../utils/history";
//config .env for production
const apiUrl = process.env.NODE_ENV === "production" ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;

//config axios client
const axiosClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params: any) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: any) => {
  //add token to header
  const token = await ValidateToken.getToken();
  if (token) {
    //add token to header
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  async (res: any) => {
    if (res && res.data) {
      return res.data;
    }
    return res;
  },
  async (err: any) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 403 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await axiosClient.post("/auth/refresh", {
            refreshToken: ValidateToken.handleRefreshToken(),
          });
          ValidateToken.updateTokenLocalStorage(rs);
          //config new token
          const token = await ValidateToken.getToken();
          if (token) {
            originalConfig.headers.Authorization = `Bearer ${token}`;
          }
          return axiosClient(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
      if (err.response.data.data.urlRedirect === "/login") {
        // window.location.href = "/login";
        // openDialogError(err.response.data, true);
        ValidateToken.removeTokenLocalStorage();
        history.push("/login");
      }
    }
    if (err.message === "Network Error") {
      openDialogError({ status: "error", code: 1, data: {}, message: "" });
    }
    return Promise.reject(err);
  }
);

export default axiosClient;
