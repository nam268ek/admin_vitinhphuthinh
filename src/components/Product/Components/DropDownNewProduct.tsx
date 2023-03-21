import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setImageAction } from '../../redux/Slices/ImageSlice';
import {
  setDefaultProductAction,
  updateStateKeyProductAction,
} from '../../redux/Slices/ProductSlice';

export const DropDownNewProduct: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = ({ key }) => {
    dispatch(updateStateKeyProductAction(key));
    dispatch(setImageAction([]));
    dispatch(setDefaultProductAction());
    navigate(`${location.pathname}/new/${key}`);
  };

  const items: MenuProps['items'] = [
    {
      key: 'computer_laptop',
      label: 'PC - Laptop',
    },
    {
      key: 'printer',
      label: 'Máy in',
    },
    {
      key: 'camera',
      label: 'Camera',
    },
    {
      key: 'accessory',
      label: 'Phụ kiện',
      children: [
        {
          key: 'pc_laptop_accessories',
          label: 'Phụ kiện PC - Laptop',
        },
        {
          key: 'printer_accessories',
          label: 'Phụ kiện máy in',
        },
      ],
    },
    {
      key: 'storage_device',
      label: 'Thiết bị lưu trữ',
    },
    {
      key: 'network_device',
      label: 'Thiết bị mạng',
    },
  ];

  return (
    <Dropdown menu={{ items, onClick }} trigger={['click']}>
      <Button className="btn-green flex items-center border-0" icon={<DownOutlined />}>
        Thêm sản phẩm
      </Button>
    </Dropdown>
  );
};
