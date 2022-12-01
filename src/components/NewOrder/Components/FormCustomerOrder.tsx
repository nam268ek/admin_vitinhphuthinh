import { Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import { MAX_LENGTH_TEXT, MAX_LENGTH_TEXT_AREA } from '../../../constants/const';

export const FormCustomerOrder: React.FC<any> = ({ onChange }) => {
  return (
    <figure>
      <figcaption className="rounded-t-md font-semibold text-base bg-blue-200 px-6 py-3">
        Thông tin khách hàng
      </figcaption>
      <div className="rounded-b-md px-6 py-4 border border-solid border-gray-200 border-t-0">
        <div className="grid grid-cols-2 grid-flow-col gap-4">
          <div className="grid grid-cols-2 grid-flow-col gap-4">
            <div className="mb-5">
              <label className="mb-3 text-sm font-normal">First Name</label>
              <Form.Item
                noStyle
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
                  placeholder="firstName"
                  onChange={(e) => onChange(e, 'firstName')}
                />
              </Form.Item>
            </div>
            <div className="mb-5">
              <label className="mb-3 text-sm font-normal">Last Name</label>
              <Form.Item
                noStyle
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
                  placeholder="lastName"
                  onChange={(e) => onChange(e, 'lastName')}
                />
              </Form.Item>
            </div>
          </div>
          <div>
            <div className="mb-5">
              <label className="mb-3 text-sm font-normal">Địa chỉ</label>
              <Form.Item noStyle name="address">
                <Input
                  maxLength={MAX_LENGTH_TEXT}
                  placeholder="Địa chỉ..."
                  onChange={(e) => onChange(e, 'address')}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 grid-flow-col gap-4">
          <div className="mb-5">
            <label className="mb-3 text-sm font-normal">Số điện thoại</label>
            <Form.Item
              noStyle
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
                placeholder="Phone number..."
                onChange={(e) => onChange(e, 'phoneNumber')}
              />
            </Form.Item>
          </div>
          <div className="mb-5">
            <label className="mb-3 text-sm font-normal">Email</label>
            <Form.Item noStyle name="email">
              <Input
                maxLength={MAX_LENGTH_TEXT}
                placeholder="Email..."
                onChange={(e) => onChange(e, 'email')}
              />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="mb-5">
            <label className="mb-3 text-sm font-normal">Ghi chú</label>
            <Form.Item noStyle name="orderNotes">
              <TextArea
                maxLength={MAX_LENGTH_TEXT_AREA}
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
