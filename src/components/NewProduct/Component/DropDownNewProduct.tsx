import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, MenuProps } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { history } from '../../../utils/history';
import { updateStateKeyProductAction } from '../../redux/Slices/ProductSlice';

export const DropDownNewProduct: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const onClick: MenuProps['onClick'] = ({ key }) => {
    dispatch(updateStateKeyProductAction(key));
    history.push(`${location.pathname}/new`);
  };

  const menu = (
    <Menu
      onClick={onClick}
      items={[
        {
          label: <Link to="">Computer - Laptop</Link>,
          key: 'Computer - Laptop',
        },
        {
          label: <Link to="">Printer</Link>,
          key: 'Printer',
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
