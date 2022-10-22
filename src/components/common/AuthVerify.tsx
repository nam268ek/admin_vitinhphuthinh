/* eslint-disable curly */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { IAuthToken } from '../../types/types';
import { handleAuth } from '../../utils/verifyToken';
import { RootState } from '../redux/store/store';

export const AuthVerify: React.FC<IAuthToken> = ({ logoutAction }) => {
  const { isLogin } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/login' && isLogin) {
      handleAuth(logoutAction);
    }
  }, [location, logoutAction, isLogin]);

  return <></>;
};
