import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Button, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NAME_ACTION } from '../../../constants/const';
import { DataTypeCategory } from '../../../types/types';
import {
  addAction,
  getListCategoryService,
  getRemoveCategoryService,
} from '../../redux/Slices/CategorySlice';
import { RootState } from '../../redux/store/store';
import { openMessage } from '../../services/general.service';
import { ICategories } from '../interfaces/categories.interface';

export const TableListCategory: React.FC = () => {
  const { loading, itemSelected, categories } = useSelector((state: RootState) => state.category);
  const disabledFieldCategory = itemSelected.length === 0;

  const dispatch = useDispatch();

  const columns: ColumnsType<DataTypeCategory> = [
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      width: 200,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      ellipsis: true,
      width: 150,
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
      ellipsis: true,
      width: 200,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      ellipsis: true,
      width: 200,
      render: (text: string) => <span>{moment(text).format('DD/MM/YYYY, h:mm:ss A')}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button
            icon={<EditFilled />}
            disabled={!disabledFieldCategory}
            onClick={(e) => handleEditCategory(record)}
            className="bg-blue-100 border-0 text-blue-500"
          ></Button>
          <Button
            icon={<DeleteFilled />}
            danger
            disabled={!disabledFieldCategory}
            onClick={(e) => handleRemoveCategory(record)}
            className="bg-red-100 border-0 text-red-500 hover:bg-red-200 hover-text"
          ></Button>
        </Space>
      ),
    },
  ];

  const handleRemoveCategory = async (record: any) => {
    try {
      await dispatch(getRemoveCategoryService({ categoryId: record.id })).unwrap();
      await dispatch(getListCategoryService());
      openMessage();
    } catch (error) {
      openMessage(error);
    }
  };

  const handleEditCategory = async (record: any) => {
    dispatch(addAction({ data: record, actionName: NAME_ACTION.UPDATE_CATEGORY }));
  };

  const convertDataSource = (list: ICategories[]) => {
    return list.map((item: ICategories, index: number) => {
      const { id, name, category, slug, path, parent, updatedAt } = item;
      return { key: index + 1, id, name, category, slug, path, parent, updatedAt };
    });
  };
  const data: DataTypeCategory[] = convertDataSource(categories);

  return (
    <div className={itemSelected.length > 0 ? 'focus-edit' : 'ps-section__content'}>
      <div className="table-responsive">
        <Table columns={columns} loading={loading} dataSource={data} scroll={{ x: 1200 }} sticky />
      </div>
    </div>
  );
};
