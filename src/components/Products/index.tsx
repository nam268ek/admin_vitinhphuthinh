import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../Search/Search';

import { DropDownNewProduct } from '../NewProduct/Component/DropDownNewProduct';
import { getListProductService } from '../redux/Slices/ProductSlice';
import { ExcelBotton } from './Component/ExcelBotton';
import { TableListProduct } from './Component/TableListProduct';
import { RootState } from '../redux/store/store';

const Products: React.FC = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.product);

  React.useEffect(() => {
    dispatch(getListProductService());
  }, [dispatch]);

  return (
    <div className="ps-main__wrapper">
      <div className="header--dashboard">
        <div className="header__left">
          <h3>Sản phẩm</h3>
          <p>Danh sách sản phẩm</p>
        </div>
      </div>
      <section className="ps-items-listing">
        <div className="ps-section__actions">
          <div className="width-left">
            <Search
              className="search-category"
              placeholder="Tìm kiếm sản phẩm..."
              listItem={products}
              // isDefault={isDefault}
            />
          </div>
          <div className="width-right d-flex">
            <ExcelBotton products={products} />
            <DropDownNewProduct />
          </div>
        </div>
        <div className="ps-section__header pb-1">
          <div className="ps-section__filter"></div>
        </div>
        <div className="ps-section__content">
          <div className="table-responsive">
            <TableListProduct />
          </div>
        </div>
      </section>
    </div>
  );
};
export default Products;