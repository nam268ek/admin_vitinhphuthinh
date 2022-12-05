import React, { useRef } from 'react';
import { Button, Collapse, Form, Space } from 'antd';
import { RootState } from '../redux/store/store';
import { useSelector } from 'react-redux';
import EditorText from '../common/EditorText';

const { Panel } = Collapse;

const listDropdownPolicy = [
  { id: '0', key: 'polship', desc: 'Chính sách vận chuyển' },
  { id: '1', key: 'polreturn', desc: 'Chính sách đổi trả' },
  { id: '2', key: 'polwan', desc: 'Chính sách bảo hành' },
  { id: '3', key: 'polquality', desc: 'Cam kết chất lượng' },
  { id: '4', key: 'poluse', desc: 'Điều khoản sử dụng' },
  { id: '5', key: 'polbuy', desc: 'Chính sách mua hàng' },
  { id: '6', key: 'polprot', desc: 'Chính sách bảo mật' },
  { id: '7', key: 'polinsta', desc: 'Chính sách trả góp' },
];

export const Policy: React.FC = () => {
  const { action, policies, loading } = useSelector((state: RootState) => state.footer);
  const [form] = Form.useForm();
  const childRef = useRef(null);

  const onFinish = async (data: any) => {
    // switch (action) {
    //   case NAME_ACTION.CREATE_PRODUCT:
    //     handleCreateFooter(data);
    //     break;
    //   case NAME_ACTION.UPDATE_PRODUCT:
    //     handleUpdateFooter();
    //     break;
    //   default:
    //     break;
    // }
  };

  const onChange = () => {
    //
  };

  return (
    <div className="ps-main__wrapper">
      <h3 className="header-button mb-4">
        <span className="w-1/2 text-3xl font-normal">Settings</span>
      </h3>
      <div className="content">
        <section>
          <Form onFinish={onFinish} form={form}>
            <figure>
              <Space direction="vertical" className="w-full">
                {listDropdownPolicy?.map((item) => (
                  <Collapse key={item.key} collapsible="header">
                    <Panel id="c-collapse-panel" header={item.desc} key={item.key}>
                      <EditorText
                        defaultValue={''}
                        name={item.key}
                        onChange={onChange}
                        ref={childRef}
                      />
                    </Panel>
                  </Collapse>
                ))}
              </Space>
            </figure>
            <Space className="flex justify-end w-full">
              <Form.Item noStyle>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Submit
                </Button>
              </Form.Item>
            </Space>
          </Form>
        </section>
      </div>
    </div>
  );
};
