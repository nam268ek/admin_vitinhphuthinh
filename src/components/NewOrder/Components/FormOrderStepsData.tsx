import { Avatar, Button, Checkbox, Empty, Form, InputNumber } from 'antd';
import React, { useState } from 'react';
import { PlusOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { ModalListProducts } from '../../NewMarketing/Components/ModalListProducts';
import { formatMoney } from '../../services/general.service';
import { OrderSummary } from './OrderSummary';

export const FormOrderStepsData: React.FC<any> = ({ step }) => {
  const { loading, products } = useSelector((state: RootState) => state.product);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectProducts, setSelectProducts] = useState<any[]>([]);

  const [form] = Form.useForm();

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

  const onChange = () => {
    //
  };

  return (
    <>
      <ModalListProducts
        listProductSelect={listProductSelect}
        open={isModalOpen}
        setOpen={setIsModalOpen}
      />
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          height: 60,
        }}
        description={<span className="text-gray-600">Không có sản phẩm</span>}
      >
        <Button type="primary" onClick={openModelProducts} icon={<PlusOutlined />}>
          Thêm sản phẩm
        </Button>
      </Empty>
      <div className="grid grid-flow-col grid-cols-3 gap-4">
        <div className="col-span-2">
          {/* <Empty /> */}
          <div className="m-0">
            <div className="flex items-baseline justify-between px-3 py-4 bg-gray-100 mb-3 rounded-md border-x border-y border-solid border-gray-200">
              <div className="w-8 pr-4">
                <Checkbox />
              </div>
              <div className="text-sm pr-4 w-28">Tên sản phẩm</div>
              <div className="text-sm pr-4 w-28">Giá bán</div>
              <div className="text-sm pr-4 w-52">Số lượng</div>
              <div className="text-sm pr-4 w-36">Kho hàng</div>
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
                        Avatars can be used to represent people or objects. It supports images,
                        Icons, or letters.
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
                      <InputNumber min={1} defaultValue={1} />
                    </div>
                    <div className="text-sm pr-4 w-36">{products[0].quantity}</div>
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
        <div className="col-span-1">
          <OrderSummary onChange={onChange} form={form} />
        </div>
      </div>
    </>
  );
};
