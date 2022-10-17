import { Space, Table } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getListCategoryService, getRemoveCategoryService } from "../../redux/Slices/CategorySlice";
import { RootState } from "../../redux/store/store";
import { ITableListCategoryProps, ICategories } from "../interfaces/categories.interface";

export const TableListCategory: React.FC<ITableListCategoryProps> = ({ setItemEdit, categories }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.category);
  const [enabledEdit, setEnabledEdit] = React.useState<boolean>(false);

  const columns = [
    {
      title: "Vị trí",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Link",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Ngày tạo",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text: string) => <span>{moment(text).format("DD/MM/YYYY, h:mm:ss A")}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: any) => (
        <Space size="middle">
          <Link to="" className="edit-item">
            <MdModeEdit size={20} onClick={(e) => handleEditCategory(record)} />
          </Link>
          <Link to="" className="remove-item">
            <MdDeleteForever size={20} onClick={(e) => handleRemoveCategory(record)} />
          </Link>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getListCategoryService());
  }, [dispatch]);

  const handleRemoveCategory = async (record: any) => {
    const response = await dispatch(getRemoveCategoryService({ categoryId: record.id })).unwrap();
    if (response) await dispatch(getListCategoryService());
  };

  const handleEditCategory = async (record: any) => {
    setEnabledEdit(true);
    setItemEdit(record.id);
  };

  const convertDataSource = (categories: ICategories[]) => {
    return categories.map((category: ICategories) => {
      return { key: category.id, ...category };
    });
  };
  const data = convertDataSource(categories);

  return (
    <div className={enabledEdit ? "focus-edit" : "ps-section__content"}>
      <div className="table-responsive">
        <Table columns={columns} loading={loading} dataSource={data} />
      </div>
    </div>
  );
};
