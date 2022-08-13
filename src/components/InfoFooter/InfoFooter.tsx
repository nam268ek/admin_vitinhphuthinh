import { Button, Form, Input, Space } from "antd";
import React from "react";

const InfoFooter: React.FC<any> = ({ dataUpdate, form, onFinish }) => {
  return (
    <div className="ps-block__layout w-100">
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
        <div className="form-group--left">
          <div className="background-content border-0">
            <Form className="ps-form ps-form--new-product" form={form} onFinish={onFinish}>
              <div className="form-group--nest">
                <div className="form-group">
                  <Form.Item name="addrshop" initialValue={dataUpdate[0] ? dataUpdate[0].addrshop : ""}>
                    <Input addonBefore="Địa chỉ" maxLength={500} showCount />
                  </Form.Item>
                </div>
                <div className="form-group">
                  <Form.Item name="hotline" initialValue={dataUpdate[0] ? dataUpdate[0].hotline : ""}>
                    <Input addonBefore="Hotline" maxLength={500} showCount />
                  </Form.Item>
                </div>
                <div className="form-group">
                  <Form.Item name="email" initialValue={dataUpdate[0] ? dataUpdate[0].email : ""}>
                    <Input addonBefore="Email" maxLength={500} showCount />
                  </Form.Item>
                </div>
                <div className="form-group">
                  <Form.Item name="fblink" initialValue={dataUpdate[0] ? dataUpdate[0].fblink : ""}>
                    <Input addonBefore="Link FB" maxLength={500} showCount />
                  </Form.Item>
                </div>
                <div className="form-group">
                  <Form.Item name="zalolink" initialValue={dataUpdate[0] ? dataUpdate[0].zalolink : ""}>
                    <Input addonBefore="Link Zalo" maxLength={500} showCount />
                  </Form.Item>
                </div>
              </div>
              <div className="ps-form__bottom">
                <Form.Item>
                  <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                    <Button type="primary" htmlType="submit" loading={false}>
                      Submit
                    </Button>
                  </Space>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InfoFooter;
