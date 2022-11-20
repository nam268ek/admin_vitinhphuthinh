/* eslint-disable new-cap */
/* eslint-disable curly */
import { Button, Form, Space } from 'antd';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { NAME_ACTION } from '../../constants/const';
import { TypeOf } from '../../utils/CheckTypeOfValue';
import { setImageAction } from '../redux/Slices/ImageSlice';
import { setDefaultProductAction } from '../redux/Slices/ProductSlice';
import { RootState } from '../redux/store/store';
import { FormInfoBasic } from './Components/FormInfoBasic';
import { FormSelectProducts } from './Components/FormSelectProducts';

export const NewMarketing = () => {
  const { action, loading } = useSelector((state: RootState) => state.marketing);

  const { marketingId } = useParams();

  const childRef = useRef<any>(null);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (data: any) => {
    //
  };

  const goBack = (e: any) => {
    e.preventDefault();
    dispatch(setImageAction([]));
    dispatch(setDefaultProductAction());
    navigate('/products', { replace: true });
  };

  const resetForm = (e: any) => {
    e.preventDefault();
    form.resetFields();
    childRef.current.resetContentEditor();
    dispatch(setImageAction([]));
    dispatch(setDefaultProductAction());
  };

  const handleChange = (e: any, key: any) => {
    let value = e;
    if (TypeOf(e) === 'Object' && !(e instanceof Event)) value = e.target.value;
    if (key === 'isNewProduct' || key === 'status') value = e ? true : false;
  };

  return (
    <div id="new-marketing">
      <div className="ps-main__wrapper">
        <h3 className="header-button">
          <span className="header-button-name">
            {`${action === NAME_ACTION.CREATE_MARKETINGS ? 'Thêm' : 'Cập nhật'}`} chương trình
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
        <div className="content">
          <div className="header--dashboard">
            <div className="header__left">
              <p>
                (<span style={{ color: 'red' }}>*</span>) Các trường buộc phải nhập
              </p>
            </div>
          </div>
          <section className="ps-new-item">
            <Form onFinish={onFinish} form={form}>
              <div className="ps-form__content">
                <div className="row">
                  <FormInfoBasic />
                  <FormSelectProducts />
                </div>
              </div>
              <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                <Form.Item>
                  <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
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
              </Space>
            </Form>
          </section>
        </div>
      </div>
    </div>
  );
};
