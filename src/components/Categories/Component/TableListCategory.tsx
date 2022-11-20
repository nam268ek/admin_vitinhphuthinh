import { Space, Table } from 'antd';
import moment from 'moment';
import React from 'react';
import { MdDeleteForever, MdModeEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { NAME_ACTION } from '../../../constants/const';
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

  const columns = [
    {
      title: 'Vị trí',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Link',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (text: string) => <span>{moment(text).format('DD/MM/YYYY, h:mm:ss A')}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Link to="" className={disabledFieldCategory ? 'edit-item' : 'disable-field'}>
            <MdModeEdit size={20} onClick={(e) => handleEditCategory(record)} />
          </Link>
          <Link to="" className={disabledFieldCategory ? 'remove-item' : 'disable-field'}>
            <MdDeleteForever size={20} onClick={(e) => handleRemoveCategory(record)} />
          </Link>
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
    return list.map((category: ICategories) => {
      return { key: category.id, ...category };
    });
  };
  const data = convertDataSource(categories);

  return (
    <div className={itemSelected.length > 0 ? 'focus-edit' : 'ps-section__content'}>
      <div className="table-responsive">
        <Table columns={columns} loading={loading} dataSource={data} />
      </div>
    </div>
  );
};
