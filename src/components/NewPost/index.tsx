/* eslint-disable new-cap */
/* eslint-disable curly */
import { Button, Form, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { NAME_ACTION } from '../../constants/const';
import { TypeOf } from '../../utils/CheckTypeOfValue';
import { RootState } from '../redux/store/store';
import { FormBlogBasic } from './Components/FormBlogBasic';

export const NewPost: React.FC = () => {
  const { action, orders, loading } = useSelector((state: RootState) => state.order);

  const [isReset, setIsReset] = useState<boolean>(false);

  const dispatch = useDispatch();
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
      const { customer, ...orderRest } = order[0];

      form.setFieldsValue({
        ...orderRest,
        ...customer,
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

  const resetForm = (e: any) => {
    e.preventDefault();
    form.resetFields();
    setIsReset(true);
  };

  const goBack = (e: any) => {
    resetForm(e);
    navigate('/orders', { replace: true });
  };

  const onChange = (e: any) => {
    let value = e;
    if (TypeOf(e) === 'Object' && !(e instanceof Event)) value = e.target.value;
  };

  return (
    <div id="new-post">
      <div className="ps-main__wrapper">
        <h3 className="header-button">
          <span className="header-button-name">
            {`${action === NAME_ACTION.CREATE_ORDER ? 'Tạo' : 'Cập nhật'}`} đơn hàng
          </span>
          <Form onFinish={onFinish} form={form}>
            <Form.Item className="header-button-form">
              <Space>
                <Button type="primary" danger onClick={goBack}>
                  Back
                </Button>
                <Button type="primary" hidden={!!orderId} htmlType="reset" onClick={resetForm}>
                  Reset
                </Button>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Submit
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </h3>
        <div className="content">
          <div className="header--dashboard">
            <div className="header__left">
              <p>
                (<span style={{ color: 'red' }}>*</span>) Các trường buộc phải nhập
              </p>
            </div>
          </div>
          <section className="ps-new-item">
            <Form className="ps-form ps-form--new-product" form={form} onFinish={onFinish}>
              <div className="ps-form__content">
                <div className="row">
                  <FormBlogBasic />
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <figure className="ps-block--form-box"></figure>
                    <figure className="ps-block--form-box"></figure>
                    <figure className="ps-block--form-box"></figure>
                  </div>
                </div>
              </div>
              <div className="ps-form__bottom">
                <Form.Item>
                  <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                    <Button type="primary" danger onClick={goBack}>
                      Back
                    </Button>
                    <Button type="primary" hidden={!!orderId} htmlType="reset" onClick={resetForm}>
                      Reset
                    </Button>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Submit
                    </Button>
                  </Space>
                </Form.Item>
              </div>
            </Form>
          </section>
        </div>
      </div>
    </div>
  );
};
