import { Form, InputNumber } from 'antd';
import React from 'react';

export const FormInventories: React.FC<any> = ({ handleChange }) => {
  return (
    <figure>
      <figcaption className="rounded-t-md font-semibold text-base bg-blue-200 px-6 py-3">Inventory</figcaption>
      <div className="rounded-b-md px-6 py-4 border border-solid border-gray-200 border-t-0">
        <div className="mb-5">
          <label className="mb-3 text-sm font-normal">Giá khuyến mãi</label>
          <Form.Item name="priceSale" noStyle>
            <InputNumber
              min={0}
              max={1000000000}
              formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
              style={{ width: '100%' }}
              addonAfter="VNĐ"
              placeholder="Nhập giá sale..."
              onChange={(e) => handleChange(e, 'priceSale')}
            />
          </Form.Item>
        </div>
        <div className="mb-5">
          <label className="mb-3 text-sm font-normal">
            Số lượng<sup className="text-red-600 ml-1">*</sup>
          </label>
          <Form.Item name="quantity">
            <InputNumber
              min={0}
              max={500}
              formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value: any) => Math.floor(Number(value.replace(/\$\s?|(,*)/g, ''))).toString()}
              style={{ width: '100%' }}
              placeholder="Nhập số lượng..."
              onChange={(e) => handleChange(e, 'quantity')}
            />
          </Form.Item>
        </div>
      </div>
    </figure>
  );
};
