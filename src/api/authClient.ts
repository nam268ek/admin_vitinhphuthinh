import { isEmpty } from "lodash";
import jwt_decode from "jwt-decode";

const getToken = async () => {
  if (localStorage.hasOwnProperty("tokenvtpt")) {
    const token = JSON.parse(localStorage.getItem("tokenvtpt") || "");
    //No loged in user
    if (token === "") return false;

    //Loged in user
    return new Promise((resolve, reject) => {
      const waitTimer = setTimeout(() => {
        reject(false);
        console.log("Token timeout");
      }, 5000);

      resolve(token);
      clearTimeout(waitTimer);
    });
  } else return false;
};

const getTokenRefresh = async () => {
  if (localStorage.hasOwnProperty("refreshtokenvtpt")) {
    const token = JSON.parse(localStorage.getItem("refreshtokenvtpt") || "");
    //No loged in user
    if (token === "") return false;

    //Loged in user
    return new Promise((resolve, reject) => {
      const waitTimer = setTimeout(() => {
        reject(false);
        console.log("Token timeout");
      }, 5000);

      resolve(token);
      clearTimeout(waitTimer);
    });
  } else return false;
};

const updateTokenLocalStorage = async (res: any) => {
  // const data: any = await new Promise((resolve, reject) => {
  //   if (res.code !== 200) reject(res.messageError);
  //   resolve(res.data);
  // });
  if (res.data && !isEmpty(res.data)) {
    const { token, refreshToken } = res.data;
    localStorage.setItem("tokenvtpt", JSON.stringify(token));
    localStorage.setItem("refreshtokenvtpt", JSON.stringify(refreshToken));
  }
};

const removeTokenLocalStorage = () => {
  localStorage.removeItem("persist:root");
  localStorage.removeItem("refreshtokenvtpt");
  localStorage.removeItem("tokenvtpt");
};

const checkAuthorizationToken = async () => {
  const token: any = await ValidateToken.getTokenRefresh();
  if (!token) return false;
  if (token) {
    const decoded: any = jwt_decode(token);
    if (decoded.exp * 1000 < Date.now()) {
      return false;
    }
  }
  return true;
};

const handleRefreshToken = () => {
  const refreshToken = JSON.parse(localStorage.getItem("refreshtokenvtpt") || "");
  return refreshToken;
};

const ValidateToken = {
  getToken,
  getTokenRefresh,
  handleRefreshToken,
  updateTokenLocalStorage,
  removeTokenLocalStorage,
  checkAuthorizationToken,
};
export default ValidateToken;
