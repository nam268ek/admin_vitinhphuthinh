import { Breadcrumb, Layout, theme } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from '../Search/Search';
import { getListCategoryService } from '../redux/Slices/CategorySlice';
import { getListProductService } from '../redux/Slices/ProductSlice';
import { RootState } from '../redux/store/store';
import { ProductListButton } from './Components/ProductListButton';
import TableListProduct from './Components/TableListProducts';

const { Header, Content } = Layout;

export const Products: React.FC = () => {
  const { products } = useSelector((state: RootState) => state.product);
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListProductService()).unwrap();
    dispatch(getListCategoryService()).unwrap();
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const resetSelection = () => {
    setSelectedIds([]);
  };

  return (
    <>
      <Content className="my-0 mx-4">
        <Breadcrumb className="mx-0 my-2 px-5">
          <Breadcrumb.Item>Products</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: colorBgContainer }} className="px-5 py-6 min-h-full">
          <ProductListButton selectedIds={selectedIds} resetSelection={resetSelection} />
          <TableListProduct setSelectedIds={setSelectedIds} selectedIds={selectedIds} />
        </div>
      </Content>
    </>
  );
};
