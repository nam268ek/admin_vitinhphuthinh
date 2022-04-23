const getToken = async () => {
  if (localStorage.hasOwnProperty("tokenvtpt")) {
    const token = JSON.parse(localStorage.getItem("tokenvtpt") || "");
    //No loged in user
    if (token === "") return false;

    //Loged in user
    return new Promise((resolve, reject) => {
      const waitTimer = setTimeout(() => {
        reject(false);
        console.log("token timeout");
      }, 5000);

      resolve(token);
      clearTimeout(waitTimer);
    });
  } else return false;
};

const updateTokenLocalStorage = async (res: any) => {
  const data: any = await new Promise((resolve, reject) => {
    if (res.code !== 200) reject(res.messageError);
    resolve(res.data);
  });
  const { token, refreshToken } = data;
  if (data.hasOwnProperty("tokenvtpt")) {
    localStorage.setItem("tokenvtpt", JSON.stringify(token));
    localStorage.setItem("refreshtokenvtpt", JSON.stringify(refreshToken));
  }
};

const handleRefreshToken = () => {
  const refreshToken = JSON.parse(
    localStorage.getItem("refreshtokenvtpt") || ""
  );
  return refreshToken;
};

const ValidateToken = {
  getToken,
  handleRefreshToken,
  updateTokenLocalStorage,
};
export default ValidateToken;
