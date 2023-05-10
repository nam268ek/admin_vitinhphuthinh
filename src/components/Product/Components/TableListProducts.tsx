/* eslint-disable import/no-unresolved */
/* eslint-disable react/display-name */
import { Image, Switch, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { FilterValue, TableRowSelection } from 'antd/es/table/interface';
import { CheckCircle2, Copy, Edit3, Trash, XCircle } from 'lucide-react';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getThumbUrl } from 'src/utils';
import { NAME_ACTION } from '../../../constants/const';
import { DataTypeProduct } from '../../../types/types';
import {
  getDeleteListProductService,
  getListProductService,
  getUpdateManyProductService,
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
      width: 500,
      className: 'text-base font-medium',
      render: (text: string, record) => (
        <div className="flex gap-4 items-start hover:cursor-pointer" onClick={(e) => handleUpdateProduct(e, record)}>
          <div className="w-[50px] h-[50px] relative">
            <Image
              className="object-cover w-full h-full absolute rounded-md hover:opacity-80 transition-opacity duration-300"
              preview={false}
              style={{ width: '100%', height: '100%' }}
              rootClassName="w-[50px] h-[50px] rounded-md border border-solid border-gray-300"
              placeholder={<div className="w-[50px] h-[50px] animate-pulse bg-zinc-700"></div>}
              src={record?.images?.[0]?.thumbUrl}
              alt={record?.name}
              loading="lazy"
            />
          </div>
          <span className="cursor-pointer hover:text-blue-800 text-[#5c5c5c]">{text}</span>
        </div>
      ),
    },
    {
      title: 'Giá bán',
      dataIndex: 'priceSale',
      key: 'priceSale',
      ellipsis: true,
      width: 150,
      className: 'text-base font-medium',
      sorter: (a, b) => a.priceSale - b.priceSale,
      render: (priceSale: number) => <span className="font-medium">{formatMoney.format(priceSale)}</span>,
    },
    {
      title: 'Giá gốc',
      dataIndex: 'price',
      key: 'price',
      ellipsis: true,
      width: 150,
      className: 'text-base font-medium',
      sorter: (a, b) => a.price - b.price,
      render: (price: number) => <span className="font-medium opacity-75">{formatMoney.format(price)}</span>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 150,
      className: 'text-base font-medium',
      filters: categories?.map((category) => ({ text: category?.name, value: category?.id })),
      filteredValue: filteredInfo.category || null,
      onFilter: (value: string | number | boolean, record) => record?.category?.id === value,
      render: (category) => <span>{category?.name || 'N/A'}</span>,
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      width: 140,
      className: 'text-base font-medium',
      filters: brands?.map((brand) => ({ text: brand?.name, value: brand?.id })),
      filteredValue: filteredInfo.brand || null,
      onFilter: (value: string | number | boolean, record) => record?.brand?.id === value,
      render: (brand) => <span>{brand?.name}</span>,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 120,
      className: 'text-base font-medium',
      sorter: (a, b) => a.quantity - b.quantity,
      render: (quantity) => <span className="price-product">{quantity}</span>,
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
      className: 'text-base font-medium',
      filteredValue: filteredInfo.isFeatured || null,
      onFilter: (value: string | number | boolean, record) =>
        value === 'Y' ? record?.isFeatured === value : record?.isFeatured !== 'Y',
      render: (value, item: DataTypeProduct) => (
        <span className="flex">
          {item?.isFeatured === 'Y' && <CheckCircle2 className="text-green-500 text-center" size={20} />}
          {item?.isFeatured === 'N' && <XCircle size={20} className="opacity-50" />}
          {item?.isFeatured === '' && 'N/A'}
        </span>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      width: 120,
      filters: [
        { text: 'ON', value: 'Y' },
        { text: 'OFF', value: 'N' },
      ],
      className: 'text-base font-medium',
      filteredValue: filteredInfo.status || null,
      onFilter: (value: string | number | boolean, record) => record?.status === value,
      render: (value, item: DataTypeProduct) => (
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
      className: 'text-base font-medium',
      render: (text: string) => <span className="opacity-85">{moment(text).format('DD/MM/YYYY, h:mm:ss A')}</span>,
    },
    {
      title: '',
      key: 'action',
      fixed: 'right',
      width: 170,
      className: 'text-base font-medium',
      render: (data, record) => (
        <div className="flex gap-2">
          <span
            title="Sao chép sản phẩm"
            onClick={() => handleMoreAction(record, 'copy')}
            className="flex p-2 opacity-50 rounded-lg hover:bg-gray-200 hover:cursor-pointer hover:opacity-90 transition duration-300 ease-in-out"
          >
            <Copy size={18} />
          </span>
          <span
            title="Sửa sản phẩm"
            onClick={() => handleMoreAction(record, 'edit')}
            className="flex p-2 opacity-50 rounded-lg hover:bg-gray-200 hover:cursor-pointer hover:opacity-90 transition duration-300 ease-in-out"
          >
            <Edit3 size={18} />
          </span>
          <span
            title="Xóa sản phẩm"
            onClick={() => handleMoreAction(record, 'delete')}
            className="flex p-2 opacity-50 rounded-lg hover:bg-gray-200 hover:cursor-pointer hover:opacity-90 transition duration-300 ease-in-out"
          >
            <Trash size={18} />
          </span>
        </div>
      ),
    },
  ];

  const handleChangeTable: TableProps<DataTypeProduct>['onChange'] = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
  };

  const handleMoreAction = async (record: DataTypeProduct, type: 'edit' | 'delete' | 'copy') => {
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
  };

  const convertListProducts = (list: any[]) => {
    return list.map((item, index: number) => {
      const { id, name, status, images, brand, price, priceSale, updatedAt, quantity, isFeatured, category } = item;
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
        images,
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
