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
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Notify from "./components/Notify/Notify";
import Loading from "./components/common/Loading";

const App: React.FC = () => {
  const { isLogin } = useSelector((state: any) => state.login);
  const { isLoading } = useSelector((state: any) => state.primary);

  return (
    <BrowserRouter>
      <div className="App">
        {isLogin && (
          <header>
            <NavBarMenu />
          </header>
        )}

        <main style={isLogin ? { marginLeft: "320px" } : {}}>
          {isLoading && <Loading/>}

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/notify" element={<Notify />} />
            <Route
              element={
                <ProtectedRoute
                  isProtected={isLogin}
                  redirectPath="/notify"
                />
              }
            >
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/create-product" element={<NewProduct />} />
              <Route path="/orders" element={<Orders />} />
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
