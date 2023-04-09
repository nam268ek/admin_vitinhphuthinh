/* eslint-disable new-cap */
/* eslint-disable curly */
import { Alert, Breadcrumb, Button, Divider, Form, Layout, message, Modal, notification, Space, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { DURATION_TIMEOUT_SECONDS, NAME_ACTION } from '../../constants/const';
import { TypeOf } from '../../utils/CheckTypeOfValue';
import { RootState } from '../redux/store/store';
import { FormCustomerOrder } from './Components/FormCustomerOrder';
import { FormOrderStepsData } from './Components/FormOrderStepsData';
import { ModuleProducts } from './Components/ModuleProducts';
import { OrderDetails } from './Components/OrderDetails';
import { OrderSteps } from './Components/OrderSteps';
import { OrderSummary } from './Components/OrderSummary';

const { Header, Content } = Layout;

export const NewOrder: React.FC = () => {
  const { action, orders, loading, cartItem } = useSelector((state: RootState) => state.order);

  const [isReset, setIsReset] = useState<boolean>(false);
  const [current, setCurrent] = useState<number>(0);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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

  const handleChangeSteps = (index: number) => {
    if (current === 0 && cartItem?.length === 0 && index !== 0) {
      return message.error({
        content: 'Không tìm thấy sản phẩm trong giỏ hàng.Vui lòng thêm sản phẩm vào giỏ hàng.',
        duration: 5,
        className: 'error-message',
      });
    }
    setCurrent(index);
    console.log(index, 'current::', current);
  };

  return (
    <>
      <Header
        className="sticky top-0 z-10 w-full flex items-center justify-between border-t-0 border-x-0 border-b border-solid border-[#eee]"
        style={{ background: colorBgContainer, paddingInline: '35px' }}
      >
        <p className="text-2xl m-0 flex items-center">{`${action === NAME_ACTION.CREATE_ORDER ? 'Tạo' : 'Cập nhật'}`} đơn hàng</p>
        <Form onFinish={onFinish} form={form}>
          <Form.Item noStyle>
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
      </Header>
      <Content className="my-0 mx-4">
        <Breadcrumb className="mx-0 my-2 px-5">
          <Breadcrumb.Item>Orders</Breadcrumb.Item>
          <Breadcrumb.Item>Create</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: colorBgContainer }} className="px-5 py-6 min-h-full">
          <OrderSteps current={current} onChange={handleChangeSteps} />
          <Divider />
          <FormOrderStepsData step={current} />
        </div>
      </Content>
    </>
  );
};
