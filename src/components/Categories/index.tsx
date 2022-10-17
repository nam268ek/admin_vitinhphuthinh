import React from "react";
import { useSelector } from "react-redux";
import { CreateCategory } from "./Component/CreateCategory";
import { TableListCategory } from "./Component/TableListCategory";
import { ICategories } from "./interfaces/categories.interface";

const Categories: React.FC = () => {
  const [itemEdit, setItemEdit] = React.useState<ICategories[]>([]);
  const { listAllCategory } = useSelector((state: any) => state.category);

  return (
    <div id="category" className="ps-main__wrapper">
      <div className="header--dashboard">
        <div className="header__left">
          <h3>Danh mục</h3>
          <p>Danh sách danh mục</p>
        </div>
      </div>
      <section className="ps-items-listing">
        <CreateCategory itemEdit={itemEdit} />
        <TableListCategory setItemEdit={setItemEdit} categories={listAllCategory} />
      </section>
    </div>
  );
};
export default Categories;
