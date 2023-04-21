import { Form, Input, InputNumber } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import { MAX_LENGTH_TEXT, MAX_LENGTH_TEXT_AREA } from '../../../constants/const';
import { TreeCategory } from './TreeCategory';

export const FormGeneral: React.FC<any> = ({ handleChange }) => {
  return (
    <figure>
      <figcaption className="rounded-t-md font-semibold text-base bg-blue-200 px-6 py-3">General</figcaption>
      <div className="rounded-b-md px-6 py-4 border border-solid border-gray-200 border-t-0">
        <div className="mb-5">
          <label className="mb-3 text-sm font-normal">
            Tên sản phẩm<sup className="text-red-600 ml-1">*</sup>
          </label>
          <Form.Item name="name">
            <Input
              maxLength={MAX_LENGTH_TEXT}
              showCount
              placeholder="Nhập tên sản phẩm..."
              onChange={(e) => handleChange(e, 'name')}
            />
          </Form.Item>
        </div>
        <div className="mb-5">
          <label className="mb-3 text-sm font-normal">
            Danh mục<sup className="text-red-600 ml-1">*</sup>
          </label>
          <TreeCategory isFeedback={false} disabled={true} handleChange={handleChange} />
        </div>
        <div className="mb-5">
          <label className="mb-3 text-sm font-normal">
            Giá gốc<sup className="text-red-600 ml-1">*</sup>
          </label>
          <Form.Item name="price">
            <InputNumber
              min={0}
              max={1000000000}
              formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
              style={{ width: '100%' }}
              addonAfter="VNĐ"
              placeholder="Nhập giá gốc..."
              onChange={(e) => handleChange(e, 'price')}
            />
          </Form.Item>
        </div>
        <div className="mb-5">
          <label className="mb-3 text-sm font-normal">
            SKU<sup className="text-red-600 ml-1">*</sup>
          </label>
          <Form.Item name="sku">
            <Input
              maxLength={MAX_LENGTH_TEXT}
              showCount
              placeholder="Nhập SKU sản phẩm..."
              onChange={(e) => handleChange(e, 'sku')}
            />
          </Form.Item>
        </div>
        <div className="mb-5">
          <label className="mb-3 text-sm font-normal">
            Tóm tắt sản phẩm<sup className="text-red-600 ml-1">*</sup>
          </label>
          <Form.Item name="description">
            <TextArea
              style={{ height: '195px' }}
              maxLength={MAX_LENGTH_TEXT_AREA}
              showCount
              onChange={(e: any) => handleChange(e, 'description')}
            />
          </Form.Item>
        </div>
      </div>
    </figure>
  );
};
