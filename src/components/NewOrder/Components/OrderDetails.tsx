/* eslint-disable curly */
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Empty, Image, Input } from 'antd';
import { cloneDeep, isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MAX_QTY } from '../../../constants/const';
import { RootState } from '../../redux/store/store';
import { formatMoney } from '../../services/general.service';

export const OrderDetails: React.FC<any> = ({ onChange, orderId, isReset }) => {
  const { orders } = useSelector((state: RootState) => state.order);
  const { products } = useSelector((state: RootState) => state.product);

  const [listItems, setListItems] = useState<any>([]);

  useEffect(() => {
    handleLoadOrderUpdate(orderId);
  }, [orderId]);

  useEffect(() => {
    isReset && setListItems([]);
  }, [isReset]);

  const handleLoadOrderUpdate = (id: string | undefined) => {
    if (!id) return;

    const order = orders?.filter((o) => o.id === id);
    if (order.length > 0) {
      const { orderedItem } = order[0];
      const carts = [];

      for (const product of orderedItem.products) {
        const cartItem = products?.find((item) => item.id === product.productId);

        if (!isEmpty(cartItem)) {
          const { images: productImages, name, priceSale, id: productId } = cartItem;

          carts.push({
            productId,
            name,
            priceSale,
            listImages: productImages,
            quantity: product.quantity,
          });
        }
      }
      setListItems(carts);
      console.log(carts);
    }
  };

  const handleQuantity = (event: any, key: string, productId: string) => {
    const cloneListItems = cloneDeep(listItems);
    const index = cloneListItems?.findIndex((item: any) => item.productId === productId);
    if (index === -1) return;

    const product = cloneListItems[index];
    if (key === 'increase') {
      if (product.quantity === MAX_QTY) return;
      product.quantity = ++product.quantity;
      setListItems(cloneListItems);
      return;
    }
    if (key === 'decrease') {
      if (product.quantity === 1) return;
      product.quantity = --product.quantity;
      setListItems(cloneListItems);
      return;
    }
    // change product quantity
    onChange(product.quantity, 'quantity', productId);
  };

  const handlePriceChange = (event: any, key: string, productId: string) => {
    const cloneListItems = cloneDeep(listItems);
    const index = cloneListItems?.findIndex((item: any) => item.productId === productId);
    if (index === -1) return;

    const product = cloneListItems[index];
    const { value: inputValue } = event.target;

    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      if (Number(inputValue) > MAX_QTY) {
        product.quantity = MAX_QTY;
      } else if (inputValue === '' || Number(inputValue) < 0) {
        product.quantity = 1;
      } else product.quantity = Number(inputValue);

      setListItems(cloneListItems);
      // change product quantity
      onChange(product.quantity, 'quantity', productId);
    }
  };

  return (
    <>
      <figcaption className="header-figcaption">Order Detail</figcaption>
      <div className="ps-block__content order">
        {listItems?.map((item: any, index: number) => (
          <div key={index}>
            <div className="row">
              <div>
                <div className="content-left">
                  <div className="item">
                    <div className="i-img">
                      <Image
                        style={{ display: 'block', width: '5em' }}
                        src={item?.listImages[0]?.thumbUrl}
                      />
                    </div>
                  </div>
                  <div className="item w-100">
                    <div className="i-content">
                      <h6>{item?.name}</h6>
                    </div>
                    <div className="i-price">
                      <p>
                        <span>{formatMoney.format(Number(item?.priceSale))}</span>
                      </p>
                    </div>
                    <div className="i-content" style={{ width: '140px' }}>
                      <div className="form-quantity">
                        <Input.Group compact className="d-flex">
                          <Button
                            className="d-flex align-items-center justify-content-center m-0"
                            style={{ padding: ' 0 10px' }}
                            icon={<PlusOutlined />}
                            onClick={(e) => handleQuantity(e, 'increase', item?.productId)}
                          ></Button>
                          <Input
                            className="input-number-quantity"
                            value={item?.quantity}
                            onChange={(e) => handlePriceChange(e, 'quantity', item?.productId)}
                          />
                          <Button
                            className="d-flex align-items-center justify-content-center m-0"
                            style={{ padding: '0 10px' }}
                            icon={<MinusOutlined />}
                            onClick={(e) => handleQuantity(e, 'decrease', item?.productId)}
                          ></Button>
                        </Input.Group>
                      </div>
                    </div>
                  </div>
                  <div className="item d-flex align-items-center">
                    <Button
                      type="dashed"
                      className="d-flex justify-content-center align-items-center"
                      icon={<DeleteOutlined />}
                    ></Button>
                  </div>
                </div>
              </div>
            </div>
            {listItems?.length - 1 !== index && <hr />}
          </div>
        ))}
        {listItems?.length === 0 && <Empty />}
      </div>
    </>
  );
};
