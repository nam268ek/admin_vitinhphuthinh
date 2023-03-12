import { DeleteOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Space, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { NAME_ACTION, ORDER_STATUS } from '../../../constants/const';
import { DataTypePost } from '../../../types/types';
import { history } from '../../../utils/history';
import {
  getDeleteListPostService,
  getListPostsService,
  setPostAction,
} from '../../redux/Slices/PostSlice';
import { RootState } from '../../redux/store/store';
import { openMessage } from '../../services/general.service';

export const TableListPosts: React.FC = () => {
  const { loading, posts } = useSelector((state: RootState) => state.post);
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const location = useLocation();

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
      className: 'w-2/4',
      render: (customer: any, record: any) => (
        <div
          className="flex items-center w-full hover:cursor-pointer"
          onClick={(e) => handleUpdatePost(e, record)}
        >
          <Avatar shape="square" src={record?.images?.thumbUrl} size={40} />
          <span className="text-ellipsis text-sm text-[#5c5c5c] ml-2">{record?.namePost}</span>
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <span>{status}</span>,
    },
    {
      title: 'Ngày đăng',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (updatedAt: any) => <span>{moment(updatedAt).format('L, h:mm:ss A')}</span>,
    },
  ];

  const handleUpdatePost = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, item: any) => {
    e.preventDefault();
    dispatch(setPostAction(NAME_ACTION.UPDATE_POST));
    history.push(`${location.pathname}/${item.id}`);
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
      <Space align="center" className="mb-2">
        <Button
          className="d-flex justify-content-center align-items-center"
          type="default"
          disabled={!hasSelected}
          danger
          icon={<DeleteOutlined spin={loading} />}
          onClick={handleSyncData}
        ></Button>
      </Space>
      <Table
        rowKey={(record) => record.id}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        loading={loading}
      />
    </>
  );
};
