import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Button, Checkbox, Empty, Form, InputNumber } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalListProducts } from '../../NewMarketing/Components/ModalListProducts';
import { setCartItemAction } from '../../redux/Slices/OrderSlice';
import { RootState } from '../../redux/store/store';
import { formatMoney } from '../../services/general.service';
import { OrderSummary } from './OrderSummary';

export const OrderListProductAddToCart: React.FC = () => {
  const { loading, products } = useSelector((state: RootState) => state.product);
  const { cartItem } = useSelector((state: RootState) => state.order);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

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
    dispatch(setCartItemAction(newArr));
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
      {cartItem?.length === 0 ? (
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
      ) : (
        <>
          <div className="flex items-center mb-4 justify-between">
            <p className="text-2xl m-0 flex items-center">Giỏ hàng</p>
            <Button type="primary" onClick={openModelProducts} icon={<PlusOutlined />}>
              Thêm sản phẩm
            </Button>
          </div>
          <div className="grid grid-flow-col grid-cols-3 gap-4">
            <div className="col-span-2">
              <div className="m-0">
                <div className="flex items-baseline justify-between px-3 py-4 bg-gray-100 mb-3 rounded-md border-x border-y border-solid border-gray-200">
                  <div className="w-8 pr-4">
                    <Checkbox />
                  </div>
                  <div className="text-sm pr-4 w-28">Tên sản phẩm</div>
                  <div className="text-sm pr-4 w-28">Giá bán</div>
                  <div className="text-sm pr-4 w-52">Số lượng</div>
                  <div className="text-sm pr-4 w-20">Thao tác</div>
                </div>
                <div className="border border-solid border-[#e3e3e3] rounded-md py-4 px-3 bg-[#f6f6f6]">
                  {cartItem?.map((item, index) => (
                    <div key={item?.id} className="mb-2">
                      <div className="flex items-center w-full mb-2">
                        <div className="w-8 pr-4">
                          <Checkbox />
                        </div>
                        <div className="flex w-full items-center gap-2">
                          <Avatar size={40} shape="square" />
                          <span className="font-normal text-ellipsis text-base">{item?.name}</span>
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
                        <div className="text-sm pr-4 w-20"></div>
                      </div>
                      {cartItem?.length - 1 !== index && (
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
      )}
    </>
  );
};
