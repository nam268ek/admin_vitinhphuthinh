import { Form, Input } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import SelectOption from "../../common/SelectOption";
import { formatMoney } from "../../Services/general.service";

const OrderSummary: React.FC = () => {
  const { listImages, dataUpdate, statusResponse, listImageRemove } = useSelector((state: any) => state.product);
  const maxLength: number = 100;
  const { listOrder } = useSelector((state: any) => state.order);
  const [subtotal, setSubtotal] = React.useState<number>(0);
  const [total, setTotal] = React.useState<number>(0);
  const [tempPrice, setTempPrice] = React.useState<number>(0);

  const handleUpdatePrice = (e: any, action: string) => {
    const { value } = e.target;
    const price = value ? Number(value) : 0;
    setTempPrice(subtotal - price);
    setTotal(subtotal - price);
    // if(action === 'discount'){
    // }
    // if(action === 'feeship'){
    //     setTotal(subtotal + price);
    // }
  };
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
              <Form.Item name="note" initialValue={dataUpdate[0] ? dataUpdate[0].title : ""}>
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
            </div>
            <div className="row">
              <p className="i-sub">
                <Form.Item name="discount" initialValue={dataUpdate[0] ? dataUpdate[0].title : ""}>
                  <Input type="number" addonBefore="Giảm giá" defaultValue={0} onBlur={(e) => handleUpdatePrice(e, "discount")} />
                </Form.Item>
              </p>
            </div>
            <div className="row">
              <p className="i-sub">
                <Form.Item name="feeship" initialValue={dataUpdate[0] ? dataUpdate[0].title : ""}>
                  <Input type="number" addonBefore="Phí Ship." defaultValue={0} onBlur={(e) => handleUpdatePrice(e, "feeship")} />
                </Form.Item>
              </p>
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
              <p>{formatMoney.format(total)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
