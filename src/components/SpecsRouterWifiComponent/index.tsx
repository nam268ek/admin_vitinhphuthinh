import { Form, Input } from 'antd';
import React from 'react';

const SpecsRouterWifiComponent: React.FC<any> = ({ onChange }) => {
  return (
    <ul className="w-full">
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Kích thước:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="dimension">
            <Input width={'100%'} onChange={(e) => onChange(e, 'dimension')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Chuẩn Wi-Fi:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="standwifi">
            <Input width={'100%'} onChange={(e) => onChange(e, 'standwifi')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Độ mạnh của sóng:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="wavestre">
            <Input width={'100%' || ''} onChange={(e) => onChange(e, 'wavestre')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Băng tần sóng:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="waveban">
            <Input width={'100%'} onChange={(e) => onChange(e, 'waveban')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Số lượng user tối đa:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="maxuser">
            <Input width={'100%'} onChange={(e) => onChange(e, 'maxuser')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Số Ăng ten:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="antnum">
            <Input width={'100%'} onChange={(e) => onChange(e, 'antnum')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Độ phủ sóng tối đa:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="maxcove">
            <Input width={'100%'} onChange={(e) => onChange(e, 'maxcove')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Kết nối và điều khiển:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="connacontr">
            <Input width={'100%'} onChange={(e) => onChange(e, 'connacontr')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Cổng giao tiếp:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="commport">
            <Input width={'100%'} onChange={(e) => onChange(e, 'commport')} />
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
export default SpecsRouterWifiComponent;
