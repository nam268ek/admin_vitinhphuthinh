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
    <div className="px-5 pt-5 pb-10 bg-white rounded-md shadow-md">
      <div className="mb-4">
        <p className="text-lg mb-2">Sản phẩm khuyến mãi</p>
        <div>
          <Button type="primary" onClick={openModelProducts} icon={<PlusOutlined />}>
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
        <div className="m-0">
          <div className="flex items-baseline justify-between px-3 py-4 bg-gray-100 mb-3 rounded-md border-x border-y border-solid border-gray-200">
            <div className="w-8 pr-4">
              <Checkbox />
            </div>
            <div className="text-sm pr-4 w-28">Tên sản phẩm</div>
            <div className="text-sm pr-4 w-28">Giá gốc</div>
            <div className="text-sm pr-4 w-52">Giá sau giảm</div>
            <div className="text-sm pr-4 w-36">Kho hàng</div>
            <div className="text-sm pr-4 w-60">Số lượng sản phẩm khuyến mãi</div>
            <div className="text-sm pr-4 w-20">Thao tác</div>
          </div>
          <div className="border border-solid border-[#e3e3e3] rounded-md py-4 px-3 bg-[#f6f6f6]">
            {products?.map((item, index) => (
              <div key={item?.id} className="mb-2">
                <div className="flex items-center w-full mb-2">
                  <div className="w-8 pr-4">
                    <Checkbox />
                  </div>
                  <div className="flex w-full items-center gap-2">
                    <Avatar
                      size={40}
                      shape="square"
                      src="https://avatars.githubusercontent.com/u/8084606?v=4"
                      icon={
                        <UserOutlined className="d-flex justify-content-between align-items-center" />
                      }
                    />
                    <span className="font-normal text-ellipsis text-base">
                      Avatars can be used to represent people or objects. It supports images, Icons,
                      or letters.
                    </span>
                  </div>
                  <div className="text-sm pr-4 w-20">
                    <Button type="default" shape="circle" icon={<DeleteOutlined />}></Button>
                  </div>
                </div>
                <div className="bg-white flex flex-row border-0 items-center justify-between py-4">
                  <div className="w-8 pr-4"></div>
                  <div className="text-sm pr-4 w-28">-</div>
                  <div className="text-sm pr-4 w-28">
                    {formatMoney.format(products[0].priceSale)}
                  </div>
                  <div className="text-sm pr-4 w-52">
                    <InputNumber min={1} addonAfter="VNĐ" />
                  </div>
                  <div className="text-sm pr-4 w-36">{products[0].quantity}</div>
                  <div className="text-sm pr-4 w-60">
                    <FormSelectNumberMarketings onChange={onChange} productId={products[0].id} />
                  </div>
                  <div className="text-sm pr-4 w-20"></div>
                </div>
                {products?.length - 1 !== index && (
                  <div className="mt-5 border-0 border-b border-solid border-[#e3e3e3]"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
