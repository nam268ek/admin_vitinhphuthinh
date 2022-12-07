/* eslint-disable new-cap */
/* eslint-disable curly */
import { Button, Breadcrumb, Form, Layout, Space, theme } from 'antd';
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

const { Header, Content } = Layout;

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

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Header
        className="sticky top-0 z-10 w-full flex items-center justify-between border-t-0 border-x-0 border-b border-solid border-[#eee]"
        style={{ background: colorBgContainer, paddingInline: '35px' }}
      >
        <p className="text-2xl m-0 flex items-center">
          {`${action === NAME_ACTION.CREATE_MARKETINGS ? 'Thêm' : 'Cập nhật'}`} chương trình
        </p>
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
          <Breadcrumb.Item>Marketings</Breadcrumb.Item>
          <Breadcrumb.Item>Create</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: colorBgContainer }} className="px-5 py-6 min-h-full">
          <p>
            (<span style={{ color: 'red' }}>*</span>) Các trường buộc phải nhập
          </p>
          <section>
            <Form onFinish={onFinish} form={form}>
              <div className="">
                <FormInfoBasic />
                <FormSelectProducts />
              </div>
            </Form>
          </section>
        </div>
      </Content>
    </>
  );
};
