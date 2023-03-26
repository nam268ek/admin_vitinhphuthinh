import { DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { Dropdown, Switch, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { NAME_ACTION } from '../../../constants/const';
import { DataTypeProduct } from '../../../types/types';
import {
  getDeleteListProductService,
  getListProductService,
  getUpdateProductService,
  setAction,
  setItemSelectedAction,
  updateStateKeyProductAction,
} from '../../redux/Slices/ProductSlice';
import { RootState } from '../../redux/store/store';
import { formatMoney, openMessage } from '../../services/general.service';

export const TableListProduct: React.FC<any> = ({ setSelectedIds }) => {
  const { loading, products } = useSelector((state: RootState) => state.product);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const onSelectChange = (newSelectedRowKeys: React.Key[], selectedRows: DataTypeProduct[]) => {
    const ids = selectedRows.map((row) => row.id);
    setSelectedIds(ids);
  };

  const rowSelection: TableRowSelection<DataTypeProduct> = {
    onChange: onSelectChange,
  };

  const columns: ColumnsType<DataTypeProduct> = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      width: 300,
      render: (text: string, record: any) => (
        <span
          className="cursor-pointer text-blue-500 whitespace-nowrap text-ellipsis overflow-hidden"
          onClick={(e) => handleUpdateProduct(e, record)}
        >
          {text}
        </span>
      ),
    },
    {
      title: 'Giá gốc',
      dataIndex: 'price',
      key: 'price',
      ellipsis: true,
      width: 150,
      sorter: (a, b) => a.price - b.price,
      render: (price: number, record: any) => (
        <span className="font-medium opacity-75">{formatMoney.format(price)}</span>
      ),
    },
    {
      title: 'Giá bán',
      dataIndex: 'priceSale',
      key: 'priceSale',
      ellipsis: true,
      width: 150,
      sorter: (a, b) => a.priceSale - b.priceSale,
      render: (priceSale: number, record: any) => (
        <span className="font-medium">{formatMoney.format(priceSale)}</span>
      ),
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      width: 150,
      render: (category: any, record: any) => <span>{category?.name}</span>,
    },
    {
      title: 'Thương hiệu',
      dataIndex: 'brand',
      key: 'brand',
      width: 120,
      render: (brand: any, record: any) => <span>{brand?.name}</span>,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 120,
      sorter: (a, b) => a.quantity - b.quantity,
      render: (quantity: any) => <span className="price-product">{quantity}</span>,
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      width: 120,
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
      width: 250,
      render: (text: string) => <span>{moment(text).format('DD/MM/YYYY, h:mm:ss A')}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: (data: any, record: any) => (
        <Dropdown
          placement="bottomLeft"
          menu={{ items, onClick: (e: any) => handleMoreAction(e, record) }}
          trigger={['click']}
        >
          <MoreOutlined />
        </Dropdown>
      ),
    },
  ];

  const items = [
    {
      label: 'Remove',
      key: '1',
      icon: <DeleteOutlined />,
    },
  ];

  const handleMoreAction = async (event: any, record: any) => {
    const { key } = event;
    const { id } = record;
    switch (key) {
      case '1':
        try {
          await dispatch(getDeleteListProductService({ ids: [id] })).unwrap();
          await dispatch(getListProductService()).unwrap();
        } catch (error) {
          openMessage(error);
        }
        break;
    }
  };

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
    navigate(`${location.pathname}/${item.id}`);
  };

  const convertListProducts = (list: any[]) => {
    return list.map((item: any, index: number) => {
      const { id, name, status, brand, price, priceSale, updatedAt, quantity, category } = item;
      return {
        key: index + 1,
        id,
        name,
        price,
        priceSale,
        status,
        brand,
        quantity,
        category,
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
      scroll={{ x: 1200 }}
      sticky
    />
  );
};
