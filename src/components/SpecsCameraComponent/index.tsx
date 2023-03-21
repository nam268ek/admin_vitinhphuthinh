import { Form, Input } from 'antd';
import React from 'react';

const SpecsCameraComponent: React.FC<any> = ({ onChange }) => {
  return (
    <ul className="w-full">
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Độ phân giải:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="pixel">
            <Input width={'100%'} onChange={(e) => onChange(e, 'pixel')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Góc camera:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="cameraAngle">
            <Input width={'100%'} onChange={(e) => onChange(e, 'cameraAngle')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Lưu trữ:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="archive">
            <Input width={'100%' || ''} onChange={(e) => onChange(e, 'archive')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Tầm nhìn xa hồng ngoại:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="infraredForesight">
            <Input width={'100%'} onChange={(e) => onChange(e, 'infraredForesight')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Hỗ trợ thiết bị:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="deviceSupport">
            <Input width={'100%'} onChange={(e) => onChange(e, 'deviceSupport')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Điều khiển và xem trên điện thoại:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="appControl">
            <Input width={'100%'} onChange={(e) => onChange(e, 'appControl')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Tiện ích:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="benefits">
            <Input width={'100%'} onChange={(e) => onChange(e, 'benefits')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Vị trí lắp đặt:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="installationLocation">
            <Input width={'100%'} onChange={(e) => onChange(e, 'installationLocation')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Đàm thoại 2 chiều:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="twoWayConversation">
            <Input width={'100%'} onChange={(e) => onChange(e, 'twoWayConversation')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Adapter kèm theo:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="adapterIncluded">
            <Input width={'100%'} onChange={(e) => onChange(e, 'adapterIncluded')} />
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
        <div className="w-[25%] text-start font-normal">Thương hiệu của:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="trademarksOf">
            <Input width={'100%'} onChange={(e) => onChange(e, 'trademarksOf')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Sản xuất tại:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="madeIn">
            <Input width={'100%'} onChange={(e) => onChange(e, 'madeIn')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Hãng:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="firm">
            <Input width={'100%'} onChange={(e) => onChange(e, 'firm')} />
          </Form.Item>
        </div>
      </li>
    </ul>
  );
};
export default SpecsCameraComponent;
