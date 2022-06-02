import React from "react";
import ImageUpload from "../ImageUpload/ImageUpload";
import { Form, Input, Select, Button, Space, Modal, InputNumber } from "antd";
import StatusProduct from "../StatusProduct/StatusProduct";
import SelectOption from "../common/SelectOption";
import EditorText from "../common/EditorText";
import { useForm, Controller } from "react-hook-form";
import ConfigInfo from "../ConfigInfo/ConfigInfo";
import { cloneDeep } from "lodash";
import { openDialogError, originalProduct, formatMoney } from "../Services/general.service";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, updateProduct } from "../redux/Slices/productSlice";
import { getListDropdown, setIsLoading } from "../redux/Slices/PrimarySlice";
import SelectAddItem from "../common/SelectAddItem";
import { getListCategory } from "../redux/Slices/CategorySlice";
import { useNavigate } from "react-router-dom";
import ModuleProducts from "./ModuleProducts/ModuleProducts";
import NoContent from "../common/NoContent";
import ImageDefault from "../common/ImageDefault";
import OrderSummary from "./OrderSummary/OrderSummary";
import OrderDetails from "./OrderDetail/OrderDetails";
import { originalOrder } from "./../Services/general.service";
import { createNewOrder, resetOrder, updateListOrder, updateOrder } from "../redux/Slices/orderSlice";

const NewOrder: React.FC = () => {
  const dispatch = useDispatch();
  const childRef = React.useRef<any>(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  // const { listImages, dataUpdate, statusResponse, listImageRemove } = useSelector((state: any) => state.product);
  const { listDropDown } = useSelector((state: any) => state.primary);
  const { listAllCategory } = useSelector((state: any) => state.category);
  const { listOrder, dataUpdate } = useSelector((state: any) => state.order);
  const { action } = useSelector((state: any) => state.primary);
  const maxLength: number = 100;
  const maxLengthTextArea: number = 500;
  const { TextArea } = Input;
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>();

  const { Option } = Select;

  React.useEffect(() => {
    dispatch(getListCategory({ role: "" }));
    dispatch(getListDropdown({ role: "" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterListOrder = (listOrder: any) => {
    return listOrder.map((item: any) => {
      return {
        _id: item._id,
        title: item.title,
        img: item.img,
        quantity: item.quantity,
        price: item.price,
      };
    });
  };

  const onFinish = async (data: any) => {
    const bodyNewOrder = cloneDeep(originalOrder);
    bodyNewOrder.action = action || "create";
    if (action === "update") {
      bodyNewOrder.data._id = dataUpdate[0]._id;
    }
    bodyNewOrder.data.stord = "Đang xử lý";
    bodyNewOrder.data.orderid = `VTPT${Date.now().toString().slice(-4)}`;

    bodyNewOrder.data.customer.name = data.namecustomer;
    bodyNewOrder.data.customer.phone = data.phone;
    bodyNewOrder.data.customer.email = data.email;
    bodyNewOrder.data.customer.address = data.address;
    bodyNewOrder.data.customer.note = data.notecustomer;

    bodyNewOrder.data.priord.subtotal = data.subtotal;
    bodyNewOrder.data.priord.discount = data.discount;
    bodyNewOrder.data.priord.total = data.total;
    bodyNewOrder.data.priord.payment = data.payment ? data.payment : "";
    bodyNewOrder.data.priord.note = data.note;
    bodyNewOrder.data.priord.feeship = data.feeship;

    bodyNewOrder.data.listprod = filterListOrder(listOrder) || [];

    console.log(bodyNewOrder);
    // console.log(bodyNewProduct);

    dispatch(setIsLoading(true));
    const result = await dispatch(createNewOrder(bodyNewOrder));
    dispatch(setIsLoading(false));
    if (result.payload.code === 200) {
      // navigate("/orders", { replace: true });
    }
  };

  const resetForm = () => {
    dispatch(resetOrder({}));
  };

  const handleCancel = (e: any) => {
    e.preventDefault();
    dispatch(updateOrder([]));
    dispatch(updateListOrder([]));
    navigate("/orders", { replace: true });
  };

  return (
    <div className="ps-main__wrapper">
      <div className="header--dashboard">
        <div className="header__left">
          <h3 className="d-flex justify-content-between align-items-baseline">
            <span>Tạo đơn hàng</span>
            <span className="order-id">{`OrderID: ${dataUpdate[0]?.orderid || `VTPT${Date.now().toString().slice(-4)}`}`}</span>
          </h3>
          <p>
            (<span style={{ color: "red" }}>*</span>) Các trường buộc phải nhập
          </p>
        </div>
      </div>
      <section className="ps-new-item">
        <Form className="ps-form ps-form--new-product" form={form} onFinish={onFinish}>
          <div className="ps-form__content">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <ModuleProducts />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <figure className="ps-block--form-box">
                  <OrderDetails />
                </figure>
                <figure className="ps-block--form-box">
                  <OrderSummary form={form} />
                </figure>
              </div>
            </div>
          </div>
          <figure className="ps-block--form-box">
            <figcaption>Thông tin khách hàng</figcaption>
            <div className="ps-block__content">
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                  <div className="form-group">
                    <label>Tên khách hàng</label>
                    <Form.Item name="namecustomer" initialValue={dataUpdate[0] ? dataUpdate[0].customer.name : ""}>
                      <Input maxLength={maxLength} showCount placeholder="Họ tên..." />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                  <div className="form-group">
                    <label>Địa chỉ</label>
                    <Form.Item name="address" initialValue={dataUpdate[0] ? dataUpdate[0].customer.address : ""}>
                      <Input maxLength={maxLength} showCount placeholder="Địa chỉ..." />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                  <div className="form-group">
                    <label>Số điện thoại</label>
                    <Form.Item name="phone" initialValue={dataUpdate[0] ? dataUpdate[0].customer.phone : ""}>
                      <Input maxLength={maxLength} showCount placeholder="Phone number..." />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                  <div className="form-group">
                    <label>Email</label>
                    <Form.Item name="email" initialValue={dataUpdate[0] ? dataUpdate[0].customer.email : ""}>
                      <Input maxLength={maxLength} showCount placeholder="Email..." />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="form-group">
                  <label>Ghi chú</label>
                  <Form.Item name="notecustomer" initialValue={dataUpdate[0] ? dataUpdate[0].customer.note : ""}>
                    <TextArea maxLength={maxLength} showCount placeholder="Note..." />
                  </Form.Item>
                </div>
              </div>
            </div>
          </figure>

          <div className="ps-form__bottom">
            <Form.Item>
              <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                <Button type="primary" danger loading={false} onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="primary" loading={false} htmlType="reset" onClick={resetForm}>
                  Reset
                </Button>
                <Button type="primary" htmlType="submit" loading={false}>
                  Submit
                </Button>
              </Space>
            </Form.Item>
          </div>
        </Form>
      </section>
    </div>
  );
};
export default NewOrder;
