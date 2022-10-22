/* eslint-disable curly */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Categories from './components/Categories';
import { AuthVerify } from './components/common/AuthVerify';
import Customers from './components/Customers/Customers';
import InfoFooter from './components/InfoFooter/InfoFooter';
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import LogoLayout from './components/LogoLayout/LogoLayout';
import { NavBarMenu } from './components/NavBarMenu/NavBarMenu';
import { NewOrder } from './components/NewOrder/NewOrder';
import { NewProduct } from './components/NewProduct';
import Orders from './components/Orders/Orders';
import Policy from './components/Policy/Policy';
import Products from './components/Products';
import { asyncUser, logout } from './components/redux/Slices/AuthSlice';
import { RootState } from './components/redux/store/store';
import Settings from './components/Settings/Settings';
import { eventBus } from './utils/EventBus';
import { history } from './utils/history';
import { getUserToken, handleAuth } from './utils/verifyToken';
import { PrivateRoute } from './components/common/PrivateRoute';
import { Indicator } from './components/Indicator/Indicator';

export const App: React.FC = () => {
  const { isLogin, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const logoutAction = useCallback(() => {
    dispatch(logout());
    history.push('/login');
  }, [dispatch]);

  const handleAsyncUserLogin = async () => {
    const isValid = await handleAuth();
    if (isValid) {
      const { id, email } = await getUserToken();
      await dispatch(asyncUser({ id, email }));
    } else {
      logoutAction();
    }
  };

  useEffect(() => {
    handleAsyncUserLogin();
  }, []);

  //Note: listen to events name
  useEffect(() => {
    eventBus.on('logout', () => {
      logoutAction();
    });

    return () => eventBus.remove('logout');
  }, [user, logoutAction]);

  return (
    <div className="App">
      <main>
        {isLogin && (
          <header>
            <NavBarMenu />
          </header>
        )}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/loading" element={<Indicator />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Navigate to="/products" />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/create" element={<NewProduct />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/create-order" element={<NewOrder />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/layout" element={<Layout />} />
            <Route path="/settings" element={<Settings />}>
              <Route path="logo" element={<LogoLayout />} />
              <Route path="footer" element={<InfoFooter />} />
              <Route path="policy" element={<Policy />} />
            </Route>
          </Route>
        </Routes>
      </main>
      <AuthVerify logoutAction={logoutAction} />
    </div>
  );
};
