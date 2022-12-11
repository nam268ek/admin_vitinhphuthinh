import { Button, Form, message, Modal, Space, Switch, Table, Tooltip, Select } from 'antd';
import { ColumnsType, TableRowSelection } from 'antd/es/table/interface';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataTypeCustom, DataTypeProduct } from '../../../types/types';
import { RootState } from '../../redux/store/store';
import { formatMoney, openMessage } from '../../services/general.service';
import { Search } from '../../Search/Search';
import { SyncOutlined } from '@ant-design/icons';
import { getListProductService } from '../../redux/Slices/ProductSlice';
import { TreeCategory } from '../../NewProduct/Components/TreeCategory';

export const ModalListProducts: React.FC<any> = ({ open, setOpen }) => {
  const { products, loading } = useSelector((state: RootState) => state.product);
  const { cartItem } = useSelector((state: RootState) => state.order);

  const [filterData, setFilterData] = useState<DataTypeCustom[]>([]);
  const [selectedIds, setSelectedIds] = useState<any[]>([]);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    convertListProducts(products);
  }, [products]);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSelectProducts = async () => {
    // try {
    //   for (const item of selectedIds) {
    //     await dispatch(
    //       getCartAddToCartAction({
    //         customerId: process.env.REACT_APP_USER_ANONYMOUS_ID,
    //         productId: item.id,
    //         quantity: 1,
    //       }),
    //     );
    //   }
    // } catch (error) {
    //   openMessage(error);
    // }
    // listProductSelect(selectedIds);
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
      width: '60%',
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
          checkedChildren="ON"
          unCheckedChildren="OFF"
        />
      ),
    },
  ];

  const handleSelectItemSearch = (data: any) => {
    convertListProducts(data);
    console.log(data);
  };

  const handleChange = (e: any, key: any) => {
    //
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
      <div className="w-full flex items-center mb-4 justify-end">
        <div className="flex items-center mr-2">
          <Search listItems={products} size="middle" selectItem={handleSelectItemSearch} />
        </div>
        <div>
          <TreeCategory handleChange={handleChange} className="w-40 m-0" isFeedback={false} />
        </div>
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
