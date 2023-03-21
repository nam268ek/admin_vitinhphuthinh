import { Form, Switch } from 'antd';
import React, { useEffect } from 'react';

export const FormStatus: React.FC<any> = ({ handleChange }) => {
  return (
    <figure>
      <figcaption className="rounded-t-md font-semibold text-base bg-blue-200 px-6 py-3">
        Status
      </figcaption>
      <div className="flex justify-between gap-3 rounded-b-md px-6 py-4 border border-solid border-gray-200 border-t-0">
        <div className="w-1/2 m-0">
          <label className="mb-3 text-sm font-normal">
            Trạng thái hiện thị<sup className="text-red-600 ml-1">*</sup>
          </label>
          <Form.Item name="status" valuePropName="checked">
            <Switch
              key="status"
              checkedChildren="OFF"
              unCheckedChildren="ON"
              onChange={(e) => handleChange(e, 'status')}
            />
          </Form.Item>
        </div>
        <div className="w-1/2 m-0">
          <label className="mb-3 text-sm font-normal">
            Hàng mới 100%<sup className="text-red-600 ml-1">*</sup>
          </label>
          <Form.Item name="isNewProduct" valuePropName="checked">
            <Switch
              key="isNewProduct"
              checkedChildren="OFF"
              unCheckedChildren="ON"
              onChange={(e) => handleChange(e, 'isNewProduct')}
            />
          </Form.Item>
        </div>
      </div>
    </figure>
  );
};
