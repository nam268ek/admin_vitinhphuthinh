import React from 'react';
import { AiOutlineChrome, AiOutlineLayout } from 'react-icons/ai';
import { BiCategoryAlt } from 'react-icons/bi';
import { BsBagCheck } from 'react-icons/bs';
import { FiDatabase } from 'react-icons/fi';
import { ImExit } from 'react-icons/im';
import { IoSettingsOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../redux/Slices/AuthSlice';
// import { resetProcessImg } from '../redux/Slices/ProductSlice';
import { formatMoney } from '../services/general.service';

export const NavBarMenu: React.FC = () => {
  const dispatch = useDispatch();
  // const handleProcessImg = () => {
  //   dispatch(resetProcessImg());
  // };
  // const { listAllProducts } = useSelector((state: any) => state.product);
  const sumPrice = 0;
  //   listAllProducts.reduce((a: any, b: any) => {
  //     return a + b.price;
  //   }, 0) || 0;

  const handleLogout = () => {
    dispatch(logout());
  };

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
                Xin chào,
                <Link id="nameshop" to="">
                  Vi Tính Phú Thịnh
                </Link>
              </p>
            </div>
            <div className="ps-block__action">
              <Link id="logout" to="" onClick={handleLogout}>
                <ImExit />
              </Link>
            </div>
          </div>
          <div className="ps-block--earning-count">
            <small>Tổng giá trị kho hàng</small>
            <h3>{formatMoney.format(Number(sumPrice))}</h3>
          </div>
        </div>
        <div className="ps-sidebar__content">
          <div className="ps-sidebar__center">
            <ul className="menu">
              <li className="">
                <NavLink
                  to="/home"
                  className={({ isActive }) => (isActive ? 'active-link' : 'navlink disabled-link')}
                >
                  <AiOutlineChrome />
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  to="/products"
                  className={({ isActive }) => (isActive ? 'active-link' : 'navlink')}
                  // onClick={handleProcessImg}
                >
                  <FiDatabase />
                  <span>Sản phẩm</span>
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  to="/orders"
                  className={({ isActive }) => (isActive ? 'active-link' : 'navlink')}
                >
                  <BsBagCheck />
                  <span>Đơn hàng</span>
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
                  className={({ isActive }) => (isActive ? 'active-link' : 'navlink')}
                >
                  <BiCategoryAlt />
                  <span>Danh mục</span>
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  to="/layout"
                  className={({ isActive }) => (isActive ? 'active-link' : 'navlink disabled-link')}
                >
                  <AiOutlineLayout />
                  <span>Marketing</span>
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  to="/blogs"
                  className={({ isActive }) => (isActive ? 'active-link' : 'navlink disabled-link')}
                >
                  <AiOutlineLayout />
                  <span>Blogs</span>
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  to="/settings"
                  className={({ isActive }) => (isActive ? 'active-link' : 'navlink disabled-link')}
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
