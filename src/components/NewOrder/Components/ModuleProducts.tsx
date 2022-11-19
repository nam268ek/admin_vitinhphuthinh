import { SyncOutlined } from '@ant-design/icons';
import { Button, message, Space, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { cloneDeep } from 'lodash';
import React from 'react';
import { BsFillCartPlusFill, BsFillCartXFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getListProductService } from '../../redux/Slices/ProductSlice';
import { RootState } from '../../redux/store/store';
import { Search } from '../../Search/Search';
import { formatMoney, openMessage } from '../../services/general.service';

export const ModuleProducts: React.FC = () => {
  const { products, loading } = useSelector((state: RootState) => state.product);
  const { orders } = useSelector((state: RootState) => state.order);

  const [isDefault, setIsDefault] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const columns: ColumnsType<any> = [
    {
      title: 'Lựa chọn',
      key: 'action',
      width: 90,
      render: (text: string, record: any) => (
        <Space className="action-product" size="middle">
          {processAction(record)}
        </Space>
      ),
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      render: (text: string) => <span className="name-product">{text}</span>,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 120,
      render: (quantity: number) => <span className="price-product">{quantity}</span>,
    },
    {
      title: 'Giá',
      dataIndex: 'priceSale',
      key: 'priceSale',
      width: 120,
      render: (price: any) => (
        <span className="price-product">{formatMoney.format(Number(price))}</span>
      ),
    },
  ];

  const processAction = (item: any) => {
    const isInOrder =
      orders?.filter((itemOrder: any) => itemOrder.id === item.id).length > 0 ? true : false;
    if (!isInOrder) {
      return (
        <Link to="" className="add-item" onClick={(e) => handleUpdateProduct(e, item)}>
          <BsFillCartPlusFill size={20} />
        </Link>
      );
    } else {
      return (
        <Link to="" className="remove-item" onClick={(e) => handleRemoveProduct(e, item)}>
          <BsFillCartXFill size={20} />
        </Link>
      );
    }
  };

  const handleActiveProduct = async (checked: boolean, item: any) => {
    // const bodyProduct = cloneDeep(originalProduct);
    // const itemUpdate = cloneDeep(item);
    // bodyProduct.action = "update";
    // bodyProduct.data._id = item._id;
    // itemUpdate["status"] = checked;
    // bodyProduct.data = itemUpdate;
    // console.log(bodyProduct);
    // dispatch(setIsLoading(true));
    // await dispatch(createProduct(bodyProduct));
    // // await dispatch(getAllProducts({ role: "user" }));
    // dispatch(setIsLoading(false));
  };

  const handleUpdateProduct = (e: any, record: any) => {
    e.preventDefault();
    const bodyProduct = cloneDeep(record.status);
    delete bodyProduct.contentEditor;
    delete bodyProduct.contentInfo;
    // dispatch(updateListOrder({ ...bodyProduct, quantity: 1 }));
  };

  const handleRemoveProduct = async (e: any, record: any) => {
    e.preventDefault();
    // dispatch(removeItemListOrder(record));
  };

  const convertListProducts = (list: any[]) => {
    return list?.map((item: any, index: number) => {
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
  const data = convertListProducts(products);

  const handleDefaultData = () => {
    // dispatch(setDefaultDataFilter(listAllProducts));
    setIsDefault(!isDefault);
  };

  const handleAddProduct = () => {
    // dispatch(setAction('create'));
    // dispatch(updateProduct([]));
  };

  const handleSyncData = async () => {
    const key = 'sync_data';
    try {
      message.loading({ content: 'Syncing...', key });
      await dispatch(getListProductService()).unwrap();
      openMessage(undefined, key);
    } catch (error) {
      openMessage(error, key);
    }
  };

  return (
    <>
      <div className="header-search">
        <Search listItems={products} />
        <Tooltip placement="top" title="Refresh & Sync data">
          <Button
            type="default"
            className="d-flex align-items-center"
            style={{ height: '40px' }}
            onClick={handleSyncData}
          >
            <SyncOutlined spin={loading} />
          </Button>
        </Tooltip>
      </div>
      <Table columns={columns} dataSource={data} scroll={{ x: 'auto', y: '34rem' }} />
    </>
  );
};
