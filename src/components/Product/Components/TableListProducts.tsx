/* eslint-disable react/display-name */
import { DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { Dropdown, Switch, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { FilterValue, TableRowSelection } from 'antd/es/table/interface';
import { CheckCircle2, Edit, Trash, XCircle } from 'lucide-react';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { NAME_ACTION } from '../../../constants/const';
import { DataTypeProduct } from '../../../types/types';
import {
  getDeleteListProductService,
  getListProductService,
  getUpdateManyProductService,
  getUpdateProductService,
  setAction,
} from '../../redux/Slices/ProductSlice';
import { RootState } from '../../redux/store/store';
import { formatMoney, openMessage } from '../../services/general.service';

const TableListProduct: React.FC<any> = ({ setSelectedIds, selectedIds }) => {
  const { loading, products } = useSelector((state: RootState) => state.product);
  const { brands } = useSelector((state: RootState) => state.brand);
  const { categories } = useSelector((state: RootState) => state.category);
  const [filteredInfo, setFilteredInfo] = useState<Record<any, FilterValue | null>>({});

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const onSelectChange = (newSelectedRowKeys: React.Key[], selectedRows: DataTypeProduct[]) => {
    const ids = selectedRows.map((row) => row.id);
    setSelectedIds(ids);
  };

  const rowSelection: TableRowSelection<DataTypeProduct> = {
    onChange: onSelectChange,
    selectedRowKeys: selectedIds,
  };

  const columns: ColumnsType<DataTypeProduct> = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      fixed: 'left',
      width: 500,
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
      render: (price: number, record: any) => <span className="font-medium opacity-75">{formatMoney.format(price)}</span>,
    },
    {
      title: 'Giá bán',
      dataIndex: 'priceSale',
      key: 'priceSale',
      ellipsis: true,
      width: 150,
      sorter: (a, b) => a.priceSale - b.priceSale,
      render: (priceSale: number, record: any) => <span className="font-medium">{formatMoney.format(priceSale)}</span>,
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      width: 150,
      filters: categories?.map((category) => ({ text: category?.name, value: category?.id })),
      filteredValue: filteredInfo.category || null,
      onFilter: (value: string | number | boolean, record) => record?.category?.id === value,
      render: (category: any, record: any) => <span>{category?.name || 'N/A'}</span>,
    },
    {
      title: 'Thương hiệu',
      dataIndex: 'brand',
      key: 'brand',
      width: 140,
      filters: brands?.map((brand) => ({ text: brand?.name, value: brand?.id })),
      filteredValue: filteredInfo.brand || null,
      onFilter: (value: string | number | boolean, record) => record?.brand?.id === value,
      render: (brand: any) => <span>{brand?.name}</span>,
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
      title: 'Nỗi bật',
      dataIndex: 'isFeatured',
      key: 'isFeatured',
      ellipsis: true,
      width: 120,
      filters: [
        { text: 'Yes', value: 'Y' },
        { text: 'No', value: 'N' },
      ],
      filteredValue: filteredInfo.isFeatured || null,
      onFilter: (value: string | number | boolean, record) =>
        value === 'Y' ? record?.isFeatured === value : record?.isFeatured !== 'Y',
      render: (value: any, item: DataTypeProduct) => (
        <span className="flex">
          {item?.isFeatured === 'Y' && <CheckCircle2 className="text-green-500 text-center" size={20} />}
          {item?.isFeatured === 'N' && <XCircle size={20} className="opacity-50" />}
          {item?.isFeatured === '' && 'N/A'}
        </span>
      ),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      width: 120,
      filters: [
        { text: 'ON', value: 'Y' },
        { text: 'OFF', value: 'N' },
      ],
      filteredValue: filteredInfo.status || null,
      onFilter: (value: string | number | boolean, record) => record?.status === value,
      render: (value: any, item: DataTypeProduct) => (
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
      width: 130,
      render: (data, record) => (
        <div className="flex gap-2">
          <span
            title="Sửa sản phẩm"
            onClick={() => handleMoreAction(record, 'edit')}
            className="flex p-2 rounded-lg hover:bg-gray-200 hover:cursor-pointer transition duration-300 ease-in-out"
          >
            <Edit size={20} />
          </span>
          <span
            title="Xóa sản phẩm"
            onClick={() => handleMoreAction(record, 'delete')}
            className="flex p-2 rounded-lg hover:bg-gray-200 hover:cursor-pointer transition duration-300 ease-in-out"
          >
            <Trash size={20} />
          </span>
        </div>
      ),
    },
  ];

  const handleChangeTable: TableProps<DataTypeProduct>['onChange'] = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
  };

  const handleMoreAction = async (record: DataTypeProduct, type: 'edit' | 'delete') => {
    const { id } = record;
    switch (type) {
      case 'delete':
        try {
          await dispatch(getDeleteListProductService({ ids: [id] })).unwrap();
          await dispatch(getListProductService()).unwrap();
        } catch (error) {
          openMessage(error);
        }
        break;
      case 'edit':
        dispatch(setAction(NAME_ACTION.UPDATE_PRODUCT));
        const params = new URLSearchParams({ productId: id }).toString();
        navigate(`${location.pathname}/update?${params}`);
        break;
    }
  };

  const changeStatusProduct = async (checked: boolean, item: any) => {
    await dispatch(getUpdateManyProductService({ ids: [item.id], status: checked ? 'Y' : 'N' })).unwrap();
    await dispatch(getListProductService()).unwrap();
  };

  const handleUpdateProduct = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, item: any) => {
    e.preventDefault();
    const { id } = item;
    dispatch(setAction(NAME_ACTION.UPDATE_PRODUCT));
    const params = new URLSearchParams({ productId: id }).toString();
    navigate(`${location.pathname}/update?${params}`);
    // const product = products.filter((o) => o.id === item.id);
    // dispatch(setItemSelectedAction(product));
    // dispatch(updateStateKeyProductAction(product[0]?.categoryKey));
    // navigate(`${location.pathname}/${item.id}`);
  };

  const convertListProducts = (list: any[]) => {
    return list.map((item: any, index: number) => {
      const { id, name, status, brand, price, priceSale, updatedAt, quantity, isFeatured, category } = item;
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
        isFeatured: isFeatured || '',
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
      onChange={handleChangeTable}
      scroll={{ x: 1200 }}
      sticky
    />
  );
};
export default TableListProduct;
