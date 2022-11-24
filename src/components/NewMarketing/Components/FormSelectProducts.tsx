import { PlusOutlined, UserOutlined, DeleteOutlined } from '@ant-design/icons';
import { Avatar, Button, Checkbox, Empty, Image, InputNumber, Select, Table } from 'antd';
import { ColumnsType, TableRowSelection } from 'antd/es/table/interface';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { DataTypeCustom } from '../../../types/types';
import { RootState } from '../../redux/store/store';
import { formatMoney } from '../../services/general.service';
import { FormSelectNumberMarketings } from './FormSelectNumberMarketings';
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

  // const columns: ColumnsType<DataTypeCustom> = [
  //   {
  //     title: 'Tên sản phẩm',
  //     dataIndex: 'name',
  //     key: 'name',
  //     render: (text: string, record: any) => <span className="price-product">{text}</span>,
  //   },
  //   {
  //     title: 'Giá bán',
  //     dataIndex: 'priceSale',
  //     key: 'priceSale',
  //     render: (priceSale: any) => (
  //       <span className="price-product">{formatMoney.format(Number(priceSale))}</span>
  //     ),
  //   },
  //   {
  //     title: 'Số lượng',
  //     dataIndex: 'quantity',
  //     key: 'quantity',
  //     render: (quantity: any) => <span className="price-product">{quantity}</span>,
  //   },
  // ];

  const onChange = () => {
    //
  };

  return (
    <div className="col-xl-12 col-lg-6 col-md-12 col-sm-12 col-12">
      <div className="ps-block--form-box">
        <div className="container-block-shadow">
          <div className="header-figcaption mb-4">
            <p className="title-name">Sản phẩm khuyến mãi</p>
            <div>
              <Button
                type="primary"
                onClick={openModelProducts}
                className="d-flex justify-content-center align-items-center"
                icon={<PlusOutlined className="d-flex justify-content-center align-items-center" />}
              >
                Thêm sản phẩm
              </Button>
            </div>
            <ModalListProducts
              listProductSelect={listProductSelect}
              open={isModalOpen}
              setOpen={setIsModalOpen}
            />
          </div>

          <div className="shadow-content">
            {/* <Empty /> */}
            <div className="row">
              <div className="form-group m-0">
                <div className="c-header-table mb-3">
                  <div className="c-w1">
                    <Checkbox />
                  </div>
                  <div className="c-w2">Tên sản phẩm</div>
                  <div className="c-w3">Giá gốc</div>
                  <div className="c-w4">Giá sau giảm</div>
                  <div className="c-w5">Giảm giá</div>
                  <div className="c-w6">Kho hàng</div>
                  <div className="c-w7">Số lượng sản phẩm khuyến mãi</div>
                  <div className="c-w8">Thao tác</div>
                </div>
                <div className="c-content-table">
                  {products?.map((item, index) => (
                    <div key={item?.id} className="mb-2">
                      <div className="d-flex align-items-center w-100 mb-2">
                        <div className="c-w1">
                          <Checkbox />
                        </div>
                        <div className="d-flex align-items-center w-100 gap-2">
                          <Avatar
                            size={40}
                            shape="square"
                            className="d-flex justify-content-center align-items-center"
                            src="https://avatars.githubusercontent.com/u/8084606?v=4"
                            icon={
                              <UserOutlined className="d-flex justify-content-between align-items-center" />
                            }
                          />
                          <span className="fw-normal">
                            Avatars can be used to represent people or objects. It supports images,
                            Icons, or letters.
                          </span>
                        </div>
                        <div className="c-w8">
                          <Button
                            type="default"
                            shape="circle"
                            className="d-flex justify-content-center align-items-center"
                            icon={
                              <DeleteOutlined className="d-flex justify-content-center align-items-center" />
                            }
                          ></Button>
                        </div>
                      </div>
                      <div className="c-header-table border-0 bg-white align-items-center">
                        <div className="c-w1"></div>
                        <div className="c-w2-small">-</div>
                        <div className="c-w3">{formatMoney.format(products[0].priceSale)}</div>
                        <div className="c-w4">
                          <InputNumber min={1} addonAfter="VNĐ" />
                        </div>
                        <div className="c-w5">
                          <InputNumber min={1} addonAfter="VNĐ" />
                        </div>
                        <div className="c-w6">{products[0].quantity}</div>
                        <div className="c-w7">
                          <FormSelectNumberMarketings
                            onChange={onChange}
                            productId={products[0].id}
                          />
                        </div>
                        <div className="c-w8"></div>
                      </div>
                      {products?.length - 1 !== index && <div className="c-border-item"></div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
