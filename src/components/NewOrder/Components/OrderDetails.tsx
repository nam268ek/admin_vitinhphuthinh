/* eslint-disable curly */
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Image, Input } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NoContent from '../../common/NoContent';
import { RootState } from '../../redux/store/store';
import { formatMoney } from '../../services/general.service';

export const OrderDetails: React.FC<any> = ({ onChange, orderId }) => {
  const { orders } = useSelector((state: RootState) => state.order);
  const { products } = useSelector((state: RootState) => state.product);
  const { images } = useSelector((state: RootState) => state.image);

  const [listItems, setListItems] = useState<any>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    handleLoadOrderUpdate(orderId);
  }, [orderId]);

  const handleLoadOrderUpdate = (id: string | undefined) => {
    if (!id) return;

    const order = orders?.filter((o) => o.id === id);
    if (order.length > 0) {
      const { orderedItem } = order[0];
      const carts = [];

      for (const product of orderedItem.products) {
        const cartItem = products?.find((item) => item.id === product.productId);

        if (!isEmpty(cartItem)) {
          const { images: productImages, name, priceSale } = cartItem;

          carts.push({
            listImages: productImages,
            name,
            priceSale,
            quantity: product.quantity,
          });
        }
      }
      setListItems(carts);
      console.log(carts);
    }
  };

  // const handleListImages = (ids: string[]) => {
  //   const imagesProduct = [];
  //   for (const img of ids) {
  //     const cartItem = images?.find((item) => item.keyId === img);
  //     if (!isEmpty(cartItem)) {
  //       imagesProduct.push(cartItem);
  //     }
  //   }

  //   return imagesProduct;
  // };

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
                    <div className="i-content" style={{ width: '130px' }}>
                      <Form form={form} className="form-quantity">
                        <Input.Group compact className="d-flex">
                          <Button
                            className="d-flex align-items-center justify-content-center m-0"
                            style={{ padding: ' 0 10px' }}
                            icon={<PlusOutlined />}
                          ></Button>
                          <Form.Item name="quantity" noStyle>
                            <Input
                              className="input-number-quantity"
                              onChange={(e) => onChange(e, 'quantity')}
                            />
                          </Form.Item>
                          <Button
                            className="d-flex align-items-center justify-content-center m-0"
                            style={{ padding: '0 10px' }}
                            icon={<MinusOutlined />}
                          ></Button>
                        </Input.Group>
                      </Form>
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
        {listItems?.length === 0 && <NoContent />}
      </div>
    </>
  );
};
