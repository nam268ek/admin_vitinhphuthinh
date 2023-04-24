import { Form, Input, InputNumber } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { MAX_LENGTH_TEXT, MAX_LENGTH_TEXT_AREA } from '../../../constants/const';
import { TreeCategory } from './TreeCategory';

export const FormGeneral: React.FC<any> = ({ handleChange }) => {
  const location = useLocation();
  const disabled = location.pathname === '/products/update' ? false : true;

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
          <TreeCategory isFeedback={false} disabled={disabled} handleChange={handleChange} />
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
              parser={(value: any) => parseFloat(value.replace(/[,.]/g, ''))}
              style={{ width: '100%' }}
              addonAfter="VNĐ"
              placeholder="Nhập giá gốc..."
              onChange={(e) => handleChange(e, 'price')}
            />
          </Form.Item>
        </div>
        <div className="mb-5">
          <label className="mb-3 text-sm font-normal">Giá khuyến mãi</label>
          <Form.Item name="priceSale" noStyle>
            <InputNumber
              min={0}
              max={1000000000}
              formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value: any) => parseFloat(value.replace(/[,.]/g, ''))}
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
              parser={(value: any) => Math.ceil(Number(value.replace(/\$\s?|(,*)/g, ''))).toString()}
              style={{ width: '100%' }}
              placeholder="Nhập số lượng..."
              onChange={(e) => handleChange(e, 'quantity')}
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
            <TextArea rows={3} maxLength={MAX_LENGTH_TEXT_AREA} showCount onChange={(e: any) => handleChange(e, 'description')} />
          </Form.Item>
        </div>
      </div>
    </figure>
  );
};
