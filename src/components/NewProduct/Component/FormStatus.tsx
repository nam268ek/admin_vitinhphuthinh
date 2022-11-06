import { Form, Switch } from 'antd';
import React from 'react';

export const FormStatus: React.FC<any> = ({ handleChange }) => {
  return (
    <figure className="ps-block--form-box">
      <figcaption>Status</figcaption>
      <div className="ps-block__content d-flex column-gap-5">
        <div className="form-group m-0">
          <label>
            Trạng thái hiện thị<sup>*</sup>
          </label>
          <Form.Item name="status">
            <Switch key="status" onChange={(e) => handleChange(e, 'status')} />
          </Form.Item>
        </div>
        <div className="form-group m-0">
          <label>
            Hàng mới 100%<sup>*</sup>
          </label>
          <Form.Item name="isNewProduct">
            <Switch key="isNewProduct" onChange={(e) => handleChange(e, 'isNewProduct')} />
          </Form.Item>
        </div>
      </div>
    </figure>
  );
};
