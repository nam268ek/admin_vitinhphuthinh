import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, MenuProps } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { history } from '../../../utils/history';
import { setImageAction } from '../../redux/Slices/ImageSlice';
import {
  updateStateKeyProductAction,
  setDefaultProductAction,
} from '../../redux/Slices/ProductSlice';

export const DropDownNewProduct: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const onClick: MenuProps['onClick'] = ({ key }) => {
    dispatch(updateStateKeyProductAction(key));
    dispatch(setImageAction([]));
    dispatch(setDefaultProductAction());
    history.push(`${location.pathname}/new`);
  };

  const menu = (
    <Menu
      onClick={onClick}
      items={[
        {
          label: <label style={{ cursor: 'pointer' }}>Computer - Laptop</label>,
          key: 'Computer - Laptop',
        },
        {
          label: <label style={{ cursor: 'pointer' }}>Printer</label>,
          key: 'Printer',
        },
      ]}
    />
  );

  return (
    <Dropdown overlay={menu}>
      <Button
        className="btn-green c-btn-success d-flex align-items-center text-uppercase"
        style={{ height: '40px' }}
      >
        <DownOutlined size={12} />
        <span style={{ paddingLeft: '5px' }}>Thêm sản phẩm</span>
      </Button>
    </Dropdown>
  );
};
