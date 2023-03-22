import { Form, Input } from 'antd';
import React from 'react';

const SpecsRamComponent: React.FC<any> = ({ onChange }) => {
  return (
    <ul className="w-full">
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Dung lượng:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="capacity">
            <Input width={'100%'} onChange={(e) => onChange(e, 'capacity')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Loại RAM:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="ramType">
            <Input width={'100%'} onChange={(e) => onChange(e, 'ramType')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Bus RAM:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="busRam">
            <Input width={'100%' || ''} onChange={(e) => onChange(e, 'busRam')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Hỗ trợ:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="suptype">
            <Input width={'100%'} onChange={(e) => onChange(e, 'suptype')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Voltage:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="voltage">
            <Input width={'100%'} onChange={(e) => onChange(e, 'voltage')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Hãng sản xuất:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="firm">
            <Input width={'100%'} onChange={(e) => onChange(e, 'firm')} />
          </Form.Item>
        </div>
      </li>
    </ul>
  );
};
export default SpecsRamComponent;
