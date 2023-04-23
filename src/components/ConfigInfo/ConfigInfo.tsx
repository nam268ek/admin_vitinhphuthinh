import React from 'react';
import { Form, Input } from 'antd';

const ConfigInfo: React.FC<any> = ({ onChange }) => {
  const { TextArea } = Input;

  return (
    <ul className="w-full">
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">
          Mã sản phẩm / Model <sup className="text-red-600 ml-1">*</sup>
        </div>
        <div className="w-[75%]">
          <Form.Item name="model" className="mb-2">
            <Input width={'100%'} onChange={(e) => onChange(e, 'model')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">
          Bộ Vi Xử Lý / CPU <sup className="text-red-600 ml-1">*</sup>
        </div>
        <div className="w-[75%] ">
          <Form.Item name="cpu" className="mb-2">
            <Input width={'100%'} onChange={(e) => onChange(e, 'cpu')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">
          Bộ Nhớ Trong / RAM <sup className="text-red-600 ml-1">*</sup>
        </div>
        <div className="w-[75%] ">
          <Form.Item name="ram" className="mb-2">
            <Input width={'100%' || ''} onChange={(e) => onChange(e, 'ram')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">
          Ổ Cứng (HDD/SDD)<sup className="text-red-600 ml-1">*</sup>
        </div>
        <div className="w-[75%]">
          <Form.Item name="hardDrive" className="mb-2">
            <Input width={'100%'} onChange={(e) => onChange(e, 'hardDrive')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Màn hình / LCD </div>
        <div className="w-[75%]">
          <Form.Item name="monitor" className="mb-2">
            <Input width={'100%'} onChange={(e) => onChange(e, 'monitor')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Chip Đồ Họa / VGA </div>
        <div className="w-[75%]">
          <Form.Item name="vgaCard" className="mb-2">
            <Input width={'100%'} onChange={(e) => onChange(e, 'vgaCard')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Kết Nối / Network </div>
        <div className="w-[75%]">
          <Form.Item name="network" className="mb-2">
            <Input width={'100%'} onChange={(e) => onChange(e, 'network')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Giao Tiếp Mở Rộng </div>
        <div className="w-[75%]">
          <Form.Item name="extend" className="mb-2">
            <TextArea onChange={(e) => onChange(e, 'extend')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Dung Lượng Pin </div>
        <div className="w-[75%]">
          <Form.Item name="battery" className="mb-2">
            <Input width={'100%'} onChange={(e) => onChange(e, 'battery')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Hệ Điều Hành / Operating System</div>
        <div className="w-[75%]">
          <Form.Item name="os" className="mb-2">
            <Input width={'100%'} onChange={(e) => onChange(e, 'os')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Trọng Lượng / Weight </div>
        <div className="w-[75%]">
          <Form.Item name="weight" className="mb-2">
            <Input width={'100%'} onChange={(e) => onChange(e, 'weight')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Màu Sắc </div>
        <div className="w-[75%]">
          <Form.Item name="color" className="mb-2">
            <Input width={'100%'} onChange={(e) => onChange(e, 'color')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Xuất Xứ / Bảo Hành </div>
        <div className="w-[75%]">
          <Form.Item name="warranty" className="mb-2">
            <Input width={'100%'} onChange={(e) => onChange(e, 'warranty')} />
          </Form.Item>
        </div>
      </li>
    </ul>
  );
};
export default ConfigInfo;
