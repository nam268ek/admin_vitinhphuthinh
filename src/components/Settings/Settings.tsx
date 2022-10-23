import { Dropdown, Empty, Menu } from 'antd';
import React from 'react';
import { AiOutlineCodeSandbox } from 'react-icons/ai';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';

const Settings: React.FC = () => {
  const listDropdownPolicy = [
    { id: '0', key: 'polship', desc: 'Chính sách vận chuyển' },
    { id: '1', key: 'polreturn', desc: 'Chính sách đổi trả' },
    { id: '2', key: 'polwan', desc: 'Chính sách bảo hành' },
    { id: '3', key: 'polquality', desc: 'Cam kết chất lượng' },
    { id: '4', key: 'poluse', desc: 'Điều khoản sử dụng' },
    { id: '5', key: 'polbuy', desc: 'Chính sách mua hàng' },
    { id: '6', key: 'polprot', desc: 'Chính sách bảo mật' },
    { id: '7', key: 'polinsta', desc: 'Chính sách trả góp' },
  ];
  const { pathname } = useLocation();

  const menu = (
    <Menu
      items={listDropdownPolicy.map((item: any) => {
        const linkTo = `policy?name=${item.key}`;
        return {
          key: item.id,
          label: <NavLink to={linkTo}>{item.desc}</NavLink>,
        };
      })}
    ></Menu>
  );

  const handleActiveClassChange = (active: boolean) => {
    const activeClass = 'container-block__title bru5 justify-content-start align-items-baseline';
    return active ? `${activeClass} active` : activeClass;
  };

  return (
    <>
      <div id="setting" className="ps-main__wrapper">
        <div className="header--dashboard">
          <div className="header__left">
            <h3>Setting</h3>
            <p>Danh sách thiết lập</p>
          </div>
        </div>
        <section className="ps-items-listing">
          <div className="row">
            <div className="col-xl-3 col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="container-block br-0">
                <NavLink to="logo" className={({ isActive }) => handleActiveClassChange(isActive)}>
                  <span className="pr-10">
                    <AiOutlineCodeSandbox />
                  </span>
                  <h2>Logo</h2>
                </NavLink>
              </div>
              <div className="container-block br-0">
                <NavLink
                  to="footer"
                  className={({ isActive }) => handleActiveClassChange(isActive)}
                >
                  <span className="pr-10">
                    <AiOutlineCodeSandbox />
                  </span>
                  <h2>Footer</h2>
                </NavLink>
              </div>
              <Dropdown overlay={menu} trigger={['click']}>
                <div className="container-block br-0">
                  <NavLink
                    to="policy"
                    className={({ isActive }) => handleActiveClassChange(isActive)}
                  >
                    <span className="pr-10">
                      <AiOutlineCodeSandbox />
                    </span>
                    <h2>Chính sách</h2>
                  </NavLink>
                </div>
              </Dropdown>
            </div>
            <div className="col-xl-9 col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="container-block br-0">
                <div className="container-block__title w-100 justify-content-center">
                  {/* ----content show logo, footer, policy---- */}
                  {pathname === '/settings' ? <Empty /> : <Outlet />}
                  {/* ----content show logo, footer, policy---- */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default Settings;
