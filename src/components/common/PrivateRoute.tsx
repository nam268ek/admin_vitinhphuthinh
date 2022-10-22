import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../redux/store/store';

export const PrivateRoute: React.FC = () => {
  const { isLogin } = useSelector((state: RootState) => state.auth);

  return isLogin ? <Outlet /> : <Navigate to="/login" />;
};
