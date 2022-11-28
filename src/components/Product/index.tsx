import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { Search } from '../Search/Search';
import { DropDownNewProduct } from './Components/DropDownNewProduct';
import { ExcelBotton } from './Components/ExcelBotton';
import { TableListProduct } from './Components/TableListProducts';

export const Products: React.FC = () => {
  const { products } = useSelector((state: RootState) => state.product);

  return (
    <div id="product">
      <div className="ps-main__wrapper">
        <div className="header--dashboard">
          <div className="header__left">
            <h3 className="text-4xl">Sản phẩm</h3>
            <p>Danh sách sản phẩm</p>
          </div>
        </div>
        <section className="ps-items-listing">
          <div className="ps-section__actions">
            <div className="width-left">
              <Search listItems={products} />
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
    </div>
  );
};
