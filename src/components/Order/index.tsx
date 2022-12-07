import { PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, FloatButton, Layout, theme } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NAME_ACTION } from '../../constants/const';
import { setOrderAction } from '../redux/Slices/OrderSlice';
import { RootState } from '../redux/store/store';
import { Search } from '../Search/Search';
import { TableListOrders } from './Components/TableListOrders';

const { Header, Content } = Layout;

export const Orders: React.FC = () => {
  const { orders } = useSelector((state: RootState) => state.order);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateOrder = () => {
    dispatch(setOrderAction(NAME_ACTION.CREATE_ORDER));
    navigate('/orders/new', { replace: true });
  };

  return (
    <>
      <Header
        className="sticky top-0 z-1 w-full flex"
        style={{ background: colorBgContainer, paddingInline: '35px' }}
      >
        <p className="text-2xl m-0 flex items-center">Đơn hàng</p>
      </Header>
      <Content className="my-0 mx-4">
        <Breadcrumb className="mx-0 my-2 px-5">
          <Breadcrumb.Item>Orders</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: colorBgContainer }} className="px-5 py-6 min-h-full">
          <div className="flex mb-2">
            <Search
              listItems={orders}
              flowName="orders"
              className="w-full"
              placeholder="Tìm kiếm đơn hàng..."
            />
            <Button
              className="flex items-center btn-green h-[40px] border-0 ml-2"
              icon={<PlusOutlined />}
              onClick={handleCreateOrder}
            >
              <span className="uppercase">Tạo đơn hàng</span>
            </Button>
          </div>
          <TableListOrders />
        </div>
        <FloatButton type="primary" tooltip={<div>Documents</div>} />
      </Content>
    </>
  );
};
