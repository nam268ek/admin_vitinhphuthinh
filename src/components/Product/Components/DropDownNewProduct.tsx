import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { history } from '../../../utils/history';
import { setImageAction } from '../../redux/Slices/ImageSlice';
import {
  setDefaultProductAction,
  updateStateKeyProductAction,
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

  const items = [
    {
      label: 'Computer - Laptop',
      key: 'Computer - Laptop',
    },
    {
      label: 'Printer',
      key: 'Printer',
    },
  ];

  return (
    <Dropdown menu={{ items, onClick }} trigger={['click']}>
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
