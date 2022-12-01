/* eslint-disable curly */
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Categories from './components/Categories';
import { AuthVerify } from './components/common/AuthVerify';
import { PrivateRoute } from './components/common/PrivateRoute';
import { Indicator } from './components/Indicator/Indicator';
import InfoFooter from './components/InfoFooter/InfoFooter';
import Login from './components/Login/Login';
import LogoLayout from './components/LogoLayout/LogoLayout';
import { NavBarMenu } from './components/NavBarMenu/NavBarMenu';
import { NewOrder } from './components/NewOrder';
import { NewPost } from './components/NewPost';
import { NewProduct } from './components/NewProduct';
import { Orders } from './components/Order';
import Policy from './components/Policy/Policy';
import { Posts } from './components/Post';
import { Products } from './components/Product';
import { asyncUser, logout } from './components/redux/Slices/AuthSlice';
import { RootState } from './components/redux/store/store';
import Settings from './components/Settings/Settings';
import { eventBus } from './utils/EventBus';
import { history } from './utils/history';
import { getUserToken, handleAuth } from './utils/verifyToken';

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
            <Route path="/products/new" element={<NewProduct />} />
            <Route path="/products/:productId" element={<NewProduct />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/new" element={<NewOrder />} />
            <Route path="/orders/:orderId" element={<NewOrder />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/marketings" element={<Posts />} />
            <Route path="/marketings/new" element={<NewPost />} />
            <Route path="/marketings/:marketingId" element={<NewPost />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/new" element={<NewPost />} />
            <Route path="/posts/:postId" element={<NewPost />} />
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
