import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps } from 'antd';
import { Laptop2, Printer, Webcam, HardDrive, Network, Mouse } from 'lucide-react';
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
      icon: <Laptop2 size={15} />,
    },
    {
      key: 'printer',
      label: 'Máy in',
      icon: <Printer size={15} />,
    },
    {
      key: 'camera',
      label: 'Camera',
      icon: <Webcam size={15} />,
    },
    {
      key: 'accessory',
      label: 'Phụ kiện',
      icon: (
        <div className="w-[15px] inline-flex">
          <Mouse size={15} className="" />
        </div>
      ),
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
      icon: <HardDrive size={15} />,
    },
    {
      key: 'network_device',
      label: 'Thiết bị mạng',
      icon: <Network size={15} />,
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
