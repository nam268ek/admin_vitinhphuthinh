import { DownOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, message, Space, Table, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { NAME_ACTION } from '../../../constants/const';
import { DataTypeOrder, IOrder } from '../../../types/types';
import { history } from '../../../utils/history';
import { getListOrderService } from '../../redux/Slices/OrderSlice';
import {
  getDeleteListProductService,
  getUpdateProductService,
  setAction,
  setItemSelectedAction,
} from '../../redux/Slices/ProductSlice';
import { RootState } from '../../redux/store/store';
import { openMessage } from '../../services/general.service';

export const TableListOrders: React.FC = () => {
  const { loading, orders } = useSelector((state: RootState) => state.order);
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  const dispatch = useDispatch();
  const location = useLocation();

  const hasSelected = selectedIds.length > 0 && orders.length > 0;
  const onSelectChange = (newSelectedRowKeys: React.Key[], selectedRows: DataTypeOrder[]) => {
    const ids = selectedRows.map((row) => row.id);
    setSelectedIds(ids);
  };

  const rowSelection: TableRowSelection<DataTypeOrder> = {
    onChange: onSelectChange,
  };

  const handleActionDropdown = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    key: number,
  ) => {
    switch (key) {
      case 1:
        await dispatch(getDeleteListProductService({ ids: selectedIds }));
        break;
      case 2:
        if (selectedIds.length === 1) {
          e.preventDefault();
          // history.push(`${location.pathname}/update?id=${selectedIds[0]}`);
          history.push(`${location.pathname}/${selectedIds[0]}`);
        } else {
          message.error('Vui lòng chỉ chọn 1 sản phẩm');
        }
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
      ]}
    />
  );

  const columns: ColumnsType<DataTypeOrder> = [
    {
      title: 'Mã đơn',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      render: (orderNumber: string) => <span>{orderNumber}</span>,
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
      render: (orderStatus: string) => (
        <>
          {orderStatus === 'pending' ? (
            <Tag color="cyan" key={Math.random()}>
              {orderStatus}
            </Tag>
          ) : orderStatus === 'cancel' ? (
            <Tag color="red" key={Math.random()}>
              {orderStatus}
            </Tag>
          ) : (
            <Tag color="green" key={Math.random()}>
              {orderStatus}
            </Tag>
          )}
        </>
      ),
    },
  ];
  const changeStatusProduct = async (checked: boolean, item: any) => {
    await dispatch(getUpdateProductService({ productId: item.id, status: checked }));
  };

  const handleUpdateProduct = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    item: any,
  ) => {
    e.preventDefault();
    dispatch(setAction(NAME_ACTION.UPDATE_PRODUCT));

    const product = orders.filter((o) => o.id === item.id);
    dispatch(setItemSelectedAction(product));
    // history.push(`${location.pathname}/update?id=${item.id}`);
    history.push(`${location.pathname}/${item.id}`);
  };

  const convertListOrders = (list: IOrder[]) => {
    return (
      list?.map((item: IOrder, index: number) => {
        const { id, orderQty, orderDate, orderStatus, totalOrderValue, orderNumber } = item;
        return {
          key: index + 1,
          id,
          orderQty,
          orderDate,
          orderStatus,
          totalOrderValue,
          orderNumber,
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
      <Dropdown.Button
        loading={loading}
        disabled={!hasSelected}
        className="dropdown-action"
        overlay={menu}
        trigger={['click']}
        icon={<DownOutlined />}
      >
        <Space>{loading ? 'Processing...' : 'Action'}</Space>
      </Dropdown.Button>
      <Space>
        <Tooltip placement="right" title="Refresh & Sync data">
          <Button
            style={{ marginLeft: '10px' }}
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
