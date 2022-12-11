import { Switch, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { NAME_ACTION } from '../../../constants/const';
import { DataTypeProduct } from '../../../types/types';
import { history } from '../../../utils/history';
import {
  getUpdateProductService,
  setAction,
  setItemSelectedAction,
  updateStateKeyProductAction,
} from '../../redux/Slices/ProductSlice';
import { RootState } from '../../redux/store/store';
import { formatMoney } from '../../services/general.service';

export const TableListProduct: React.FC<any> = ({ setSelectedIds }) => {
  const { loading, products } = useSelector((state: RootState) => state.product);

  const dispatch = useDispatch();
  const location = useLocation();

  const onSelectChange = (newSelectedRowKeys: React.Key[], selectedRows: DataTypeProduct[]) => {
    const ids = selectedRows.map((row) => row.id);
    setSelectedIds(ids);
  };

  const rowSelection: TableRowSelection<DataTypeProduct> = {
    onChange: onSelectChange,
  };

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
        <span
          className="cursor-pointer hover:text-blue-500 transition-colors"
          onClick={(e) => handleUpdateProduct(e, record)}
        >
          {text}
        </span>
      ),
    },
    {
      title: 'Giá bán',
      dataIndex: 'priceSale',
      key: 'priceSale',
      render: (priceSale: any) => (
        <span className="price-product">{formatMoney.format(Number(priceSale))}</span>
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity: any) => <span className="price-product">{quantity}</span>,
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      render: (value: any, item: DataTypeProduct) => (
        <Switch
          key={item.id}
          checked={value}
          checkedChildren="ON"
          unCheckedChildren="OFF"
          onChange={(e) => changeStatusProduct(e, item)}
        />
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
    dispatch(setAction(NAME_ACTION.UPDATE_PRODUCT));

    const product = products.filter((o) => o.id === item.id);
    dispatch(setItemSelectedAction(product));
    dispatch(updateStateKeyProductAction(product[0]?.categoryKey));
    history.push(`${location.pathname}/${item.id}`);
  };

  const convertListProducts = (list: any[]) => {
    return list.map((item: any, index: number) => {
      const { id, name, status, priceSale, updatedAt, quantity } = item;
      return {
        key: index + 1,
        id,
        name,
        priceSale,
        status,
        quantity,
        updatedAt,
      };
    });
  };
  const data: DataTypeProduct[] = convertListProducts(products);

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
