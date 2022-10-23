import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, MenuProps } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { NAME_ACTION } from '../../../constants/const';
import { history } from '../../../utils/history';
// import { setAction } from '../../redux/Slices/PrimarySlice';
// import { updateProduct } from '../../redux/Slices/ProductSlice';

export const DropDownNewProduct: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const onClick: MenuProps['onClick'] = ({ key }) => {
    // dispatch(setAction("create"));
    // dispatch(updateProduct([]));
    history.push(`${location.pathname}/new`);
  };

  const menu = (
    <Menu
      onClick={onClick}
      items={[
        {
          label: <Link to="">Computer - Laptop</Link>,
          key: '1',
        },
        {
          label: <NavLink to={`${location.pathname}/new`}>Printer</NavLink>,
          key: '2',
        },
      ]}
    />
  );

  return (
    <Dropdown overlay={menu}>
      <Button className="c-btn-success d-flex align-items-center">
        <DownOutlined size={12} />
        <span style={{ paddingLeft: '5px' }}>Thêm sản phẩm</span>
      </Button>
    </Dropdown>
  );
};
