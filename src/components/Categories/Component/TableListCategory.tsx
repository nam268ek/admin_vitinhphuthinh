import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Button, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NAME_ACTION } from '../../../constants/const';
import { DataTypeCategory } from '../../../types/types';
import { addAction, getListCategoryService, getRemoveCategoryService } from '../../redux/Slices/CategorySlice';
import { RootState } from '../../redux/store/store';
import { openMessage } from '../../services/general.service';
import { ICategories } from '../interfaces/categories.interface';
import { Edit, Edit3, Trash } from 'lucide-react';

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
      className: 'text-base font-medium',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      ellipsis: true,
      width: 150,
      className: 'text-base font-medium',
      render: (text: string) => <span className="text-zinc-500">{text}</span>,
    },
    {
      title: 'Page',
      dataIndex: 'slug',
      key: 'slug',
      ellipsis: true,
      width: 200,
      className: 'text-base font-medium',
      render: (text: string) => <span className="bg-blue-100 text-blue-700 pb-1 px-2 rounded-md">{text}</span>,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      ellipsis: true,
      width: 200,
      className: 'text-base font-medium',
      render: (text: string) => <span className="text-zinc-500">{moment(text).format('DD/MM/YYYY, h:mm:ss A')}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 100,
      className: 'text-base font-medium',
      render: (data, record) => (
        <div className={!disabledFieldCategory ? 'hidden' : 'flex gap-2'}>
          <span
            title="Sửa danh mục"
            onClick={() => handleEditCategory(record)}
            className="flex p-2 opacity-50 rounded-lg hover:bg-gray-200 hover:cursor-pointer hover:opacity-90 transition duration-300 ease-in-out"
          >
            <Edit3 size={20} />
          </span>
          <span
            title="Xóa danh mục"
            onClick={() => handleRemoveCategory(record)}
            className="flex p-2 opacity-50 rounded-lg hover:bg-gray-200 hover:cursor-pointer hover:opacity-90 transition duration-300 ease-in-out"
          >
            <Trash size={20} />
          </span>
        </div>
      ),
      // render: (text: string, record: any) => (
      //   <Space size="middle">
      //     <Button
      //       icon={<EditFilled />}
      //       disabled={!disabledFieldCategory}
      //       onClick={(e) => handleEditCategory(record)}
      //       className="bg-blue-100 border-0 text-blue-500"
      //     ></Button>
      //     <Button
      //       icon={<DeleteFilled />}
      //       danger
      //       disabled={!disabledFieldCategory}
      //       onClick={(e) => handleRemoveCategory(record)}
      //       className="bg-red-100 border-0 text-red-500 hover:bg-red-200 hover-text"
      //     ></Button>
      //   </Space>
      // ),
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
    <div className={itemSelected.length > 0 ? 'opacity-30' : 'opacity-100'}>
      <Table columns={columns} loading={loading} dataSource={data} scroll={{ x: 1200 }} sticky />
    </div>
  );
};
