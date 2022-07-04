import React from "react";
import { FiDatabase, FiUsers } from "react-icons/fi";
import { AiOutlineHome, AiOutlineLayout } from "react-icons/ai";
import { BsBagCheck } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { ImExit } from "react-icons/im";
import { NavLink } from "react-router-dom";

const NavBarMenu: React.FC = () => {
  return (
    <div className="ps-main__sidebar">
      <div className="ps-sidebar">
        <div className="ps-sidebar__top">
          <div className="ps-block--user-wellcome">
            <div className="ps-block__left">
              <img src="/img/user/admin.jpg" alt="" />
            </div>
            <div className="ps-block__right">
              <p>
                Hello,<a href="!#">Soho Store</a>
              </p>
            </div>
            <div className="ps-block__action">
              <a href="!#">
                <ImExit />
              </a>
            </div>
          </div>
          <div className="ps-block--earning-count">
            <small>Earning</small>
            <h3>$12,560.55</h3>
          </div>
        </div>
        <div className="ps-sidebar__content">
          <div className="ps-sidebar__center">
            <ul className="menu">
              <li className="">
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  <AiOutlineHome />
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  to="/products"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  <FiDatabase />
                  <span>Products</span>
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  to="/orders"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  <BsBagCheck />
                  <span>Orders</span>
                </NavLink>
              </li>
              {/* <li className="">
                <NavLink
                  to="/customers"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  <FiUsers />
                  <span>Customers</span>
                </NavLink>
              </li> */}
              <li className="">
                <NavLink
                  to="/categories"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  <BiCategoryAlt />
                  <span>Categories</span>
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  to="/layout"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  <AiOutlineLayout />
                  <span>Layout</span>
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  to="/settings"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  <IoSettingsOutline />
                  <span>Settings</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NavBarMenu;
