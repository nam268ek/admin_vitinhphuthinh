import React from "react";
import { FiDatabase, FiUsers } from "react-icons/fi";
import { AiOutlineHome, AiOutlineLayout } from "react-icons/ai";
import { BsBagCheck } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { ImExit } from "react-icons/im";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetProcessImg } from "../redux/Slices/productSlice";
import { formatMoney } from "../Services/general.service";
import { setLogout } from "../redux/Slices/LoginSlice";

const NavBarMenu: React.FC = () => {
  const dispatch = useDispatch();
  const handleProcessImg = () => {
    dispatch(resetProcessImg());
  };
  const { listAllProducts } = useSelector((state: any) => state.product);
  const sumPrice = listAllProducts.reduce((a: any, b: any) => {
    return a + b.price;
  }, 0);

  const handleLogout = () => {
    dispatch(setLogout());
  }

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
                Xin chào,<Link to="">Vi Tính Phú Thịnh</Link>
              </p>
            </div>
            <div className="ps-block__action">
              <Link to="" onClick={handleLogout}>
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
              {/* <li className="">
                <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")}>
                  <AiOutlineHome />
                  <span>Dashboard</span>
                </NavLink>
              </li> */}
              <li className="">
                <NavLink to="/products" className={({ isActive }) => (isActive ? "active-link" : "")} onClick={handleProcessImg}>
                  <FiDatabase />
                  <span>Sản phẩm</span>
                </NavLink>
              </li>
              <li className="">
                <NavLink to="/orders" className={({ isActive }) => (isActive ? "active-link" : "")}>
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
                <NavLink to="/categories" className={({ isActive }) => (isActive ? "active-link" : "")}>
                  <BiCategoryAlt />
                  <span>Danh mục</span>
                </NavLink>
              </li>
              <li className="">
                <NavLink to="/layout" className={({ isActive }) => (isActive ? "active-link" : "")}>
                  <AiOutlineLayout />
                  <span>Hình ảnh</span>
                </NavLink>
              </li>
              {/* <li className="">
                <NavLink to="/blogs" className={({ isActive }) => (isActive ? "active-link" : "")}>
                  <AiOutlineLayout />
                  <span>Blogs</span>
                </NavLink>
              </li> */}
              <li className="">
                <NavLink to="/settings" className={({ isActive }) => (isActive ? "active-link" : "")}>
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
