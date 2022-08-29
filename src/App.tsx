import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import ValidateToken from "./api/authClient";
import Categories from "./components/Categories/Categories";
import Loading from "./components/common/Loading";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Customers from "./components/Customers/Customers";
import InfoFooter from "./components/InfoFooter/InfoFooter";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import LogoLayout from "./components/LogoLayout/LogoLayout";
import NavBarMenu from "./components/NavBarMenu/NavBarMenu";
import NewOrder from "./components/NewOrder/NewOrder";
import NewProduct from "./components/NewProduct/NewProduct";
import NewProductv1 from "./components/NewProduct/NewProduct-v1";
import Notify from "./components/Notify/Notify";
import Orders from "./components/Orders/Orders";
import Policy from "./components/Policy/Policy";
import Products from "./components/Products/Products";
import { setLogout } from "./components/redux/Slices/LoginSlice";
import { setIsLoading } from "./components/redux/Slices/PrimarySlice";
import Settings from "./components/Settings/Settings";
import { history } from "./utils/history";

const App: React.FC = () => {
  const { isLogin } = useSelector((state: any) => state.login);
  const { isLoading } = useSelector((state: any) => state.primary);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleAuthorization = async () => {
      const status = await ValidateToken.checkAuthorizationToken();
      if (!status) {
        dispatch(setLogout());
        history.push("/login");
      }
    };
    handleAuthorization();
  }, [dispatch, navigate]);

  React.useEffect(() => {
    if (isLoading) {
      const timeLoading = setTimeout(() => dispatch(setIsLoading(false)), 10000);
      return () => clearTimeout(timeLoading);
    }
  }, [dispatch, isLoading]);

  return (
    <div className="App">
      <main>
        {isLoading && <Loading />}
        {isLogin && (
          <header>
            <NavBarMenu />
          </header>
        )}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/notify" element={<Notify />} />
          <Route element={<ProtectedRoute isProtected={isLogin} redirectPath="/login" />}>
            <Route path="/" element={<Navigate to="/products" />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/create-product" element={<NewProduct />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/create-order" element={<NewOrder />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/layout" element={<Layout />} />
            <Route path="/blogs" element={<NewProductv1 />} />
            <Route path="/settings" element={<Settings />}>
              <Route path="logo" element={<LogoLayout />} />
              <Route path="footer" element={<InfoFooter />} />
              <Route path="policy" element={<Policy />} />
            </Route>
          </Route>
        </Routes>
      </main>
    </div>
  );
};

export default App;
