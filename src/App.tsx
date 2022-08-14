import React from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import NavBarMenu from "./components/NavBarMenu/NavBarMenu";
import Dashboard from "./components/Dashboard/Dashboard";
import Products from "./components/Products/Products";
import Orders from "./components/Orders/Orders";
import Customers from "./components/Customers/Customers";
import Login from "./components/Login/Login";
import Categories from "./components/Categories/Categories";
import Settings from "./components/Settings/Settings";
import NewProduct from "./components/NewProduct/NewProduct";
import Layout from "./components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Notify from "./components/Notify/Notify";
import Loading from "./components/common/Loading";
import { setIsLoading } from "./components/redux/Slices/PrimarySlice";
import NewOrder from "./components/NewOrder/NewOrder";
import ValidateToken from "./api/authClient";
import { setLogin } from "./components/redux/Slices/LoginSlice";
import Blogs from "./components/Blogs/Blogs";
import NewProductv1 from "./components/NewProduct/NewProduct-v1";

const App: React.FC = () => {
  const { isLogin } = useSelector((state: any) => state.login);
  const { isLoading } = useSelector((state: any) => state.primary);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const handleToken = async () => {
      const isToken = await ValidateToken.getToken();
      if (isToken) dispatch(setLogin(true));
    };
    handleToken();
  }, [dispatch]);

  React.useEffect(() => {
    if (isLoading) {
      const timeLoading = setTimeout(() => dispatch(setIsLoading(false)), 10000);
      return () => clearTimeout(timeLoading);
    }
    if (location.pathname === "/") {
      navigate("/products", { replace: true });
    }
  }, [dispatch, isLoading, navigate, location]);

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
            {/* <Route path="/" element={<Dashboard />} /> */}
            <Route path="/products" element={<Products />} />
            <Route path="/products/create-product" element={<NewProduct />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/create-order" element={<NewOrder />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/layout" element={<Layout />} />
            <Route path="/blogs" element={<NewProductv1 />} />
            {/* <Route path="/blogs" element={<NewProductv1 />} /> */}
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
};

export default App;
