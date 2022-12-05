import { DownOutlined, SyncOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Dropdown, Menu, message, Space, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
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

  const handleActionDropdown = async (event: any) => {
    switch (event.key) {
      case '1':
        try {
          await dispatch(getDeleteListPostService({ ids: selectedIds })).unwrap();
          openMessage();
        } catch (error) {
          openMessage(error);
        }
        break;
      case '2':
        if (selectedIds.length === 1) {
          event.preventDefault();
          history.push(`${location.pathname}/${selectedIds[0]}`);
        } else {
          message.error('Vui lòng chỉ chọn 1 sản phẩm');
        }
        break;
      case '3':
        openModalStatusPosts();
        break;
    }
  };

  const items = [
    {
      label: ' Xoá đơn hàng',
      key: '1',
    },
    {
      label: 'Chỉnh sửa sản phẩm',
      key: '2',
    },
    {
      label: 'Update trạng thái',
      key: '3',
    },
  ];

  const columns: ColumnsType<DataTypePost> = [
    {
      title: 'Tên bài đăng',
      dataIndex: 'name',
      key: 'name',
      className: 'w-2/4',
      render: (customer: any, record: any) => (
        <div
          className="flex items-center w-full hover:cursor-pointer"
          onClick={(e) => handleUpdatePost(e, record)}
        >
          <Avatar shape="square" src={record?.images?.thumbUrl} size={40} />
          <span className="text-ellipsis text-sm text-[#5c5c5c] ml-2">{record?.name}</span>
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

  const handleStatusPost = (postStatus: string): JSX.Element => {
    switch (postStatus) {
      case ORDER_STATUS.CREATE:
        return <Badge color="rgba(0,0,0,.46)" count={postStatus} />;
      case ORDER_STATUS.PENDING:
        return (
          <Tooltip title="Đơn hàng đang được xử lý">
            <Badge color="hwb(205 6% 9%)" count={postStatus} />
          </Tooltip>
        );
      case ORDER_STATUS.CANCEL:
        return <Badge key={Math.random()} count={postStatus} />;
      default:
        return (
          <Badge
            className="site-badge-count-109"
            count={postStatus}
            style={{ backgroundColor: '#52c41a' }}
          />
        );
    }
  };

  const handleUpdatePost = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, item: any) => {
    e.preventDefault();
    dispatch(setPostAction(NAME_ACTION.UPDATE_POST));
    history.push(`${location.pathname}/${item.id}`);
  };

  const convertListPosts = (list: any[]) => {
    return (
      list?.map((item: any, index: number) => {
        const { id, images, name, status, updatedAt } = item;
        return {
          key: index + 1,
          id,
          name,
          status,
          images,
          updatedAt,
        };
      }) || []
    );
  };
  const data: DataTypePost[] = convertListPosts(posts);

  const handleSyncData = async () => {
    const key = 'sync_data';
    try {
      message.loading({ content: 'Syncing...', key });
      await dispatch(getListPostsService()).unwrap();
      openMessage(undefined, key);
    } catch (error) {
      openMessage(error, key);
    }
  };

  const menu = {
    items,
    onClick: (e: any) => handleActionDropdown(e),
  };

  return (
    <>
      {/* <ModelStatus
        setSelectedIds={setSelectedIds}
        listItemSelect={selectedIds}
        open={isModalOpen}
        setOpen={setIsModalOpen}
      /> */}
      <Space align="center" className="mb-2">
        <Dropdown.Button
          loading={loading}
          disabled={!hasSelected}
          className="d-flex justify-content-center align-items-center"
          menu={menu}
          trigger={['click']}
          icon={<DownOutlined className="d-flex justify-content-center align-items-center" />}
        >
          <Space>{loading ? 'Processing...' : 'Action'}</Space>
        </Dropdown.Button>
        <Tooltip placement="right" title="Refresh & Sync data">
          <Button
            className="d-flex justify-content-center align-items-center"
            type="default"
            icon={<SyncOutlined spin={loading} />}
            onClick={handleSyncData}
          ></Button>
        </Tooltip>
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
