/* eslint-disable curly */
import { Layout } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Categories } from './components/Categories';
import { AuthVerify } from './components/common/AuthVerify';
import { PrivateRoute } from './components/common/PrivateRoute';
import { Indicator } from './components/Indicator/Indicator';
import { Login } from './components/Login/Login';
import { Marketings } from './components/Marketing';
import { NavbarMenu } from './components/NavBarMenu/NavBarMenu';
import { NewMarketing } from './components/NewMarketing';
import { NewOrder } from './components/NewOrder';
import { NewPost } from './components/NewPost';
import { NewProduct } from './components/NewProduct';
import { Orders } from './components/Order';
import { Posts } from './components/Post';
import { Products } from './components/Product';
import { asyncUser, logout } from './components/redux/Slices/AuthSlice';
import { RootState } from './components/redux/store/store';
import { InfoFooter } from './components/Settings/Footer';
import { InfoPolicy } from './components/Settings/Policy';
import { eventBus } from './utils/EventBus';
import { history } from './utils/history';
import { getUserToken, handleAuth } from './utils/verifyToken';

const { Footer } = Layout;

export const App: React.FC = () => {
  const { isLogin, user } = useSelector((state: RootState) => state.auth);
  const [widthNavbar, setWidthNavbar] = useState<number>(250);

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
    <>
      {isLogin ? (
        <Layout hasSider className="min-h-screen">
          <NavbarMenu width={widthNavbar} setWidth={setWidthNavbar} />
          <Layout
            className="site-layout"
            style={{
              marginLeft: `${widthNavbar}px`,
              transition: 'all 0.2s',
            }}
          >
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
                <Route path="/settings/footers" element={<InfoFooter />} />
                <Route path="/settings/policies" element={<InfoPolicy />} />
              </Route>
            </Routes>
            <Footer className="text-center">Copyright ©2022 Developer by NN</Footer>
          </Layout>
        </Layout>
      ) : (
        <Login />
      )}
      <AuthVerify logoutAction={logoutAction} />
    </>
  );
};
