import { Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import { MAX_LENGTH_TEXT, MAX_LENGTH_TEXT_AREA } from '../../../constants/const';

export const FormCustomerOrder: React.FC<any> = ({ onChange }) => {
  return (
    <figure className="ps-block--form-box">
      <figcaption>Thông tin khách hàng</figcaption>
      <div className="ps-block__content">
        <div className="row">
          <div className="col-xl-3 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="form-group">
              <label>First Name</label>
              <Form.Item
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập firstName',
                  },
                ]}
              >
                <Input
                  maxLength={MAX_LENGTH_TEXT}
                  showCount
                  placeholder="firstName"
                  onChange={(e) => onChange(e, 'firstName')}
                />
              </Form.Item>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="form-group">
              <label>Last Name</label>
              <Form.Item
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập lastName',
                  },
                ]}
              >
                <Input
                  maxLength={MAX_LENGTH_TEXT}
                  showCount
                  placeholder="lastName"
                  onChange={(e) => onChange(e, 'lastName')}
                />
              </Form.Item>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="form-group">
              <label>Địa chỉ</label>
              <Form.Item name="address">
                <Input
                  maxLength={MAX_LENGTH_TEXT}
                  showCount
                  placeholder="Địa chỉ..."
                  onChange={(e) => onChange(e, 'address')}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="form-group">
              <label>Số điện thoại</label>
              <Form.Item
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập SĐT',
                  },
                ]}
              >
                <Input
                  maxLength={MAX_LENGTH_TEXT}
                  showCount
                  placeholder="Phone number..."
                  onChange={(e) => onChange(e, 'phoneNumber')}
                />
              </Form.Item>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="form-group">
              <label>Email</label>
              <Form.Item name="email">
                <Input
                  maxLength={MAX_LENGTH_TEXT}
                  showCount
                  placeholder="Email..."
                  onChange={(e) => onChange(e, 'email')}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="form-group">
            <label>Ghi chú</label>
            <Form.Item name="orderNotes">
              <TextArea
                maxLength={MAX_LENGTH_TEXT_AREA}
                showCount
                placeholder="Note..."
                onChange={(e: any) => onChange(e, 'orderNotes')}
              />
            </Form.Item>
          </div>
        </div>
      </div>
    </figure>
  );
};
