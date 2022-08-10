import { Form, Input, Modal } from "antd";
import React from "react";

const InfoFooter: React.FC<any> = ({ titleModel, modalVisible, onOk, onCancel }) => {
  return (
    <Modal title={titleModel} visible={modalVisible} onOk={onOk} onCancel={onCancel}>
      <div className="ps-block__layout">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="form-group--left">
            <div className="background-content">
              <div className="form-group--nest">
                <div className="form-group">
                  <Form.Item name="addrshop">
                    <Input addonBefore="Địa chỉ" maxLength={500} showCount />
                  </Form.Item>
                </div>
                <div className="form-group">
                  <Form.Item name="hotline">
                    <Input addonBefore="Hotline" maxLength={500} showCount />
                  </Form.Item>
                </div>
                <div className="form-group">
                  <Form.Item name="email">
                    <Input addonBefore="Email" maxLength={500} showCount />
                  </Form.Item>
                </div>
                <div className="form-group">
                  <Form.Item name="fblink">
                    <Input addonBefore="Link FB" maxLength={500} showCount />
                  </Form.Item>
                </div>
                <div className="form-group">
                  <Form.Item name="zalolink">
                    <Input addonBefore="Link Zalo" maxLength={500} showCount />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default InfoFooter;
