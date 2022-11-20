/* eslint-disable curly */
import { LogoutOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { AiOutlineChrome, AiOutlineLayout } from 'react-icons/ai';
import { BiCategoryAlt } from 'react-icons/bi';
import { BsBagCheck } from 'react-icons/bs';
import { FiDatabase } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../redux/Slices/AuthSlice';
import { RootState } from '../redux/store/store';
import { formatMoney } from '../services/general.service';

export const NavBarMenu: React.FC = () => {
  const { products } = useSelector((state: RootState) => state.product);

  const [totalValueStore, setTotalValueStore] = useState<number>(0);

  const dispatch = useDispatch();

  useEffect(() => {
    handleTotalValueStore();
  }, [products]);

  const handleTotalValueStore = () => {
    const listPrices = products?.map((item) => {
      const { price, priceSale, quantity } = item;
      if (item.priceSale) return { priceSale, quantity };
      return { priceSale: price, quantity };
    });

    const prices = listPrices.reduce((prev, curr) => prev + curr.priceSale * curr.quantity, 0);
    setTotalValueStore(prices);
  };

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
                <p id="nameshop">Vi Tính Phú Thịnh</p>
              </p>
            </div>
            <div className="ps-block__action">
              <Tooltip title="Đăng xuất">
                <Button
                  type="primary"
                  danger
                  icon={
                    <LogoutOutlined className="d-flex justify-content-center align-items-center" />
                  }
                  onClick={handleLogout}
                ></Button>
              </Tooltip>
            </div>
          </div>
          <div className="ps-block--earning-count">
            <small>Tổng giá trị kho hàng</small>
            <h3>{formatMoney.format(Number(totalValueStore))}</h3>
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
                  to="/marketings"
                  className={({ isActive }) => (isActive ? 'active-link' : 'navlink')}
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
