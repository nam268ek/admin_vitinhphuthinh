/* eslint-disable curly */
import React, { useEffect } from 'react';
import ImageUpload from '../ImageUpload/ImageUpload';
import { Form, Input, Select, Button, Space, Modal, InputNumber, message } from 'antd';
// import StatusProduct from '../StatusProduct/StatusProduct';
import { SelectOption } from '../common/SelectOption';
import EditorText from '../common/EditorText';
import { useForm, Controller } from 'react-hook-form';
import ConfigInfo from '../ConfigInfo/ConfigInfo';
import { cloneDeep } from 'lodash';
import { formatMoney, originalOrder } from '../services/general.service';
import { useDispatch, useSelector } from 'react-redux';
// import { createProduct, updateProduct } from '../redux/Slices/ProductSlice';
// import { getListDropdown, setAction, setIsLoading } from '../redux/Slices/PrimarySlice';
import SelectAddItem from '../common/SelectAddItem';
// import { getListCategory } from "../redux/Slices/CategorySlice";
import { useNavigate, useParams } from 'react-router-dom';
import { ModuleProducts } from './Components/ModuleProducts';
import NoContent from '../common/NoContent';
import ImageDefault from '../common/ImageDefault';
import { OrderSummary } from './Components/OrderSummary';
import { OrderDetails } from './Components/OrderDetails';
import { FormCustomerOrder } from './Components/FormCustomerOrder';
import { NAME_ACTION } from '../../constants/const';
import { RootState } from '../redux/store/store';

export const NewOrder: React.FC = () => {
  const { action, orders, loading } = useSelector((state: RootState) => state.order);

  const dispatch = useDispatch();
  const childRef = React.useRef<any>(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { orderId } = useParams();

  useEffect(() => {
    handleLoadOrderUpdate(orderId);
  }, [orderId]);

  const handleLoadOrderUpdate = (id: string | undefined) => {
    if (!id) return;

    const order = orders?.filter((p) => p.id === id);
    if (order.length > 0) {
      // const { images, category, brand, tags, categoryKey, specs, ...prod } = order[0];

      // dispatch(setImageAction(images));
      // dispatch(updateStateKeyProductAction(categoryKey));
      // const unwindSpecs = unwindSpecsProduct(specs);

      form.setFieldsValue({
        ...order[0],
      });
    }
  };

  const onFinish = async (data: any) => {
    switch (action) {
      case NAME_ACTION.CREATE_PRODUCT:
        handleCreateOrder();
        break;
      case NAME_ACTION.UPDATE_PRODUCT:
        handleUpdateOrder();
        break;
      default:
        break;
    }
  };

  const handleCreateOrder = async () => {
    //
  };

  const handleUpdateOrder = async () => {
    //
  };

  const filterListOrder = (list: any) => {
    return list.map((item: any) => {
      return {
        _id: item._id,
        title: item.title,
        img: item.img,
        quantity: item.quantity,
        price: item.price,
      };
    });
  };

  const resetForm = (e: any) => {
    e.preventDefault();
    form.resetFields();
    // dispatch(setImageAction([]));
    // dispatch(setDefaultProductAction());
  };

  const handleCancel = (e: any) => {
    e.preventDefault();
    // dispatch(updateOrder([]));
    // dispatch(updateListOrder([]));
    navigate('/orders', { replace: true });
  };

  const goBack = () => {
    //
  };

  const onChange = (event: any) => {
    //
  };

  return (
    <div className="ps-main__wrapper">
      <h3 className="header-button">
        <span className="header-button-name">
          {`${action === NAME_ACTION.CREATE_ORDER ? 'Tao' : 'Cập nhật'}`} don hang
        </span>
        <Form onFinish={onFinish} form={form}>
          <Form.Item className="header-button-form">
            <Space>
              <Button type="primary" danger onClick={goBack}>
                Back
              </Button>
              <Button type="primary" htmlType="reset" onClick={resetForm}>
                Reset
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </h3>
      <div className="header--dashboard">
        <div className="header__left">
          <h3 className="d-flex justify-content-between align-items-baseline">
            <span>Tạo đơn hàng</span>
            {/* <span className="order-id">{`OrderID: ${
              dataUpdate[0]?.orderid || `VTPT${Date.now().toString().slice(-4)}`
            }`}</span> */}
          </h3>
          <p>
            (<span style={{ color: 'red' }}>*</span>) Các trường buộc phải nhập
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
                  <OrderDetails onChange={onChange} />
                </figure>
                <figure className="ps-block--form-box">
                  <OrderSummary onChange={onChange} />
                </figure>
              </div>
            </div>
          </div>
          <FormCustomerOrder onChange={onChange} />

          <div className="ps-form__bottom">
            <Form.Item>
              <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
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
