/* eslint-disable no-useless-computed-key */
import { Form, Input, InputNumber } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import SelectOption from "../../common/SelectOption";
import { formatMoney } from "../../services/general.service";

const OrderSummary: React.FC<any> = ({ form }) => {
  // const { listImages, dataUpdate, statusResponse, listImageRemove } = useSelector((state: any) => state.product);
  const maxLength: number = 100;
  const { listOrder, dataUpdate } = useSelector((state: any) => state.order);
  const [subtotal, setSubtotal] = React.useState<number>(0);
  const [total, setTotal] = React.useState<number>(0);
  const [discount, setDiscount] = React.useState<number>(0);
  const [feeShip, setFeeShip] = React.useState<number>(0);

  const handleUpdatePrice = (e: any, action: string) => {
    const { value } = e.target;
    const price = value ? Number(value.replace(/\,/g, "")) : 0;
    if (action === "discount") {
      setDiscount(price);
    }
    if (action === "feeship") {
      setFeeShip(price);
    }
  };

  React.useEffect(() => {
    if (dataUpdate.length > 0) {
      const { subtotal, feeship, discount, total } = dataUpdate[0].priord;
      setTotal(total);
      setSubtotal(subtotal);
      setDiscount(discount);
      setFeeShip(feeship);
    }
  }, []);

  React.useEffect(() => {
    setTotal(subtotal - feeShip - discount);
    form.setFieldsValue({
      ["subtotal"]: subtotal,
      ["total"]: total,
    });
  }, [discount, feeShip, subtotal, form, total, dataUpdate]);

  React.useEffect(() => {
    const caculatorOrder = () => {
      let total = 0;
      listOrder.forEach((item: any) => {
        total += item.price * item.quantity;
      });
      setSubtotal(total);
      setTotal(total);
    };
    caculatorOrder();
  }, [listOrder]);
  return (
    <>
      <figcaption>Order Summary</figcaption>
      <div className="ps-block__content order-sum">
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <SelectOption placeholder="Phương thức thanh toán" className="select-category" isPayment />
            </div>
            <div className="form-group">
              <label>Ghi chú</label>
              <Form.Item name="note" initialValue={dataUpdate[0] ? dataUpdate[0].priord.note : ""}>
                <Input maxLength={maxLength} showCount placeholder="Ghi chú..." />
              </Form.Item>
            </div>
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-6">
                <p className="title-price">Tạm tính</p>
              </div>
              <div className="col-6">
                <div className="o-price">
                  <p>{formatMoney.format(subtotal)}</p>
                </div>
              </div>
              <Form.Item name="subtotal" hidden>
                <Input />
              </Form.Item>
            </div>
            <div className="row">
              <div className="i-sub">
                <Form.Item
                  name="discount"
                  // noStyle
                  initialValue={dataUpdate[0] ? dataUpdate[0].priord.discount : ""}
                >
                  <InputNumber
                    min={0}
                    max={1000000000}
                    addonBefore="Giảm giá"
                    formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    parser={(value: any) => value.replace(/\$\s?|(,*)/g, "")}
                    style={{ width: "100%" }}
                    placeholder="Giảm giá..."
                    onBlur={(e) => handleUpdatePrice(e, "discount")}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="i-sub">
                <Form.Item
                  name="feeship"
                  // noStyle
                  initialValue={dataUpdate[0] ? dataUpdate[0].priord.feeship : ""}
                >
                  <InputNumber
                    min={0}
                    max={1000000000}
                    addonBefore="Phí Ship."
                    formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    parser={(value: any) => value.replace(/\$\s?|(,*)/g, "")}
                    placeholder="Phí Ship..."
                    style={{ width: "100%" }}
                    onBlur={(e) => handleUpdatePrice(e, "feeship")}
                  />
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="line-dashed">
            <hr className="c-hr" />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <p className="title-price">Tổng</p>
          </div>
          <div className="col-6">
            <div className="o-price">
              <p>{total >= 0 ? formatMoney.format(total) : formatMoney.format(0)}</p>
              <Form.Item name="total" hidden>
                <Input />
              </Form.Item>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
