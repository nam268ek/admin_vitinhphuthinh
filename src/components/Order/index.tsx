import { Breadcrumb, FloatButton, Layout, theme } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { Search } from '../Search/Search';
import { OrderListButton } from './Components/OrderListButton';
import { TableListOrders } from './Components/TableListOrders';

const { Header, Content } = Layout;

export const Orders: React.FC = () => {
  const { orders } = useSelector((state: RootState) => state.order);
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Header
        className="sticky top-0 z-1 w-full flex"
        style={{ background: colorBgContainer, paddingInline: '35px' }}
      >
        <div className="w-full flex items-center">
          <Search listItems={orders} flowName="orders" placeholder="Tìm kiếm đơn hàng..." />
        </div>
      </Header>
      <Content className="my-0 mx-4">
        <Breadcrumb className="mx-0 my-2 px-5">
          <Breadcrumb.Item>Orders</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: colorBgContainer }} className="px-5 py-6 min-h-full">
          <OrderListButton selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
          <TableListOrders setSelectedIds={setSelectedIds} selectedIds={selectedIds} />
        </div>
        <FloatButton type="primary" tooltip={<div>Documents</div>} />
      </Content>
    </>
  );
};
