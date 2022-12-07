/* eslint-disable new-cap */
/* eslint-disable curly */
import { Breadcrumb, Button, Form, Input, Layout, Space, theme } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { KEY_INFORMATION } from '../../constants/const';
import { TypeOf } from '../../utils/CheckTypeOfValue';
import { getUpdateFooterService } from '../redux/Slices/FooterSlice';
import { RootState } from '../redux/store/store';
import { openMessage } from '../services/general.service';

const bodyUpdateFooter: any = {};
const { Header, Content } = Layout;

export const InfoFooter: React.FC<any> = () => {
  const { footers, loading } = useSelector((state: RootState) => state.footer);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    handleLoadFooter();
  }, [footers]);

  const handleLoadFooter = async () => {
    form.setFieldsValue({
      ...footers[0],
    });
  };

  const onFinish = async (data: any) => {
    handleUpdateFooter();
  };

  const handleUpdateFooter = async () => {
    try {
      await dispatch(
        getUpdateFooterService({ key: KEY_INFORMATION.FOOTER, ...bodyUpdateFooter }),
      ).unwrap();
      openMessage();
    } catch (error) {
      openMessage(error);
    }
  };

  const onChange = (e: any, key: string) => {
    let value = e;
    if (TypeOf(e) === 'Object' && !(e instanceof Event)) value = e.target.value;

    bodyUpdateFooter[key] = value;
    console.log(bodyUpdateFooter);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Header
        className="sticky top-0 z-1 w-full flex"
        style={{ background: colorBgContainer, paddingInline: '35px' }}
      >
        <p className="text-2xl m-0 flex items-center">Footer Information</p>
      </Header>
      <Content className="my-0 mx-4">
        <Breadcrumb className="mx-0 my-2 px-5">
          <Breadcrumb.Item>Settings</Breadcrumb.Item>
          <Breadcrumb.Item>Footer</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: colorBgContainer }} className="px-5 py-6 min-h-full">
          <section>
            <Form onFinish={onFinish} form={form}>
              <figure>
                <figcaption className="rounded-t-md font-semibold text-base bg-blue-200 px-6 py-3">
                  Footer
                </figcaption>
                <div className="rounded-b-md px-6 py-4 border border-solid border-gray-200 border-t-0">
                  <div className="grid grid-flow-row grid-rows-2 grid-cols-2 gap-4">
                    <div className="mb-0">
                      <label className="mb-3 text-sm font-normal">Địa chỉ</label>
                      <Form.Item hasFeedback name="addrshop" label="">
                        <Input onChange={(e) => onChange(e, 'addrshop')} />
                      </Form.Item>
                    </div>
                    <div className="mb-0">
                      <label className="mb-3 text-sm font-normal">Hotline</label>
                      <Form.Item hasFeedback name="hotline">
                        <Input onChange={(e) => onChange(e, 'hotline')} />
                      </Form.Item>
                    </div>
                    <div className="mb-0">
                      <label className="mb-3 text-sm font-normal">Email</label>
                      <Form.Item hasFeedback name="email">
                        <Input onChange={(e) => onChange(e, 'email')} />
                      </Form.Item>
                    </div>
                    <div className="grid grid-flow-row grid-cols-2 gap-4">
                      <div className="mb-0">
                        <label className="mb-3 text-sm font-normal">Link FB</label>
                        <Form.Item hasFeedback name="fblink">
                          <Input onChange={(e) => onChange(e, 'fblink')} />
                        </Form.Item>
                      </div>
                      <div className="mb-0">
                        <label className="mb-3 text-sm font-normal">Link Zalo</label>
                        <Form.Item hasFeedback name="zalolink">
                          <Input onChange={(e) => onChange(e, 'zalolink')} />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>
              </figure>
              <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                <Form.Item>
                  <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Submit
                    </Button>
                  </Space>
                </Form.Item>
              </Space>
            </Form>
          </section>
        </div>
      </Content>
    </>
  );

  return (
    <div className="ps-main__wrapper">
      <h3 className="header-button mb-4">
        <span className="w-1/2 text-3xl font-normal">Settings</span>
      </h3>
      <div className="content">
        <section>
          <Form onFinish={onFinish} form={form}>
            <figure>
              <figcaption className="rounded-t-md font-semibold text-base bg-blue-200 px-6 py-3">
                Footer
              </figcaption>
              <div className="rounded-b-md px-6 py-4 border border-solid border-gray-200 border-t-0">
                <div className="grid grid-flow-row grid-rows-2 grid-cols-2 gap-4">
                  <div className="mb-0">
                    <label className="mb-3 text-sm font-normal">Địa chỉ</label>
                    <Form.Item hasFeedback name="addrshop" label="">
                      <Input onChange={(e) => onChange(e, 'addrshop')} />
                    </Form.Item>
                  </div>
                  <div className="mb-0">
                    <label className="mb-3 text-sm font-normal">Hotline</label>
                    <Form.Item hasFeedback name="hotline">
                      <Input onChange={(e) => onChange(e, 'hotline')} />
                    </Form.Item>
                  </div>
                  <div className="mb-0">
                    <label className="mb-3 text-sm font-normal">Email</label>
                    <Form.Item hasFeedback name="email">
                      <Input onChange={(e) => onChange(e, 'email')} />
                    </Form.Item>
                  </div>
                  <div className="grid grid-flow-row grid-cols-2 gap-4">
                    <div className="mb-0">
                      <label className="mb-3 text-sm font-normal">Link FB</label>
                      <Form.Item hasFeedback name="fblink">
                        <Input onChange={(e) => onChange(e, 'fblink')} />
                      </Form.Item>
                    </div>
                    <div className="mb-0">
                      <label className="mb-3 text-sm font-normal">Link Zalo</label>
                      <Form.Item hasFeedback name="zalolink">
                        <Input onChange={(e) => onChange(e, 'zalolink')} />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
            </figure>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Form.Item>
                <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
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
  );
};
