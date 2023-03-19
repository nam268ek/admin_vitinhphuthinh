/* eslint-disable curly */
import { ContainerOutlined, HomeOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Layout, Menu, MenuProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { AiOutlineLayout } from 'react-icons/ai';
import { BiCategoryAlt } from 'react-icons/bi';
import { BsBagCheck } from 'react-icons/bs';
import { FiDatabase } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../redux/Slices/AuthSlice';
import { RootState } from '../redux/store/store';
import { formatMoney } from '../services/general.service';
import { useCallback } from 'react';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
  disabled?: boolean,
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    disabled,
  } as MenuItem;
}

const items: MenuItem[] = [
  // getItem('Dashboard', '1', <HomeOutlined />, undefined, undefined, true),
  getItem('Sản phẩm', '2', <FiDatabase />),
  // getItem('Đơn hàng', '3', <BsBagCheck />),
  getItem('Danh mục', '4', <BiCategoryAlt />),
  // getItem('Marketing', '5', <ContainerOutlined />),
  getItem('Bài đăng', '6', <AiOutlineLayout />),
  getItem('Settings', 'sub1', <IoSettingsOutline />, [
    getItem('Footer', '7'),
    getItem('Chính sách', '8'),
  ]),
  getItem('Đăng xuất', '9', <LogoutOutlined />),
];

const { Sider } = Layout;

const NavbarMenu: React.FC<any> = ({ width, setWidth }) => {
  const { products } = useSelector((state: RootState) => state.product);
  const [totalValueStore, setTotalValueStore] = useState<number>(0);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [defaultKey, setDefaultKey] = useState<string[]>([]);

  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    handleTotalValueStore();
  }, [products]);

  const handleTotalValueStore = useCallback(() => {
    const listPrices = products?.map((item) => {
      const { price, priceSale, quantity } = item;
      if (item.priceSale) return { priceSale, quantity };
      return { priceSale: price, quantity };
    });

    const prices = listPrices.reduce((prev, curr) => prev + curr.priceSale * curr.quantity, 0);
    setTotalValueStore(prices);
  }, [products]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSelectMenu = (data: any) => {
    console.log(data);
    const { key } = data;
    switch (key) {
      case '1':
        navigate('home');
        break;
      case '2':
        navigate('products');
        break;
      case '3':
        navigate('orders');
        break;
      case '4':
        navigate('categories');
        break;
      case '5':
        navigate('marketings');
        break;
      case '6':
        navigate('posts');
        break;
      case '7':
        navigate('settings/footers');
        break;
      case '8':
        navigate('settings/policies');
        break;
      case '9':
        handleLogout();
        navigate('login');
        break;
      default:
        break;
    }
    console.log(data);
  };

  useEffect(() => {
    console.log(pathname);
    defaultSelectedKeys(pathname);
  }, [pathname]);

  const defaultSelectedKeys = (path: string) => {
    if (path === '/') setDefaultKey(['2']);
    if (path === '/products') setDefaultKey(['2']);
    if (path === '/orders') setDefaultKey(['3']);
    if (path === '/categories') setDefaultKey(['4']);
    if (path === '/marketings') setDefaultKey(['5']);
    if (path === '/posts') setDefaultKey(['6']);
    if (path === '/settings/footers') setDefaultKey(['7']);
    if (path === '/settings/policies') setDefaultKey(['8']);
    if (path === '/login') setDefaultKey(['9']);
  };

  const handleCollapsed = (value: boolean) => {
    setCollapsed(value);
    console.log(value);
    if (!value) setWidth(250);
    else setWidth(80);
  };
  console.log('re-render');
  return (
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
      width={width}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => handleCollapsed(value)}
    >
      {!collapsed && (
        <>
          <div style={{ height: 32, margin: 16 }} className="flex items-center justify-between">
            <div className="flex">
              <Avatar icon={<UserOutlined />} />
              <div className="ml-2 text-[#dadadad3]">
                Xin chào,
                <p id="nameshop" className="mb-0 color-[#fff] text-sm">
                  Vi Tính Phú Thịnh
                </p>
              </div>
            </div>
          </div>
          <div className="my-9 flex flex-col justify-center items-center">
            <p className="mb-1 text-[#dadadad3]">Tổng giá trị kho hàng</p>
            <h3 className="text-3xl mb-1 font-medium text-[#e7e7e7]">
              {formatMoney.format(Number(totalValueStore))}
            </h3>
          </div>
        </>
      )}
      <Menu
        theme="dark"
        selectedKeys={defaultKey}
        mode="inline"
        subMenuCloseDelay={0.01}
        onClick={handleSelectMenu}
        items={items}
      />
    </Sider>
  );
};

export default React.memo(NavbarMenu);
