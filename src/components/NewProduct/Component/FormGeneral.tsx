import { Form, Input, InputNumber } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';
import { MAX_LENGTH_TEXT, MAX_LENGTH_TEXT_AREA } from '../../../constants/const';

export const FormGeneral: React.FC = () => {
  return (
    <figure className="ps-block--form-box">
      <figcaption>General</figcaption>
      <div className="ps-block__content">
        <div className="form-group">
          <label>
            Tên sản phẩm<sup>*</sup>
          </label>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên sản phẩm',
              },
            ]}
          >
            <Input maxLength={MAX_LENGTH_TEXT} showCount placeholder="Nhập tên sản phẩm..." />
          </Form.Item>
        </div>
        <div className="form-group">
          <label>
            Giá gốc<sup>*</sup>
          </label>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập giá gốc',
              },
            ]}
          >
            <Form.Item
              name="price"
              noStyle
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập giá gốc',
                },
              ]}
            >
              <InputNumber
                min={0}
                max={1000000000}
                formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                style={{ width: '100%' }}
                placeholder="Nhập giá gốc..."
              />
            </Form.Item>
            <span className="form-money">VND</span>
          </Form.Item>
        </div>
        <div className="form-group">
          <label>
            SKU<sup>*</sup>
          </label>
          <Form.Item
            name="sku"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập SKU',
              },
            ]}
          >
            <Input maxLength={MAX_LENGTH_TEXT} showCount placeholder="Nhập SKU sản phẩm..." />
          </Form.Item>
        </div>
        <div className="form-group">
          <label>
            Tóm tắt sản phẩm<sup>*</sup>
          </label>
          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tóm tắt sản phẩm',
              },
            ]}
          >
            <TextArea style={{ height: '195px' }} maxLength={MAX_LENGTH_TEXT_AREA} showCount />
          </Form.Item>
        </div>
      </div>
    </figure>
  );
};
