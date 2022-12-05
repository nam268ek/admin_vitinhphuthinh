/* eslint-disable curly */
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  LogoutOutlined,
  HomeOutlined,
  MailOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Avatar, MenuProps, Button, Menu, Tooltip } from 'antd';

import React, { useEffect, useState } from 'react';
import { AiOutlineLayout } from 'react-icons/ai';
import { BiCategoryAlt } from 'react-icons/bi';
import { BsBagCheck } from 'react-icons/bs';
import { FiDatabase } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/Slices/AuthSlice';
import { RootState } from '../redux/store/store';
import { formatMoney } from '../services/general.service';
import { UserOutlined } from '@ant-design/icons';

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
  getItem('Dashboard', '1', <HomeOutlined />, undefined, undefined, true),
  getItem('Sản phẩm', '2', <FiDatabase />),
  getItem('Đơn hàng', '3', <BsBagCheck />),
  getItem('Danh mục', '4', <BiCategoryAlt />),
  getItem('Marketing', '5', <ContainerOutlined />),
  getItem('Bài đăng', '6', <AiOutlineLayout />),
  getItem('Settings', 'sub1', <IoSettingsOutline />, [
    getItem('Footer', '7'),
    getItem('Chính sách', '8'),
  ]),
];

export const NavbarMenuV2: React.FC = () => {
  const { products } = useSelector((state: RootState) => state.product);
  const [totalValueStore, setTotalValueStore] = useState<number>(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleSelectMenu = (data: any) => {
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
      default:
        break;
    }
    console.log(data);
  };

  return (
    <div className="ps-main__sidebar">
      <div className="ps-sidebar relative h-full">
        <div className="ps-sidebar__top pr-5 mb-[30px]">
          <div className="ps-block--user-wellcome mb-[40px] relative flex flex-nowrap items-center w-full">
            <div className="ps-block__left">
              <img src="/img/user/admin.jpg" alt="" />
            </div>
            <div className="ps-block__right pl-3">
              <div>
                Xin chào,
                <p id="nameshop" className="mb-0 color-[#666] text-sm">
                  Vi Tính Phú Thịnh
                </p>
              </div>
            </div>
            <div className="ps-block__action absolute top-1/2 translate-y-[-50%] right-3">
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
          <div className="ps-sidebar__center pr-5">
            <ul id="menu" className="m-0 p-0">
              <Menu
                defaultSelectedKeys={['2']}
                mode="inline"
                subMenuCloseDelay={0.01}
                onSelect={handleSelectMenu}
                items={items}
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
