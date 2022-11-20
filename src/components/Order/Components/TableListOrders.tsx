import { DownOutlined, SyncOutlined } from '@ant-design/icons';
import { Badge, Button, Dropdown, Menu, message, Space, Table, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { NAME_ACTION, ORDER_STATUS } from '../../../constants/const';
import { DataTypeOrder, IOrder } from '../../../types/types';
import { history } from '../../../utils/history';
import { getListOrderService, setOrderAction } from '../../redux/Slices/OrderSlice';
import { getDeleteListProductService } from '../../redux/Slices/ProductSlice';
import { RootState } from '../../redux/store/store';
import { openMessage } from '../../services/general.service';
import { ModelStatus } from './ModelStatus';

export const TableListOrders: React.FC = () => {
  const { loading, orders } = useSelector((state: RootState) => state.order);
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const location = useLocation();

  const hasSelected = selectedIds.length > 0 && orders.length > 0;
  const onSelectChange = (newSelectedRowKeys: React.Key[], selectedRows: DataTypeOrder[]) => {
    const ids = selectedRows.map((row) => row.id);
    setSelectedIds(ids);
  };

  const openModalStatusOrders = () => {
    setIsModalOpen(!isModalOpen);
  };

  const rowSelection: TableRowSelection<DataTypeOrder> = {
    selectedRowKeys: selectedIds,
    onChange: onSelectChange,
  };

  const handleActionDropdown = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    key: number,
  ) => {
    switch (key) {
      case 1:
        try {
          await dispatch(getDeleteListProductService({ ids: selectedIds })).unwrap();
          openMessage();
        } catch (error) {
          openMessage(error);
        }
        break;
      case 2:
        if (selectedIds.length === 1) {
          e.preventDefault();
          history.push(`${location.pathname}/${selectedIds[0]}`);
        } else {
          message.error('Vui lòng chỉ chọn 1 sản phẩm');
        }
        break;
      case 3:
        openModalStatusOrders();
        break;
    }
  };

  const menu = (
    <Menu
      items={[
        {
          label: (
            <Link to="" onClick={(e) => handleActionDropdown(e, 1)}>
              Xoá đơn hàng
            </Link>
          ),
          key: '0',
        },
        {
          label: (
            <Link to="" onClick={(e) => handleActionDropdown(e, 2)}>
              Chỉnh sửa sản phẩm
            </Link>
          ),
          key: '1',
        },
        {
          label: (
            <Link to="" onClick={(e) => handleActionDropdown(e, 3)}>
              Update trạng thái
            </Link>
          ),
          key: '3',
        },
      ]}
    />
  );

  const columns: ColumnsType<DataTypeOrder> = [
    {
      title: 'Khách hàng',
      dataIndex: 'customer',
      key: 'customer',
      render: (customer: any, record: any) => (
        <span className="name-product" onClick={(e) => handleUpdateProduct(e, record)}>
          {customer.email}
        </span>
      ),
    },
    {
      title: 'Giá trị',
      dataIndex: 'totalOrderValue',
      key: 'totalOrderValue',
      render: (totalOrderValue: string) => <span>{totalOrderValue}</span>,
    },
    {
      title: 'Số lượng',
      dataIndex: 'orderQty',
      key: 'orderQty',
      render: (orderQty: string) => <span>{orderQty}</span>,
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'orderDate',
      key: 'orderDate',
      render: (orderDate: any) => <span>{moment(orderDate).format('L, h:mm:ss A')}</span>,
    },
    {
      title: 'Trạng thái',
      key: 'orderStatus',
      dataIndex: 'orderStatus',
      render: (orderStatus: string) => handleStatusOrder(orderStatus),
    },
  ];

  const handleStatusOrder = (orderStatus: string): JSX.Element => {
    switch (orderStatus) {
      case ORDER_STATUS.CREATE:
        return <Badge color="rgba(0,0,0,.46)" count={orderStatus} />;
      case ORDER_STATUS.PENDING:
        return (
          <Tooltip title="Đơn hàng đang được xử lý">
            <Badge color="hwb(205 6% 9%)" count={orderStatus} />
          </Tooltip>
        );
      case ORDER_STATUS.CANCEL:
        return <Badge key={Math.random()} count={orderStatus} />;
      default:
        return (
          <Badge
            className="site-badge-count-109"
            count={orderStatus}
            style={{ backgroundColor: '#52c41a' }}
          />
        );
    }
  };

  const handleUpdateProduct = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    item: any,
  ) => {
    e.preventDefault();
    dispatch(setOrderAction(NAME_ACTION.UPDATE_ORDER));
    history.push(`${location.pathname}/${item.id}`);
  };

  const convertListOrders = (list: IOrder[]) => {
    return (
      list?.map((item: IOrder, index: number) => {
        const { id, orderQty, orderDate, orderStatus, totalOrderValue, customer } = item;
        return {
          key: index + 1,
          id,
          orderQty,
          orderDate,
          orderStatus,
          totalOrderValue,
          customer,
        };
      }) || []
    );
  };
  const data: DataTypeOrder[] = convertListOrders(orders);

  const handleSyncData = async () => {
    const key = 'sync_data';
    try {
      message.loading({ content: 'Syncing...', key });
      await dispatch(getListOrderService()).unwrap();
      openMessage(undefined, key);
    } catch (error) {
      openMessage(error, key);
    }
  };

  return (
    <>
      <ModelStatus
        setSelectedIds={setSelectedIds}
        listItemSelect={selectedIds}
        open={isModalOpen}
        setOpen={setIsModalOpen}
      />
      <Space align="center" className="mb-2">
        <Dropdown.Button
          loading={loading}
          disabled={!hasSelected}
          className="d-flex justify-content-center align-items-center"
          overlay={menu}
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
