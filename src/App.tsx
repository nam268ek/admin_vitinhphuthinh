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
import { NewOrder } from './components/NewOrder';
import { NewProduct } from './components/NewProduct';
import Policy from './components/Policy/Policy';
import Products from './components/Product';
import { asyncUser, logout } from './components/redux/Slices/AuthSlice';
import { RootState } from './components/redux/store/store';
import Settings from './components/Settings/Settings';
import { eventBus } from './utils/EventBus';
import { history } from './utils/history';
import { getUserToken, handleAuth } from './utils/verifyToken';
import { PrivateRoute } from './components/common/PrivateRoute';
import { Indicator } from './components/Indicator/Indicator';
import { getListProductService } from './components/redux/Slices/ProductSlice';
import { getListCategoryService } from './components/redux/Slices/CategorySlice';
import { Orders } from './components/Order';
import { getListOrderService } from './components/redux/Slices/OrderSlice';
import { openMessage } from './components/services/general.service';
import { getListTagsService } from './components/redux/Slices/TagSlice';
import { getListBrandsService } from './components/redux/Slices/BrandSlice';
import { getListImageService } from './components/redux/Slices/ImageSlice';

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

  useEffect(() => {
    try {
      dispatch(getListProductService()).unwrap();
      dispatch(getListCategoryService()).unwrap();
      dispatch(getListOrderService()).unwrap();
      dispatch(getListTagsService()).unwrap();
      dispatch(getListBrandsService()).unwrap();
      dispatch(getListImageService()).unwrap();
    } catch (error) {
      openMessage(error);
    }
  }, []);

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
            <Route path="/products/new" element={<NewProduct />} />
            <Route path="/products/:productId" element={<NewProduct />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/new" element={<NewOrder />} />
            <Route path="/orders/:orderId" element={<NewOrder />} />
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
