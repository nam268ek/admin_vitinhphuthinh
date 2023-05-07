/* eslint-disable import/no-unresolved */
import { Image, Space, Switch, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import { Edit3, Plus, Trash } from 'lucide-react';
import moment from 'moment';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getThumbUrl } from 'src/utils';
import { BASE_URL, NAME_ACTION } from '../../../constants/const';
import { DataTypePost } from '../../../types/types';
import {
  getDeleteListPostService,
  getListPostsService,
  getUpdateManyPostService,
  setPostAction,
} from '../../redux/Slices/PostSlice';
import { RootState } from '../../redux/store/store';
import { openMessage } from '../../services/general.service';
import { Button } from '../../ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/Select';
import { FilterButton } from './FilterButton';
import { message } from 'antd';

export const TableListPosts: React.FC = () => {
  const { t } = useTranslation();
  const { loading, posts } = useSelector((state: RootState) => state.post);
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const hasSelected = selectedIds.length > 0 && posts.length > 0;
  const onSelectChange = (newSelectedRowKeys: React.Key[], selectedRows: DataTypePost[]) => {
    const ids = selectedRows.map((row) => row.id);
    setSelectedIds(ids);
  };

  const openModalStatusPosts = () => {
    setIsModalOpen(!isModalOpen);
  };

  const rowSelection: TableRowSelection<DataTypePost> = {
    selectedRowKeys: selectedIds,
    onChange: onSelectChange,
  };

  const columns: ColumnsType<DataTypePost> = [
    {
      title: 'Tên bài đăng',
      dataIndex: 'namePost',
      key: 'namePost',
      className: 'text-base font-medium',
      fixed: 'left',
      width: 400,
      render: (customer, record: any) => (
        <div className="flex items-start w-full hover:cursor-pointer" onClick={(e) => handleUpdatePost(e, record)}>
          <div className="w-[50px] h-[50px] relative">
            <Image
              className="object-cover w-full h-full absolute rounded-md"
              preview={false}
              style={{ width: '100%', height: '100%' }}
              rootClassName="w-[50px] h-[50px] rounded-md border border-solid"
              placeholder={<div className="w-[50px] h-[50px] animate-pulse bg-zinc-700"></div>}
              src={getThumbUrl(record?.images?.thumbUrl, { width: 150, height: 150 })}
              alt={record?.name}
              loading="lazy"
            />
          </div>
          <span className="text-[#5c5c5c] overflow-auto ml-2 hover:text-blue-800 h-[50px]">{record?.namePost}</span>
        </div>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      width: 100,
      className: 'text-base font-medium',
      render: (value, item: DataTypePost) => (
        <Switch
          key={item.id}
          checked={value === 'Y'}
          checkedChildren="ON"
          unCheckedChildren="OFF"
          onChange={(e) => changeStatusProduct(e, item)}
        />
      ),
    },
    {
      title: 'Danh mục',
      key: 'category',
      dataIndex: 'category',
      width: 250,
      className: 'text-base font-medium',
      render: (value, record: DataTypePost) => <span className="text-[#5c5c5c]">{record?.category?.name}</span>,
    },
    {
      title: 'URL bài viết',
      dataIndex: 'urlSlug',
      key: 'urlSlug',
      className: 'text-base font-medium',
      width: 300,
      ellipsis: true,
      render: (slug: string, record) => (
        <span
          onClick={() => handleCopy(record)}
          className="bg-blue-100 transition duration-300 ease-in-out hover:bg-blue-200 hover:cursor-pointer text-blue-700 pb-1 px-2 rounded-md whitespace-nowrap"
        >{`${BASE_URL}${record?.category.slug}/${slug}`}</span>
      ),
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      className: 'text-base font-medium',
      width: 250,
      render: (updatedAt) => <span className="text-[#5c5c5c]">{moment(updatedAt).format('DD/MM/YYYY, h:mm:ss A')}</span>,
    },
    {
      title: '',
      key: 'action',
      fixed: 'right',
      width: 100,
      className: 'text-base font-medium',
      render: (data, record) => (
        <div className="flex gap-2">
          <span
            title="Sửa bài đăng"
            onClick={() => handleMoreAction(record, 'edit')}
            className="flex p-2 opacity-50 rounded-lg hover:bg-gray-200 hover:cursor-pointer hover:opacity-90 transition duration-300 ease-in-out"
          >
            <Edit3 size={18} />
          </span>
          <span
            title="Xóa bài đăng"
            onClick={() => handleMoreAction(record, 'delete')}
            className="flex p-2 opacity-50 rounded-lg hover:bg-gray-200 hover:cursor-pointer hover:opacity-90 transition duration-300 ease-in-out"
          >
            <Trash size={18} />
          </span>
        </div>
      ),
    },
  ];

  const handleCopy = (record: DataTypePost) => {
    //open link in new tab
    window.open(`${BASE_URL}${record?.category.slug}/${record?.urlSlug}`, '_blank');
    // navigator.clipboard.writeText(`${BASE_URL}${record?.category.slug}/${record?.urlSlug}`);
    // message.success('Đã copy link bài viết');
  };

  const changeStatusProduct = async (checked: boolean, item: DataTypePost) => {
    try {
      await dispatch(getUpdateManyPostService({ ids: [item.id], status: checked ? 'Y' : 'N' })).unwrap();
      await dispatch(getListPostsService()).unwrap();
    } catch (error) {
      openMessage(error);
    }
  };

  const handleMoreAction = async (record: DataTypePost, type: 'edit' | 'delete') => {
    const { id } = record;
    switch (type) {
      case 'delete':
        try {
          await dispatch(getDeleteListPostService({ ids: [id] })).unwrap();
          await dispatch(getListPostsService()).unwrap();
        } catch (error) {
          openMessage(error);
        }
        break;
      case 'edit':
        dispatch(setPostAction(NAME_ACTION.UPDATE_POST));
        navigate(`${location.pathname}/${id}`);
        break;
    }
  };

  const handleUpdatePost = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, item: any) => {
    e.preventDefault();
    dispatch(setPostAction(NAME_ACTION.UPDATE_POST));
    navigate(`${location.pathname}/${item.id}`);
  };

  const data: DataTypePost[] = posts?.map((item: DataTypePost, index: number) => ({ ...item, key: index + 1 })) || [];

  const handleSyncData = async () => {
    try {
      await dispatch(getDeleteListPostService({ ids: selectedIds })).unwrap();
      await dispatch(getListPostsService()).unwrap();
      openMessage();
    } catch (error) {
      openMessage(error);
    }
  };

  const handleNewPost = () => {
    dispatch(setPostAction(NAME_ACTION.CREATE_POST));
    navigate(`${location.pathname}/new`);
  };

  return (
    <>
      <Space align="center" className="mb-4 mt-2 w-full flex justify-between">
        <Button
          onClick={handleNewPost}
          className="border-0 text-base flex gap-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:cursor-pointer duration-700 transition-colors hover:from-blue-400 hover:via-blue-500 hover:to-blue-600"
        >
          <Plus size={18} />
          {t('new')}
        </Button>
        <FilterButton />
      </Space>
      <Table
        rowKey={(record) => record.id}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        loading={loading}
        scroll={{ x: 1200 }}
        sticky
      />
    </>
  );
};
