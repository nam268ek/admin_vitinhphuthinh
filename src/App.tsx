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

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <NavBarMenu />
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/create-product" element={<NewProduct />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/login" element={<Login />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
