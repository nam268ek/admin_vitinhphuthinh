import React from 'react';
import { Form, Input } from 'antd';

const ConfigInfo: React.FC<any> = ({ onChange }) => {
  const { TextArea } = Input;

  return (
    <table className="w-full">
      <tbody>
        <tr>
          <th className="w-[25%] text-start font-normal">Mã sản phẩm / Model </th>
          <td className="w-[75%]">
            <Form.Item hasFeedback name="model" className="mb-2">
              <Input width={'100%'} onChange={(e) => onChange(e, 'model')} />
            </Form.Item>
          </td>
        </tr>
        <tr>
          <th className="w-[25%] text-start font-normal">Bộ Vi Xử Lý / CPU </th>
          <td className="w-[75%] ">
            <Form.Item hasFeedback name="cpu" className="mb-2">
              <Input width={'100%'} onChange={(e) => onChange(e, 'cpu')} />
            </Form.Item>
          </td>
        </tr>
        <tr>
          <th className="w-[25%] text-start font-normal">Bộ Nhớ Trong / RAM </th>
          <td className="w-[75%] ">
            <Form.Item hasFeedback name="ram" className="mb-2">
              <Input width={'100%' || ''} onChange={(e) => onChange(e, 'ram')} />
            </Form.Item>
          </td>
        </tr>
        <tr>
          <th className="w-[25%] text-start font-normal">Ổ Cứng (HDD/SDD)</th>
          <td className="w-[75%]">
            <Form.Item hasFeedback name="hardDrive" className="mb-2">
              <Input width={'100%'} onChange={(e) => onChange(e, 'hardDrive')} />
            </Form.Item>
          </td>
        </tr>
        <tr>
          <th className="w-[25%] text-start font-normal">Màn hình / LCD </th>
          <td className="w-[75%]">
            <Form.Item hasFeedback name="monitor" className="mb-2">
              <Input width={'100%'} onChange={(e) => onChange(e, 'monitor')} />
            </Form.Item>
          </td>
        </tr>
        <tr>
          <th className="w-[25%] text-start font-normal">Chip Đồ Họa / VGA </th>
          <td className="w-[75%]">
            <Form.Item hasFeedback name="vgaCard" className="mb-2">
              <Input width={'100%'} onChange={(e) => onChange(e, 'vgaCard')} />
            </Form.Item>
          </td>
        </tr>
        <tr>
          <th className="w-[25%] text-start font-normal">Kết Nối / Network </th>
          <td className="w-[75%]">
            <Form.Item hasFeedback name="network" className="mb-2">
              <Input width={'100%'} onChange={(e) => onChange(e, 'network')} />
            </Form.Item>
          </td>
        </tr>
        <tr>
          <th className="w-[25%] text-start font-normal">Giao Tiếp Mở Rộng </th>
          <td className="w-[75%]">
            <Form.Item hasFeedback name="extend" className="mb-2">
              <TextArea onChange={(e) => onChange(e, 'extend')} />
            </Form.Item>
          </td>
        </tr>
        <tr>
          <th className="w-[25%] text-start font-normal">Dung Lượng Pin </th>
          <td className="w-[75%]">
            <Form.Item hasFeedback name="battery" className="mb-2">
              <Input width={'100%'} onChange={(e) => onChange(e, 'battery')} />
            </Form.Item>
          </td>
        </tr>
        <tr>
          <th className="w-[25%] text-start font-normal">Hệ Điều Hành / Operating System</th>
          <td className="w-[75%]">
            <Form.Item hasFeedback name="os" className="mb-2">
              <Input width={'100%'} onChange={(e) => onChange(e, 'os')} />
            </Form.Item>
          </td>
        </tr>
        <tr>
          <th className="w-[25%] text-start font-normal">Trọng Lượng / Weight </th>
          <td className="w-[75%]">
            <Form.Item hasFeedback name="weight" className="mb-2">
              <Input width={'100%'} onChange={(e) => onChange(e, 'weight')} />
            </Form.Item>
          </td>
        </tr>
        <tr>
          <th className="w-[25%] text-start font-normal">Màu Sắc </th>
          <td className="w-[75%]">
            <Form.Item hasFeedback name="color" className="mb-2">
              <Input width={'100%'} onChange={(e) => onChange(e, 'color')} />
            </Form.Item>
          </td>
        </tr>
        <tr>
          <th className="w-[25%] text-start font-normal">Xuất Xứ / Bảo Hành </th>
          <td className="w-[75%]">
            <Form.Item hasFeedback name="warranty" className="mb-2">
              <Input width={'100%'} onChange={(e) => onChange(e, 'warranty')} />
            </Form.Item>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
export default ConfigInfo;
