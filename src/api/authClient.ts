const getToken = async () => {
  const token = JSON.parse(localStorage.getItem('token') || '');
  //No loged in user
  if (token === '') return null;

  //Loged in user
  return new Promise((resolve, reject) => {
    const waitTimer = setTimeout(() => {
      reject(null);
      console.log('token timeout');
    }, 5000);

    resolve(token);
    clearTimeout(waitTimer);
  });
};

const updateTokenLocalStorage = async (res: any) => {
  const data: any = await new Promise((resolve, reject) => {
    if(res.code !== 200) reject(res.messageError);
    resolve(res.data);
  });
  const { token, refreshToken } = data;
  if (data.token) {
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('refresh_token', JSON.stringify(refreshToken));
  }
};

const handleRefreshToken = () => {
  const refreshToken = JSON.parse(localStorage.getItem('refresh_token') || '');
  return refreshToken;
};


const ValidateToken = {
  getToken,
  handleRefreshToken,
  updateTokenLocalStorage,
};
export default ValidateToken;
