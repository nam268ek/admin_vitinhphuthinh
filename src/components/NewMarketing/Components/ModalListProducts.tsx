import { Button, Form, Modal, Switch, Table } from 'antd';
import { ColumnsType, TableRowSelection } from 'antd/es/table/interface';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataTypeCustom, DataTypeProduct } from '../../../types/types';
import { RootState } from '../../redux/store/store';
import { formatMoney } from '../../services/general.service';

export const ModalListProducts: React.FC<any> = ({ open, setOpen, listProductSelect }) => {
  const { products, loading } = useSelector((state: RootState) => state.product);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSelectProducts = () => {
    listProductSelect(selectedIds);
    setOpen(false);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[], selectedRows: DataTypeProduct[]) => {
    const ids = selectedRows.map((row) => row.id);
    setSelectedIds(ids);
  };

  const rowSelection: TableRowSelection<DataTypeProduct> = {
    onChange: onSelectChange,
  };

  const convertListProducts = (list: any[]) => {
    const listProductActived = list.filter((p) => p.status === true);
    return listProductActived.map((item: any, index: number) => {
      return {
        ...item,
        key: index + 1,
      };
    });
  };
  const data: DataTypeCustom[] = convertListProducts(products);

  const columns: ColumnsType<DataTypeCustom> = [
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
      render: (text: string, record: any) => <span className="price-product">{text}</span>,
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
          disabled
          checkedChildren="Yes"
          unCheckedChildren="No"
        />
      ),
    },
  ];

  return (
    <Modal
      title="Danh sách sản phẩm"
      width={'80%'}
      open={open}
      onCancel={handleCancel}
      confirmLoading={loading}
      footer={[
        <Button key="back" type="primary" danger onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSelectProducts}>
          Submit
        </Button>,
      ]}
    >
      <Table
        rowKey={(record) => record.id}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        loading={loading}
      />
    </Modal>
  );
};
