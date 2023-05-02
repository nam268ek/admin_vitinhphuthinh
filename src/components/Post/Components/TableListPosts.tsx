import { Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import { Plus } from 'lucide-react';
import moment from 'moment';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { NAME_ACTION } from '../../../constants/const';
import { DataTypePost } from '../../../types/types';
import { getDeleteListPostService, getListPostsService, setPostAction } from '../../redux/Slices/PostSlice';
import { RootState } from '../../redux/store/store';
import { openMessage } from '../../services/general.service';
import { Button } from '../../ui/Button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../ui/Select';

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
      className: 'w-2/4 text-base font-medium',
      render: (customer, record: any) => (
        <div className="flex items-center w-full hover:cursor-pointer" onClick={(e) => handleUpdatePost(e, record)}>
          <img
            src={record?.images?.thumbUrl}
            alt={record?.images?.name}
            className="w-10 h-10 object-cover object-top rounded-md"
            loading="lazy"
          />
          <span className="text-ellipsis text-sm text-[#5c5c5c] ml-2">{record?.namePost}</span>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      className: 'text-base font-medium',
      width: 120,
      render: (status: string) => <span>{status}</span>,
    },
    {
      title: 'Ngày đăng',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      className: 'text-base font-medium',
      render: (updatedAt: any) => <span>{moment(updatedAt).format('L, h:mm:ss A')}</span>,
    },
  ];

  const handleUpdatePost = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, item: any) => {
    e.preventDefault();
    dispatch(setPostAction(NAME_ACTION.UPDATE_POST));
    navigate(`${location.pathname}/${item.id}`);
  };

  const convertListPosts = (list: any[]) => {
    return (
      list?.map((item: any, index: number) => {
        const { id, images, namePost, status, updatedAt } = item;
        return {
          key: index + 1,
          id,
          namePost,
          status,
          images,
          updatedAt,
        };
      }) || []
    );
  };
  const data: DataTypePost[] = convertListPosts(posts);

  const handleSyncData = async () => {
    try {
      await dispatch(getDeleteListPostService({ ids: selectedIds })).unwrap();
      await dispatch(getListPostsService()).unwrap();
      openMessage();
    } catch (error) {
      openMessage(error);
    }
  };

  return (
    <>
      <Space align="center" className="mb-4 mt-2 w-full flex justify-between">
        {/* <Button  label="new" icon={<Plus size={18} />} /> */}
        <Button className="border-0 text-base flex gap-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:cursor-pointer duration-700 transition-colors hover:from-blue-400 hover:via-blue-500 hover:to-blue-600">
          <Plus size={18} />
          {t('new')}
        </Button>
        <Space>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </Space>
      </Space>
      <Table rowKey={(record) => record.id} rowSelection={rowSelection} columns={columns} dataSource={data} loading={loading} />
    </>
  );
};
