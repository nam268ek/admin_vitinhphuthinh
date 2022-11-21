import { Button, Form, message, Modal, Space, Switch, Table, Tooltip } from 'antd';
import { ColumnsType, TableRowSelection } from 'antd/es/table/interface';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataTypeCustom, DataTypeProduct } from '../../../types/types';
import { RootState } from '../../redux/store/store';
import { formatMoney, openMessage } from '../../services/general.service';
import { Search } from '../../Search/Search';
import { SyncOutlined } from '@ant-design/icons';
import { getListProductService } from '../../redux/Slices/ProductSlice';

export const ModalListProducts: React.FC<any> = ({ open, setOpen, listProductSelect }) => {
  const { products, loading } = useSelector((state: RootState) => state.product);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filterData, setFilterData] = useState<DataTypeCustom[]>([]);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    convertListProducts(products);
  }, [products]);

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
    const dataFilter = listProductActived.map((item: any, index: number) => {
      return {
        ...item,
        key: index + 1,
      };
    });

    setFilterData(dataFilter);
  };
  // const data: DataTypeCustom[] = convertListProducts(products);

  const columns: ColumnsType<DataTypeCustom> = [
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

  const handleSyncData = async () => {
    // const key = 'sync_data';
    // try {
    //   message.loading({ content: 'Syncing...', key });
    //   await dispatch(getListProductService()).unwrap();
    //   openMessage(undefined, key);
    // } catch (error) {
    //   openMessage(error, key);
    // }
    convertListProducts(products);
  };

  const handleSelectItemSearch = (data: any) => {
    convertListProducts(data);
    console.log(data);
  };

  return (
    <Modal
      title="Chọn sản phẩm"
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
      <div className="w-100 d-flex justify-content-between mb-3 gap-3">
        <Search listItems={products} selectItem={handleSelectItemSearch} className="w-100" />
        <Tooltip placement="right" title="Refresh & Sync data">
          <Button
            type="default"
            style={{ width: '40px', height: '40px' }}
            className="d-flex justify-content-center align-items-center"
            icon={<SyncOutlined spin={loading} />}
            onClick={handleSyncData}
          ></Button>
        </Tooltip>
      </div>
      <Table
        rowKey={(record) => record.id}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={filterData}
        loading={loading}
      />
    </Modal>
  );
};
