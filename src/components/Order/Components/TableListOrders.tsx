import { Badge, Popover, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { NAME_ACTION, ORDER_STATUS } from '../../../constants/const';
import { DataTypeOrder, IOrder } from '../../../types/types';
import { history } from '../../../utils/history';
import { setOrderAction } from '../../redux/Slices/OrderSlice';
import { RootState } from '../../redux/store/store';
import { formatMoney } from '../../services/general.service';

export const TableListOrders: React.FC<any> = ({ setSelectedIds, selectedIds }) => {
  const { loading, orders } = useSelector((state: RootState) => state.order);

  const dispatch = useDispatch();
  const location = useLocation();

  const onSelectChange = (newSelectedRowKeys: React.Key[], selectedRows: DataTypeOrder[]) => {
    const ids = selectedRows.map((row) => row.id);
    setSelectedIds(ids);
  };

  const rowSelection: TableRowSelection<DataTypeOrder> = {
    selectedRowKeys: selectedIds,
    onChange: onSelectChange,
  };

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
      render: (totalOrderValue: string) => (
        <span>{formatMoney.format(Number(totalOrderValue))}</span>
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'orderQty',
      key: 'orderQty',
      render: (orderQty: string, record: any) => (
        <Popover content={contentItems(record)}>
          <span>{orderQty} items</span>
        </Popover>
      ),
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'orderDate',
      key: 'orderDate',
      render: (orderDate: any) => <span>{moment(orderDate).format('DD/MM/YYYY, h:mm:ss A')}</span>,
    },
    {
      title: 'Trạng thái',
      key: 'orderStatus',
      dataIndex: 'orderStatus',
      render: (orderStatus: string) => handleStatusOrder(orderStatus),
    },
  ];

  const contentItems = (record: any): JSX.Element => {
    console.log(record);
    return <div></div>;
  };

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
        const { id, orderQty, orderDate, orderStatus, totalOrderValue, customer, orderedItem } =
          item;
        return {
          key: index + 1,
          id,
          orderQty,
          orderDate,
          orderStatus,
          orderedItem,
          totalOrderValue,
          customer,
        };
      }) || []
    );
  };
  const data: DataTypeOrder[] = convertListOrders(orders);

  return (
    <Table
      rowKey={(record) => record.id}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={data}
      loading={loading}
    />
  );
};
