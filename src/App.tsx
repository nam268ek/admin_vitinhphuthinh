import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const App: React.FC = () => {
  const { isLogin } = useSelector((state: any) => state.login);
  const { isLoading } = useSelector((state: any) => state.primary);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const handleToken = async () => {
      const isToken = await ValidateToken.getToken();
      if (isToken) dispatch(setLogin(true));
    };
    handleToken();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="App">
        {isLogin && (
          <header>
            <NavBarMenu />
          </header>
        )}

        <main style={isLogin ? { marginLeft: "320px" } : {}}>
          {isLoading && <Loading />}

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/notify" element={<Notify />} />
            <Route element={<ProtectedRoute isProtected={isLogin} redirectPath="/notify" />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/create-product" element={<NewProduct />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/create-order" element={<NewOrder />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/layout" element={<Layout />} />
            </Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
