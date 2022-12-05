/* eslint-disable curly */
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Categories from './components/Categories';
import { AuthVerify } from './components/common/AuthVerify';
import { PrivateRoute } from './components/common/PrivateRoute';
import { Indicator } from './components/Indicator/Indicator';
import Login from './components/Login/Login';
import LogoLayout from './components/LogoLayout/LogoLayout';
import { Marketings } from './components/Marketing';
import { NavBarMenu } from './components/NavBarMenu/NavBarMenu';
import { NavbarMenuV2 } from './components/NavBarMenu/NavBarMenuV2';
import { NewMarketing } from './components/NewMarketing';
import { NewOrder } from './components/NewOrder';
import { NewPost } from './components/NewPost';
import { NewProduct } from './components/NewProduct';
import { Orders } from './components/Order';
import { Posts } from './components/Post';
import { Products } from './components/Product';
import { asyncUser, logout } from './components/redux/Slices/AuthSlice';
import { RootState } from './components/redux/store/store';
import { Footer } from './components/Settings/Footer';
import { Policy } from './components/Settings/Policy';
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
            {/* <NavBarMenu /> */}
            <NavbarMenuV2 />
          </header>
        )}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/loading" element={<Indicator />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Navigate to="/products" />} />

            {/* route products */}
            <Route path="/products" element={<Products />} />
            <Route path="/products/new" element={<NewProduct />} />
            <Route path="/products/:productId" element={<NewProduct />} />

            {/* route orders */}
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/new" element={<NewOrder />} />
            <Route path="/orders/:orderId" element={<NewOrder />} />

            {/* route categories */}
            <Route path="/categories" element={<Categories />} />

            {/* route marketings */}
            <Route path="/marketings" element={<Marketings />} />
            <Route path="/marketings/new" element={<NewMarketing />} />
            <Route path="/marketings/:marketingId" element={<NewMarketing />} />

            {/* route posts */}
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/new" element={<NewPost />} />
            <Route path="/posts/:postId" element={<NewPost />} />

            {/* route settings */}
            <Route path="/settings/footers" element={<Footer />} />
            <Route path="/settings/policies" element={<Policy />} />
          </Route>
        </Routes>
      </main>
      <AuthVerify logoutAction={logoutAction} />
    </div>
  );
};
