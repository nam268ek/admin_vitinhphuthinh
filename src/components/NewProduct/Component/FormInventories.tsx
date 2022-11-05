import { Form, InputNumber } from 'antd';
import React from 'react';

export const FormInventories: React.FC = () => {
  return (
    <figure className="ps-block--form-box">
      <figcaption>Inventory</figcaption>
      <div className="ps-block__content">
        <div className="form-group">
          <label>Giá khuyến mãi</label>
          <Form.Item style={{ position: 'relative' }}>
            <Form.Item name="priceSale" noStyle>
              <InputNumber
                min={0}
                max={1000000000}
                formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                style={{ width: '100%' }}
                placeholder="Nhập giá sale..."
              />
            </Form.Item>
            <span className="form-money">VND</span>
          </Form.Item>
        </div>
        <div className="form-group">
          <label>
            Số lượng<sup>*</sup>
          </label>
          <Form.Item noStyle>
            <Form.Item
              name="quantity"
              rules={[
                {
                  required: true,
                  message: 'Please input the amount',
                },
              ]}
            >
              <InputNumber
                min={0}
                max={500}
                formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                style={{ width: '100%' }}
                placeholder="Nhập số lượng..."
              />
            </Form.Item>
          </Form.Item>
        </div>
      </div>
    </figure>
  );
};
