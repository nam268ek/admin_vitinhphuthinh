import { Form, Input } from 'antd';
import React from 'react';

const SpecsStorageDeviceComponent: React.FC<any> = ({ onChange }) => {
  return (
    <ul className="w-full">
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Chuẩn kết nối:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="connstand">
            <Input width={'100%'} onChange={(e) => onChange(e, 'connstand')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Dung lượng:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="capacity">
            <Input width={'100%'} onChange={(e) => onChange(e, 'capacity')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Loại ổ cứng:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="hardrityp">
            <Input width={'100%' || ''} onChange={(e) => onChange(e, 'hardrityp')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Tốc độ ghi:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="wrispe">
            <Input width={'100%'} onChange={(e) => onChange(e, 'wrispe')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Tốc độ đọc:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="reaspe">
            <Input width={'100%'} onChange={(e) => onChange(e, 'reaspe')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Kích thước:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="dimension">
            <Input width={'100%'} onChange={(e) => onChange(e, 'dimension')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Khối lượng:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="mass">
            <Input width={'100%'} onChange={(e) => onChange(e, 'mass')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Thương hiệu của:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="tradof">
            <Input width={'100%'} onChange={(e) => onChange(e, 'tradof')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Sản xuất tại:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="firm">
            <Input width={'100%'} onChange={(e) => onChange(e, 'firm')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Hãng:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="madeIn">
            <Input width={'100%'} onChange={(e) => onChange(e, 'madeIn')} />
          </Form.Item>
        </div>
      </li>
    </ul>
  );
};
export default SpecsStorageDeviceComponent;
