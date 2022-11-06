import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, message, Space, Switch, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { DataTypeProduct } from '../../../types/types';
import { history } from '../../../utils/history';
import {
  getDeleteListProductService,
  getUpdateProductService,
} from '../../redux/Slices/ProductSlice';
import { RootState } from '../../redux/store/store';
import { formatMoney } from '../../services/general.service';

export const TableListProduct: React.FC = () => {
  const { loading, products } = useSelector((state: RootState) => state.product);
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  const dispatch = useDispatch();
  const location = useLocation();

  const hasSelected = selectedIds.length > 0 && products.length > 0;
  const onSelectChange = (newSelectedRowKeys: React.Key[], selectedRows: DataTypeProduct[]) => {
    const ids = selectedRows.map((row) => row.id);
    setSelectedIds(ids);
  };

  const rowSelection: TableRowSelection<DataTypeProduct> = {
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
          history.push(`${location.pathname}/update?id=${selectedIds[0]}`);
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
              Xoá sản phẩm
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

  const columns: ColumnsType<DataTypeProduct> = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'key',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <span className="name-product" onClick={(e) => handleUpdateProduct(e, record)}>
          {text}
        </span>
      ),
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: any) => (
        <span className="price-product">{formatMoney.format(Number(price))}</span>
      ),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      render: (value: any, item: DataTypeProduct) => (
        <Switch key={item.id} checked={value} onChange={(e) => changeStatusProduct(e, item)} />
      ),
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (text: string) => <span>{moment(text).format('DD/MM/YYYY, h:mm:ss A')}</span>,
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
    history.push(`${location.pathname}/update?id=${item.id}`);
  };

  const convertListProducts = (list: any[]) => {
    return list.map((item: any, index: number) => {
      const { id, name, status, price, updatedAt } = item;
      return {
        key: index + 1,
        id,
        name,
        price,
        status,
        updatedAt,
      };
    });
  };
  const data: DataTypeProduct[] = convertListProducts(products);

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
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} loading={loading} />
    </>
  );
};
