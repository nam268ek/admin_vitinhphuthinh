import { Form, Input } from 'antd';
import React from 'react';

const InfoPrintComponent: React.FC<any> = ({ onChange }) => {
  return (
    <ul className="w-full">
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">
          Model:<sup className="text-red-600 ml-1">*</sup>
        </div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="model">
            <Input width={'100%'} onChange={(e) => onChange(e, 'model')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Màu sắc: </div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="color">
            <Input width={'100%'} onChange={(e) => onChange(e, 'color')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Nhà sản xuất:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="nsx">
            <Input width={'100%' || ''} onChange={(e) => onChange(e, 'nsx')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Xuất xứ:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="in_country">
            <Input width={'100%'} onChange={(e) => onChange(e, 'in_country')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Thời gian bảo hành:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="time_warranty">
            <Input width={'100%'} onChange={(e) => onChange(e, 'time_warranty')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Địa điểm bảo hành:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="location_warranty">
            <Input width={'100%'} onChange={(e) => onChange(e, 'location_warranty')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Loại máy in:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="category_printer">
            <Input width={'100%'} onChange={(e) => onChange(e, 'category_printer')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Chức năng:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="function">
            <Input width={'100%'} onChange={(e) => onChange(e, 'function')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Độ phân giải:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="pixel">
            <Input width={'100%'} onChange={(e) => onChange(e, 'pixel')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Tốc độ in trắng đen:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="speed_print_black_white">
            <Input width={'100%'} onChange={(e) => onChange(e, 'speed_print_black_white')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Tốc độ in màu :</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="speed_print_color">
            <Input width={'100%'} onChange={(e) => onChange(e, 'speed_print_color')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">In 2 mặt tự động:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="auto_print">
            <Input width={'100%'} onChange={(e) => onChange(e, 'auto_print')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Loại mực in :</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="category_ink">
            <Input width={'100%'} onChange={(e) => onChange(e, 'category_ink')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Bộ nhớ tích hợp:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="memory">
            <Input width={'100%'} onChange={(e) => onChange(e, 'memory')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Khổ giấy:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="paper_size">
            <Input width={'100%'} onChange={(e) => onChange(e, 'paper_size')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Khay đựng giấy:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="paper_tray">
            <Input width={'100%'} onChange={(e) => onChange(e, 'paper_tray')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Kết nối USB:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="usb_connect">
            <Input width={'100%'} onChange={(e) => onChange(e, 'usb_connect')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Kết nối mạng:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="internet_connect">
            <Input width={'100%'} onChange={(e) => onChange(e, 'internet_connect')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">In từ thiết bị di động:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="print_to_mobile">
            <Input width={'100%'} onChange={(e) => onChange(e, 'print_to_mobile')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Khối lượng sản phẩm (kg):</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="weigth">
            <Input width={'100%'} onChange={(e) => onChange(e, 'weigth')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Kích thước sản phẩm:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="size">
            <Input width={'100%'} onChange={(e) => onChange(e, 'size')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Kích thước thùng:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="size_box">
            <Input width={'100%'} onChange={(e) => onChange(e, 'size_box')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Khối lượng thùng (kg):</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="weigth_box">
            <Input width={'100%'} onChange={(e) => onChange(e, 'weigth_box')} />
          </Form.Item>
        </div>
      </li>
    </ul>
  );
};
export default InfoPrintComponent;
