import { Breadcrumb, Layout, theme } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { Search } from '../Search/Search';
import { ProductListButton } from './Components/ProductListButton';
import { TableListProduct } from './Components/TableListProducts';

const { Header, Content } = Layout;

export const Products: React.FC = () => {
  const { products } = useSelector((state: RootState) => state.product);
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
          <Search listItems={products} />
        </div>
      </Header>
      <Content className="my-0 mx-4">
        <Breadcrumb className="mx-0 my-2 px-5">
          <Breadcrumb.Item>Products</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: colorBgContainer }} className="px-5 py-6 min-h-full">
          <ProductListButton selectedIds={selectedIds} />
          <TableListProduct setSelectedIds={setSelectedIds} />
        </div>
      </Content>
    </>
  );
};
