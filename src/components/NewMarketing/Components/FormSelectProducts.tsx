import { PlusOutlined } from '@ant-design/icons';
import { Button, Empty, Image, Table } from 'antd';
import { ColumnsType, TableRowSelection } from 'antd/es/table/interface';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { DataTypeCustom } from '../../../types/types';
import { RootState } from '../../redux/store/store';
import { formatMoney } from '../../services/general.service';
import { ModalListProducts } from './ModalListProducts';

export const FormSelectProducts = () => {
  const { loading, products } = useSelector((state: RootState) => state.product);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectProducts, setSelectProducts] = useState<any[]>([]);

  const openModelProducts = () => {
    setIsModalOpen(!isModalOpen);
  };

  const listProductSelect = (list: any[]) => {
    const newArr = [];
    for (const productId of list) {
      const listFilter = products?.filter((item) => item.id === productId);
      if (listFilter.length > 0) {
        newArr.push(listFilter[0]);
      }
    }
    setSelectProducts(newArr);
    console.log(newArr);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[], selectedRows: DataTypeCustom[]) => {
    // const ids = selectedRows.map((row) => row.id);
    setSelectProducts(selectedRows);
  };

  const rowSelection: TableRowSelection<DataTypeCustom> = {
    onChange: onSelectChange,
  };

  const convertListProducts = (list: any[]) => {
    return (
      list?.map((item: any, index: number) => {
        return {
          ...item,
          key: index + 1,
        };
      }) || []
    );
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
  ];

  return (
    <div className="col-xl-12 col-lg-6 col-md-12 col-sm-12 col-12">
      <figure className="ps-block--form-box">
        <figcaption className="header-figcaption d-flex justify-content-between align-items-center">
          <span>Sản phẩm khuyến mãi</span>
          <Button
            type="primary"
            onClick={openModelProducts}
            className="d-flex justify-content-center align-items-center"
            icon={<PlusOutlined className="d-flex justify-content-center align-items-center" />}
          >
            Thêm sản phẩm
          </Button>
          <ModalListProducts
            listProductSelect={listProductSelect}
            open={isModalOpen}
            setOpen={setIsModalOpen}
          />
        </figcaption>

        <div className="ps-block__content">
          {/* <Empty /> */}
          <div className="row">
            <div className="form-group m-0">
              <div>
                <Table
                  rowKey={(record) => record.id}
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={data}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </figure>
    </div>
  );
};
