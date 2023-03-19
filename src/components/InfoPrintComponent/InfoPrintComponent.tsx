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
          <Form.Item className="mb-2" hasFeedback name="inCountry">
            <Input width={'100%'} onChange={(e) => onChange(e, 'inCountry')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Thời gian bảo hành:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="timeWarranty">
            <Input width={'100%'} onChange={(e) => onChange(e, 'timeWarranty')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Địa điểm bảo hành:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="locationWarranty">
            <Input width={'100%'} onChange={(e) => onChange(e, 'locationWarranty')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Loại máy in:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="categoryPrinter">
            <Input width={'100%'} onChange={(e) => onChange(e, 'categoryPrinter')} />
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
          <Form.Item className="mb-2" hasFeedback name="speedPrintBlackWhite">
            <Input width={'100%'} onChange={(e) => onChange(e, 'speedPrintBlackWhite')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Tốc độ in màu :</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="speedPrintColor">
            <Input width={'100%'} onChange={(e) => onChange(e, 'speedPrintColor')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">In 2 mặt tự động:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="autoPrint">
            <Input width={'100%'} onChange={(e) => onChange(e, 'autoPrint')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Loại mực in :</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="categoryInk">
            <Input width={'100%'} onChange={(e) => onChange(e, 'categoryInk')} />
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
          <Form.Item className="mb-2" hasFeedback name="paperSize">
            <Input width={'100%'} onChange={(e) => onChange(e, 'paperSize')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Khay đựng giấy:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="paperTray">
            <Input width={'100%'} onChange={(e) => onChange(e, 'paperTray')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Kết nối USB:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="usbConnect">
            <Input width={'100%'} onChange={(e) => onChange(e, 'usbConnect')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Kết nối mạng:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="internetConnect">
            <Input width={'100%'} onChange={(e) => onChange(e, 'internetConnect')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">In từ thiết bị di động:</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="printToMobile">
            <Input width={'100%'} onChange={(e) => onChange(e, 'printToMobile')} />
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
          <Form.Item className="mb-2" hasFeedback name="sizeBox">
            <Input width={'100%'} onChange={(e) => onChange(e, 'sizeBox')} />
          </Form.Item>
        </div>
      </li>
      <li className="flex items-center justify-between mb-2">
        <div className="w-[25%] text-start font-normal">Khối lượng thùng (kg):</div>
        <div className="w-[75%]">
          <Form.Item className="mb-2" hasFeedback name="weigthBox">
            <Input width={'100%'} onChange={(e) => onChange(e, 'weigthBox')} />
          </Form.Item>
        </div>
      </li>
    </ul>
  );
};
export default InfoPrintComponent;
