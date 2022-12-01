import React from 'react';
import { CreateCategory } from './Component/CreateCategory';
import { TableListCategory } from './Component/TableListCategory';

const Categories: React.FC = () => {
  return (
    <div id="category" className="ps-main__wrapper">
      <div className="header--dashboard">
        <div className="header__left">
          <h3 className="text-4xl">Danh mục</h3>
          <p>Danh sách danh mục</p>
        </div>
      </div>
      <section>
        <CreateCategory />
        <TableListCategory />
      </section>
    </div>
  );
};
export default Categories;
